let valeurs = JSON.parse(localStorage.getItem("donnees"))
let pseudo = valeurs.pseudo
let abscisse = valeurs.abscisse
let ordonnee = valeurs.ordonnee

let nom = document.getElementById("joueur");

nom.innerHTML = pseudo

//#region liste des cartes

cartes = [
    {
        id: 1,
        nom: "batman",
        url: "images/tokens/01batman.png",
        flipped: false,
        found: false
    },
    {
        id: 2,
        nom: "joker",
        url: "images/tokens/02joker.png",
        flipped: false,
        found: false
    },
    {
        id:3,
        nom: "superman",
        url: "images/tokens/03superman.png",
        flipped: false,
        found: false
    },
    {
        id:4,
        nom: "luthor",
        url: "images/tokens/04luthor.png",
        flipped: false,
        found: false
    },
    {
        id:5,
        nom: "wonderwoman",
        url: "images/tokens/05wonderwoman.png",
        flipped: false,
        found: false
    },
    {
        id:6,
        nom: "sheetha",
        url: "images/tokens/06sheetha.png",
        flipped: false,
        found: false
    },
    {
        id:7,
        nom: "flash",
        url: "images/tokens/07flash.png",
        flipped: false,
        found: false
    },
    {
        id:8,
        nom: "negaflash",
        url: "images/tokens/08negaflash.png",
        flipped: false,
        found: false
    },
    {
        id:9,
        nom: "aquaman",
        url: "images/tokens/09aquaman.png",
        flipped: false,
        found: false
    },
    {
        id:10,
        nom: "blackmanta",
        url: "images/tokens/10black manta.png",
        flipped: false,
        found: false
    },
    {
        id:11,
        nom: "greenarrow",
        url: "images/tokens/11green arrow.png",
        flipped: false,
        found: false
    },
    {
        id:12,
        nom: "merlyn",
        url: "images/tokens/12merlyn.png",
        flipped: false,
        found: false
    },
    {
        id:13,
        nom: "greenlantern",
        url: "images/tokens/13green lantern.png",
        flipped: false,
        found: false
    },
    {
        id:14,
        nom: "sinestro",
        url: "images/tokens/14sinestro.png",
        flipped: false,
        found: false
    },
    {
        id:15,
        nom: "martian",
        url: "images/tokens/15martian.png",
        flipped: false,
        found: false
    },
    {
        id:16,
        nom: "maalefaak",
        url: "images/tokens/16maalefaak.png",
        flipped: false,
        found: false
    },
    {
        id:17,
        nom: "shazam",
        url: "images/tokens/17shazam.png",
        flipped: false,
        found: false
    },
    {
        id:18,
        nom: "blackadam",
        url: "images/tokens/18black adam.png",
        flipped: false,
        found: false
    }]
let nbrPairs = abscisse * ordonnee / 2

// mélanger les cartes
const tableauCartesUnique = Object.entries(cartes);
let paquetShuffled = tableauCartesUnique.sort((a, b) => 0.5 - Math.random());

// créer un paquet en ne prenant que nbrPairs cartes
let cartesEnTrop = tableauCartesUnique.length - nbrPairs;
for (let i = 0; i < cartesEnTrop; i++) {
    tableauCartesUnique.pop();
}

// dupliquer le paquet
let tableauCartesDouble = tableauCartesUnique.slice();
for (let i = 0; i < tableauCartesUnique.length; i++) {
    tableauCartesDouble.push(tableauCartesUnique[i])
}

// mélanger le nouveau paquet
let doublePaquetShuffled = tableauCartesDouble.sort((a, b) => 0.5 - Math.random());

const parentElement=document.getElementById("game");
let lineNumber = 1

function addCard(index) {
    let parentLine=document.getElementById("line"+lineNumber)
    const newCard=document.createElement("div");
    newCard.classList.add("square");
    newCard.id="index"+index;
    newCard.setAttribute("onclick", "revele('index" + index + "')");
    console.log(parentLine)
    parentLine.appendChild(newCard);
}

function addLine() {
    const newLine=document.createElement("div");
    newLine.classList.add("ligne")
    newLine.id="line"+lineNumber
    parentElement.appendChild(newLine);
}



function afficherGrille() {
    addLine()
    for (const key in doublePaquetShuffled) {
        console.log(key)
        if (key%abscisse==0 && key>0) {
            lineNumber++
            addLine();
        }
        addCard(key);
    }
} 

function revele (carte) {
    alert("carte révélée")
    //document.getElementById("index"+carte).style.background-image: url(carte index . url ou un truc dans le genre); pour afficher la bonne carte
    //verifier si c'est la première carte retournée, si c'est la 2eme, checker si les 2 cartes sont les memes, si oui elles ont toutes les 2 found=true
    //compteur de paires trouvées + 1 si ok
    //si compteur de paires trouvées = pairemax alors gagné();
}

afficherGrille();