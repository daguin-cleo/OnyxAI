
// Longueur d'un trait : 50px
// Nombre de points : 12
// Décalage : 15px

// Nombre de carré sur une ligne : pair 6, impair 5


var columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
var rows = ["12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1"];

$(function(){

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
            htmlStoneLayer += "<div class=\"boardGame-stone\" id=\""+ rows[indexRows] + columns[j] +"\"></div>";
        }
        htmlStoneLayer += "</div>";

        // Ligne square
        htmlStoneLayer += "<div class=\"boardGame-stones-row squareCenter\">";
        for (var j = 0; j < 5; j++)
        {
            indexColumns = 0;
            htmlStoneLayer += "<div class=\"boardGame-stone\" id=\""+ rows[indexRows] + rows[indexRows+1] + columns[indexColumns] + columns[indexColumns+1] +"\"></div>";
            indexColumns++;
        }
        htmlStoneLayer += "</div>";

        indexRows++;

        // Ligne sans offset
        htmlStoneLayer += "<div class=\"boardGame-stones-row offset\">";
        for (var j = 0; j < 12; j++)
        {
            htmlStoneLayer += "<div class=\"boardGame-stone\" id=\""+ rows[indexRows] + columns[j] +"\"></div>";
        }
        htmlStoneLayer += "</div>";

        if (i < 5)
        {
            // Ligne square
            htmlStoneLayer += "<div class=\"boardGame-stones-row squareCenter no-offset\">";
            for (var j = 0; j < 6; j++)
            {
                indexColumns = 0;
                htmlStoneLayer += "<div class=\"boardGame-stone\" id=\""+ rows[indexRows] + rows[indexRows+1] + columns[indexColumns] + columns[indexColumns+1] +"\"></div>";
                indexColumns++;
            }
            htmlStoneLayer += "</div>";
        }

        indexRows++;

    }

    htmlStoneLayer += "</div>";

    // Ajout du code à l'intérieur de la balise boardGame
    boardGame.append(htmlStoneLayer);


    // ------------------------------------------------ //
    // -- Gestion des clics --------------------------- //
    // ------------------------------------------------ //

    $(".boardGame-stone").click(function (e) {
        $(this).addClass("active");
        $(this).css({"cursor" : "normal"});

        console.log($(this));

        if ($(".board-layer.stone").hasClass("white"))
            $(this).addClass("white");
        else
            $(this).addClass("black");

        $(".board-layer.stone").toggleClass("white")
    });

});