//#region recommencer

const button = document.getElementById('again');

button.addEventListener('click', function() {
    window.location.href = 'index.html';
});


//#endregion

//#region recuperer localstorage


let valeurs = JSON.parse(localStorage.getItem("donnees"));
let pseudo = valeurs.pseudo;
let abscisse = valeurs.abscisse;
let ordonnee = valeurs.ordonnee;


let score = JSON.parse(localStorage.getItem("score"));
let coupsMax = score.coupsMax;
let coupJoue = score.coupsJoue;
let tempsTotal = score.tempsTotal;
let tempsRestant = score.tempsRestant;

alert(coupsMax)
alert(coupJoue)
alert(tempsTotal)
alert(tempsRestant)


//#endregion

