package network;

import game.Board;
import game.Coord;
import game.StoneColor;
import org.javatuples.Triplet;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

@ServerEndpoint(value = "/room/{id}")
public class RoomEndpoint {
    /**
     * String : room id
     * Session 1 : Black
     * Session 2 : White
     */
    private static Set<Triplet<String, Session, Session>> rooms = new CopyOnWriteArraySet<>();

    /**
     * String : room id
     * Board : current game
     */
    private static HashMap<String, Board> games = new HashMap<>();

    @OnOpen
    public void onOpen(Session session, @PathParam("id") String roomId) throws IOException {
        Optional<Triplet<String, Session, Session>> optRoom  = findTupleById(roomId);

        if(optRoom.isPresent()) {
            Triplet<String, Session, Session> room = optRoom.get();
            if(room.getValue2() != null) {
                session.getBasicRemote().sendText(OTPCommand.ERR_ROOM_FULL);
            }
            else {
                Triplet<String, Session, Session> fullRoom = room.setAt2(session);
                rooms.remove(room);
                rooms.add(fullRoom);
                session.getBasicRemote().sendText(OTPCommand.INFO_ROOM_JOINED);
                broadcast(fullRoom, OTPCommand.COMMAND_START);

                fullRoom.getValue1().getBasicRemote().sendText(OTPCommand.COMMAND_READY);
                fullRoom.getValue2().getBasicRemote().sendText(OTPCommand.COMMAND_AWAITING);
            }
        }
        else {
            Triplet<String, Session, Session> newRoom = new Triplet<>(roomId, session, null);
            rooms.add(newRoom);
            games.put(roomId, new Board());
            session.getBasicRemote().sendText(OTPCommand.INFO_ROOM_CREATED);
            session.getBasicRemote().sendText(OTPCommand.COMMAND_AWAITING);
        }
    }

    @OnMessage
    public void onMessage(Session session, String coord, @PathParam("id") String roomId) throws IOException {
        System.out.println("receive mes for room : " + roomId);
        System.out.println("req : " + coord);

        Triplet<String, Session, Session> room  = findTupleBySession(session).get();
        if(room.getValue1() == null || room.getValue2() == null) {
            broadcast(room, OTPCommand.COMMAND_AWAITING);
            return;
        }

        Board board = games.get(roomId);
        if(board == null) {
            session.getBasicRemote().sendText(OTPCommand.err("Room does not exist"));
            return;
        }

        try {
            StoneColor color = session.equals(room.getValue1()) ? StoneColor.BLACK : StoneColor.WHITE;
            Coord c = new Coord(coord);
            List<Coord> captured = board.addStone(c, color);

            games.put(roomId, board);
            rooms.remove(room);
            rooms.add(room);

            StringBuilder res = new StringBuilder();
            for(Coord cap : captured) {
                res.append(cap.toString()).append(" ");
            }
            broadcast(room, OTPCommand.result(res.toString()));

            if(board.isFinished()) {
                if(board.getWinner() == StoneColor.BLACK) {
                    room.getValue1().getBasicRemote().sendText(OTPCommand.COMMAND_WIN);
                    room.getValue2().getBasicRemote().sendText(OTPCommand.COMMAND_LOOSE);
                }
                else {
                    room.getValue1().getBasicRemote().sendText(OTPCommand.COMMAND_LOOSE);
                    room.getValue2().getBasicRemote().sendText(OTPCommand.COMMAND_WIN);
                }

                room.getValue1().close();
                room.getValue2().close();
                games.remove(room.getValue0());
                rooms.remove(room);
            }
            else {
                if(session.equals(room.getValue1())) {
                    room.getValue1().getBasicRemote().sendText(OTPCommand.COMMAND_AWAITING);
                    room.getValue2().getBasicRemote().sendText(OTPCommand.COMMAND_READY);
                }
                else {
                    room.getValue1().getBasicRemote().sendText(OTPCommand.COMMAND_READY);
                    room.getValue2().getBasicRemote().sendText(OTPCommand.COMMAND_AWAITING);
                }
            }

        } catch (Exception e) {
            session.getBasicRemote().sendText(OTPCommand.err(e.getMessage()));
        }
    }

    @OnClose
    public void onClose(Session session) throws IOException {
        Triplet<String, Session, Session> room = findTupleBySession(session).get();
        broadcast(room, OTPCommand.COMMAND_END);
        if(room.getValue1() != null) room.getValue1().close();
        if(room.getValue2() != null) room.getValue2().close();
        games.remove(room.getValue0());
        rooms.remove(room);
    }

    @OnError
    public void onError(Session session, Throwable throwable) throws IOException {
        System.out.println("err");
        throwable.printStackTrace();
        session.getBasicRemote().sendText(OTPCommand.err(throwable.getMessage()));
    }

    private static Optional<Triplet<String, Session, Session>> findTupleById(String roomId) {
        return rooms
                .stream()
                .filter(tuple -> tuple.getValue0().equals(roomId))
                .findAny();
    }

    private static Optional<Triplet<String, Session, Session>> findTupleBySession(Session session) {
        return rooms.stream()
                .filter(tuple -> tuple.getValue1().equals(session) || tuple.getValue2().equals(session))
                .findAny();
    }

    private static void broadcast(Triplet<String, Session, Session> room, String message) throws IOException {
        if(room.getValue1() != null) room.getValue1().getBasicRemote().sendText(message);
        if(room.getValue2() != null) room.getValue2().getBasicRemote().sendText(message);
    }

}
