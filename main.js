
var url = "cars.json";
var req = new XMLHttpRequest();
req.open("GET", url);
req.onerror = function() {
    console.log("Échec de chargement "+url);
};
req.onload = function() {
    if (req.status === 200) {
        var data = JSON.parse(req.responseText);
        console.log(data);
        // do what you have to do with 'data'
    } else {
        console.log("Erreur " + req.status);
    }
    for (car in req) {
        console.log(car);
    }
};
req.send();

