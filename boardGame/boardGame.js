
// Longueur d'un trait : 50px
// Nombre de points : 12
// Décalage : 15px

// Nombre de carré sur une ligne : pair 6, impair 5

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
    for (var i = 0; i < 2; i++)
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
});