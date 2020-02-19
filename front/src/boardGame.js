
// Longueur d'un trait : 50px
// Nombre de points : 12
// Décalage : 15px

// Nombre de carré sur une ligne : pair 6, impair 5


var columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
var rows = ["12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1"];

$(function(){

    // --------------------------------------------------------- //
    // -- CREATION DU PLATEAU DE JEU --------------------------- //
    // --------------------------------------------------------- //

    var boardGame = $("#boardGame");

    // Création des colonnes
    var htmlColumnLayer = "<div class=\"board-layer\">";
    for (var i = 0; i < 12; i++)
    {
        htmlColumnLayer += "<div class=\"board-column\">";
        for (var j = 0; j < 11; j++)
        {
            htmlColumnLayer += "<div class=\"board-verticalLine\"></div>";
        }
        htmlColumnLayer += "</div>";
    }
    htmlColumnLayer += "</div>";

    // Ajout du code à l'intérieur de la balise boardGame
    boardGame.append(htmlColumnLayer);



    // Création des lignes
    var htmlRowLayer = "<div class=\"board-layer fldc\">";
    for (var i = 0; i < 12; i++)
    {
        htmlRowLayer += "<div class=\"board-row\">";
        for (var j = 0; j < 11; j++)
        {
            htmlRowLayer += "<div class=\"board-horizonalLine\"></div>";
        }
        htmlRowLayer += "</div>";
    }
    htmlRowLayer += "</div>";

    // Ajout du code à l'intérieur de la balise boardGame
    boardGame.append(htmlRowLayer);


    // Création de la diagonale des losanges
    var htmlDiamondCenterLayer = "<div class=\"board-layer fldc\">";
    for (var i = 0; i < 12; i++)
    {
        if (i === 0)
        {
            htmlDiamondCenterLayer += "<div class=\"board-diamondCenter-row" + (i===0? " first" : "") + "\"></div>";
        }
        else
        {
            htmlDiamondCenterLayer += "<div class=\"board-diamondCenter-row\">";

            var nbLosange = 6;
            if (i%2 === 0)
                nbLosange = 5;

            for (var j = 0; j < nbLosange; j++)
            {
                htmlDiamondCenterLayer += "<div class=\"board-diamondCenter-line\"></div>";
            }
            htmlDiamondCenterLayer += "</div>";
        }
    }
    htmlDiamondCenterLayer += "</div>";

    // Ajout du code à l'intérieur de la balise boardGame
    boardGame.append(htmlDiamondCenterLayer);


    // Création des diagonales des carrés
    var htmlSquareCenterLayer = "<div class=\"board-layer fldc\">";
    for (var i = 0; i < 11; i++)
    {
        htmlSquareCenterLayer += "<div class=\"board-squareCenter-row\">";

        var nbCarres = 6;
        if (i%2 === 0)
            nbCarres = 5;

        for (var j = 0; j < nbCarres; j++)
        {
            htmlSquareCenterLayer += "<div class=\"board-squareCenter-line\"></div>";
            htmlSquareCenterLayer += "<div class=\"board-squareCenter-line\"></div>";
        }
        htmlSquareCenterLayer += "</div>";
    }

    htmlSquareCenterLayer += "</div>";

    // Ajout du code à l'intérieur de la balise boardGame
    boardGame.append(htmlSquareCenterLayer);


    // Ajout des carrés de couleur
    var htmlSquareColorLayer = "<div class=\"board-layer fldc color\">";
    for (var i = 0; i < 11; i++)
    {
        htmlSquareColorLayer += "<div class=\"board-squareColor-row\">";

        var nbCarres = 6;
        if (i%2 === 0)
            nbCarres = 5;

        for (var j = 0; j < nbCarres; j++)
        {
            htmlSquareColorLayer += "<div class=\"board-squareColor-square\"></div>";
        }
        htmlSquareColorLayer += "</div>";
    }

    htmlSquareColorLayer += "</div>";

    // Ajout du code à l'intérieur de la balise boardGame
    boardGame.append(htmlSquareColorLayer);


    // Ajout des pierres
    var htmlStoneLayer = "<div class=\"board-layer fldc stone\">";

    var indexRows = 0;
    var indexColumns = 0;
    for (var i = 0; i < 6; i++)
    {
        // Ligne sans offset
        htmlStoneLayer += "<div class=\"boardGame-stones-row\">";
        for (var j = 0; j < 12; j++)
        {
            var id = columns[j] + "," + rows[indexRows];
            htmlStoneLayer += "<div class=\"boardGame-stone\" id=\""+ id +"\"></div>";
        }
        htmlStoneLayer += "</div>";

        // Ligne square
        htmlStoneLayer += "<div class=\"boardGame-stones-row squareCenter\">";
        indexColumns = 1;
        for (var j = 0; j < 5; j++)
        {
            var id = columns[indexColumns] + "-" + columns[indexColumns+1] + "," + rows[indexRows] + "-" + rows[indexRows+1];
            htmlStoneLayer += "<div class=\"boardGame-stone\" id=\""+ id +"\"></div>";
            indexColumns += 2;
        }
        htmlStoneLayer += "</div>";

        indexRows++;

        // Ligne sans offset
        htmlStoneLayer += "<div class=\"boardGame-stones-row offset\">";
        for (var j = 0; j < 12; j++)
        {
            var id = columns[j] + "," + rows[indexRows];
            htmlStoneLayer += "<div class=\"boardGame-stone\" id=\""+ id +"\"></div>";
        }
        htmlStoneLayer += "</div>";

        if (i < 5)
        {
            // Ligne square
            htmlStoneLayer += "<div class=\"boardGame-stones-row squareCenter no-offset\">";
            indexColumns = 0;
            for (var j = 0; j < 6; j++)
            {
                var id = columns[indexColumns] + "-" + columns[indexColumns+1] + "," + rows[indexRows] + "-" + rows[indexRows+1];
                htmlStoneLayer += "<div class=\"boardGame-stone\" id=\""+ id +"\"></div>";
                indexColumns += 2;
            }
            htmlStoneLayer += "</div>";
        }

        indexRows++;

    }

    htmlStoneLayer += "</div>";

    // Ajout du code à l'intérieur de la balise boardGame
    boardGame.append(htmlStoneLayer);


    // Ajout des coordonnées sur le côté du plateau
    var htmlBoardCoord = "<div class=\"board-coord-bar\">";
    for (var i = 0; i < 12; i++)
    {
        htmlBoardCoord += "<div class=\"board-coord\">" + rows[i] + "</div>";
    }
    htmlBoardCoord += "</div>";

    // Ajout du code à l'intérieur de la balise boardContainer
    $("#boardContainer").prepend(htmlBoardCoord);
    $("#boardContainer").append(htmlBoardCoord);


    // Ajout des coordonnées sur le bas et haut du plateau
    var htmlBoardCoordH = "<div class=\"board-coord-bar horizontal\">";

    for (var i = 0; i < 12; i++)
    {
        htmlBoardCoordH += "<div class=\"board-coord\">" + columns[i] + "</div>";
    }
    htmlBoardCoordH += "</div>";

    // Ajout du code à l'intérieur de la balise boardGame
    boardGame.prepend(htmlBoardCoordH);
    boardGame.append(htmlBoardCoordH);


    // ------------------------------------------------ //
    // -- Gestion des clics --------------------------- //
    // ------------------------------------------------ //

    $(".boardGame-stone").click(function (e)
    {
        if (!$(this).hasClass("active"))
        {
            var coord = $(this).attr("id");
            sendCoord(coord, onResultSentCoord);
        }
    });

    function onResultSentCoord(result) {
        // WHEN OK
        $(this).addClass("active");

        if ($(".board-layer.stone").hasClass("white"))
            $(this).addClass("white");
        else
            $(this).addClass("black");

        $(".board-layer.stone").toggleClass("white")
    }

});

