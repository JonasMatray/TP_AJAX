"use strict";

var url_cars = "https://raw.githubusercontent.com/AdamAffou/TP-Ajax-/main/cars.json"; //appel du fichier via ajax
var req_cars = new XMLHttpRequest(); //création de la requète XML pour la liste de voiture
req_cars.open("GET", url_cars);   // ouverture du fichier
req_cars.onerror = function () {
    console.log("Échec de chargement " + url_cars); //console log en cas d'erreur de chargement
};

var data;

function req_hp(id) { // fonction appelé au click d'un bouton avec l'id de l'element en parametre
    var url_hp = "https://raw.githubusercontent.com/AdamAffou/TP-Ajax-/main/horsePower.json"; //appel du fichier via ajax
    var req_hp = new XMLHttpRequest(); //création de la requète XML pour la liste de chevaux
    req_hp.open("GET", url_hp); //ouverture du fichier
    req_hp.onerror = function () {
        console.log("Échec de chargement " + url_hp);
    };
    req_hp.onload = function () {

        if (req_hp.status === 200) {

            var data_hp = JSON.parse(req_hp.responseText); // les données sont enregistrés dans la variable data_hp
            console.log(data_hp);
            //utiliser les "data" pour faire nos requetes

        } else {
            console.log("Erreur " + req_hp); // log d'erreur en cas d'echec de récupération
        }

        var value = document.getElementById(id); //récuperer l'element bouton
        value.innerHTML = data_hp[id].Horsepower; // afficher la valeur a la place du texte du bouton
    }
    req_hp.send(); //envoie de la requete hp (chevaux)
}

req_cars.onload = function () {

    if (req_cars.status === 200) {

        data = JSON.parse(req_cars.responseText); // enregistrement des donnees dans var Data
        console.log(data);
        //utiliser les "data" pour faire nos requetes

    } else {
        console.log("Erreur " + req_cars.status); // console log en cas d'erreur
    }

    for (let i = 0; i < data.length; i += 1) { //parcours de toute la liste des voitures

        var newTR = document.createElement("tr"); //création de l'element tr (nouvelle ligne)
        newTR.id = "line_" + i.toString();
        newTR.innerHTML = "<td>" + data[i].Name + "</td> <td>" + data[i].Miles_per_Gallon + "</td> <td>" + data[i].Cylinders + "</td> <td>" + data[i].Displacement + "</td> <td>" + data[i].Weight_in_lbs + "</td> <td>" + data[i].Acceleration + "</td> <td>" + data[i].Year + "</td> <td>" + data[i].Origin + "</td> <button id='" + i + "' onclick='req_hp(" + i + ")'>Get HP</button>";//Ajout du contenu de cette ligne
        document.getElementById("table_cars").appendChild(newTR); //Ajout de la ligne au tableau

    }
};
req_cars.send(); //envoie de la requète voiture

window.onload = function () { //chargement de la fenetre avec la fonction en référence

    const searchName = document.getElementById('search_input'); //récupération de l'input nom
    const searchAccel = document.getElementById('accel_input'); //récupération de l'input accel
    const searchBtn = document.getElementById('search_btn'); // recupération du bouton

    searchName.addEventListener('input', function (event) { //

        searchGeneral(searchName, searchAccel); // appel de la fonction qui filtre les elements du tableau
    });

    searchAccel.addEventListener('input', function (event) { //

        searchGeneral(searchName, searchAccel); // appel de la fonction qui filtre les elements du tableau
    });

    searchBtn.addEventListener('click', function (event) { // action a l'evenement clique sur le bouton

        //la fonction étais dans les consigne mais grace a notre amélioration, elle devient obselète.
        //Nous l'avons laissez uniquement parce qu'elle est mentionnée dans les consignes.

        searchGeneral(searchName, searchAccel); // appel de la fonction qui filtre les elements du tableau
    });
}


function searchGeneral(searchName, searchAccel) {

    let linesCars = document.querySelectorAll("tr"); //renvoie tous les éléments qui correspondent au selecteur tr

    for (let line of linesCars) {

        if (!(line.id === '')) {
            let lineName = line.firstChild.textContent.toLowerCase(); // récupération du champ nom de la ligne
            let lineAccel = parseFloat(line.children[5].textContent); // récupération du champ acceleration de lal ligne

            if (!lineName.match(searchName.value.toLowerCase()) || (!(lineAccel < searchAccel.value) && !(searchAccel.value.toString() === ''))) { // vérification des conditions pour les deux input
                line.style.visibility = "collapse"; //enlevement des lignes qui ne corresponde pas à la recherche
            } else {
                line.style.visibility = "visible"; //affichage des lignes qui corresponde à la recherche
            }
        }
    }
}
