//#region récupération du localstorage

let playerAndBoardValues = JSON.parse(localStorage.getItem("gameData"));
let pseudo = playerAndBoardValues.pseudo;
let abscisse = playerAndBoardValues.abscisse;
let ordonnee = playerAndBoardValues.ordonnee;
let foundPairs = 0;
let startGame = false;
let playerName = document.getElementById("player");

let scoreTab
let scoreRanking = JSON.parse(localStorage.getItem("score"))
if (!scoreRanking) {
  scoreTab = [];

}
else {
  
  scoreTab = scoreRanking.ranking
}
console.log(scoreRanking)


playerName.innerHTML = pseudo;


//#endregion

//#region Chronometre
let interval;
let countDown = (ordonnee * abscisse * 4)+1; // temps max en secondes pour la partie
let minutes = 0;
let secondes = 0;
const countDownElement = document.getElementById("chrono"); 
function updateChrono() {
  
  countDown -= 1;
  secondes = countDown % 60;
  if (secondes < 10) { secondes = "0" + countDown % 60 }
  minutes = Math.floor(countDown / 60);
  countDownElement.textContent = minutes + ':' + secondes;
  if (countDown <= 0) {
    clearInterval(interval);
    setTimeout(() => {
      gameOver();
    }, 1000);  }
}
updateChrono();


//#endregion

//#region Initation du nombre d'essais et du temps limite

let maxAttempts = abscisse*ordonnee*2;
let totalTime = countDown;


//#endregion


//#region liste des cartes

let cartes = [
  {
    id: 1,
    nom: "batman",
    url: "pictures/01batman.png",
    flipped: false,
    found: false,
  },
  {
    id: 2,
    nom: "joker",
    url: "pictures/02joker.png",
    flipped: false,
    found: false,
  },
  {
    id: 3,
    nom: "superman",
    url: "pictures/03superman.png",
    flipped: false,
    found: false,
  },
  {
    id: 4,
    nom: "luthor",
    url: "pictures/04luthor.png",
    flipped: false,
    found: false,
  },
  {
    id: 5,
    nom: "wonderwoman",
    url: "pictures/05wonderwoman.png",
    flipped: false,
    found: false,
  },
  {
    id: 6,
    nom: "sheetha",
    url: "pictures/06sheetha.png",
    flipped: false,
    found: false,
  },
  {
    id: 7,
    nom: "flash",
    url: "pictures/07flash.png",
    flipped: false,
    found: false,
  },
  {
    id: 8,
    nom: "negaflash",
    url: "pictures/08negaflash.png",
    flipped: false,
    found: false,
  },
  {
    id: 9,
    nom: "aquaman",
    url: "pictures/09aquaman.png",
    flipped: false,
    found: false,
  },
  {
    id: 10,
    nom: "blackmanta",
    url: "pictures/10blackmanta.png",
    flipped: false,
    found: false,
  },
  {
    id: 11,
    nom: "greenarrow",
    url: "pictures/11greenarrow.png",
    flipped: false,
    found: false,
  },
  {
    id: 12,
    nom: "merlyn",
    url: "pictures/12merlyn.png",
    flipped: false,
    found: false,
  },
  {
    id: 13,
    nom: "greenlantern",
    url: "pictures/13greenlantern.png",
    flipped: false,
    found: false,
  },
  {
    id: 14,
    nom: "sinestro",
    url: "pictures/14sinestro.png",
    flipped: false,
    found: false,
  },
  {
    id: 15,
    nom: "martian",
    url: "pictures/15martian.png",
    flipped: false,
    found: false,
  },
  {
    id: 16,
    nom: "maalefaak",
    url: "pictures/16maalefaak.png",
    flipped: false,
    found: false,
  },
  {
    id: 17,
    nom: "shazam",
    url: "pictures/17shazam.png",
    flipped: false,
    found: false,
  },
  {
    id: 18,
    nom: "blackadam",
    url: "pictures/18blackadam.png",
    flipped: false,
    found: false,
  },
];

//#endregion


//#region installer les cartes
let nbrPairs = (abscisse * ordonnee) / 2;
const paquetShuffled = [...cartes].sort((a, b) => 0.5 - Math.random()); // on crée le paquet mélangé en lui ajoutant cartes, qui est mélangé
const slice = paquetShuffled.slice(0, nbrPairs); // il découpe le tableau pour n'en prendre que les nbrPairs éléments
const doublePaquetShuffled = [
  ...slice.map((it) => ({ ...it })),
  ...slice.map((it) => ({ ...it })),
].sort((a, b) => 0.5 - Math.random()); // il crée le tableau final en ajoutant 2x slice et en le mélangeant après

const parentElement = document.getElementById("game");

let lineNumber = 1;

let selectedCard = []; // création d'un tableau qui sera utilisé dans la fonction addCard pour stocker les cartes cliquées
let savedNode = []; // création d'un tableau qui sera utilisé dans la fonction addCard pour stocker l'index de la carte

//#region initialisation de la carte et gestion du jeu
let addCard = function (index) {
  // début de la fonction qui prend en parametre index, elle vient de la fonction affichergrille
  const card = doublePaquetShuffled[index]; // Card est égal à la carte du paquet avec le bon index
  // ajoute une carte dans sa ligne
  let parentLine = document.getElementById("line" + lineNumber); // je récupere la ligne parent car c'est là que je vais ajouter ma carte
  const newCard = document.createElement("div"); // newCard est une div que je vais créer
  newCard.classList.add("square"); // j'y ajoute la classe square
  newCard.id = "index" + index; // j'y ajoute un id="index1" ou 2 ou 3...
  newCard.addEventListener("click", function () { // j'ajoute un eventlistener, quand on clique sur cette case il fait ce qui suit
    //démarrer le chrono si c'est la première carte
    if (!startGame) {
      startGame = true;
      interval = setInterval(updateChrono, 1000);
    }
    // retourner la carte
    if (card.found == false && card.flipped == false) {
      new Audio('sounds/CardFlip.mp3').play()

      tooglepictures(newCard, card.url);

      // mettre flipped à true
      card.flipped = true;

      // compter le nombre de flipped=true
      let flippedCards = doublePaquetShuffled.filter((doublePaquetShuffled) => doublePaquetShuffled.flipped === true && doublePaquetShuffled.found === false);
      let count = flippedCards.length;

      // si 1 = on ajoute la carte cliquée dans le tableau des comparaisons
      selectedCard.push(card);
      savedNode.push("index" + index)

      if (count == 2) {
        console.log("selectedCard : ");
        console.log(selectedCard);
        if (maxAttempts>0) {
          maxAttempts-=1
        }
        

        // on remet le compteur de true à 0
        flippedCards = []
        count = 0;

        // on compare les 2 cartes?  
        if (selectedCard[0].id == selectedCard[1].id) {// si c'est le meme =>

          foundPairs += 1;

          selectedCard[0].found = true
          selectedCard[1].found = true

          // le tableau des cartes tirées est remis à 0
          selectedCard = [];
          savedNode = [];

          // si pairestrouvées = paires max => gagné
          if (foundPairs == nbrPairs) {
            // if (foundPairs == 1) {
            setTimeout(() => {
              gameOver();
            }, 1000);
          }
        }
        else {
          let card1 = document.getElementById(savedNode[0])
          let card2 = document.getElementById(savedNode[1])
          // desactiver click
          disableMouseClicks();
          // on attends 2 secondes 
          setTimeout(() => {
            // les 2 cartes sont retournée, flipped = false
            selectedCard[0].flipped = false;
            tooglepictures(card1, selectedCard[0].url);
            selectedCard[1].flipped = false;
            tooglepictures(card2, selectedCard[1].url);
            // le tableau des cartes tirées est remis à 0
            selectedCard = [];
            savedNode = [];
            // reactiver click
            enableMouseClicks();
          }, 1000);
        }
      }
    }
  })
  parentLine.appendChild(newCard);
};
//#endregion


function addLine() {
  // crée une ligne.  elle vient de la fonction affichergrille
  const newLine = document.createElement("div"); // newline est un element à créer de type div
  newLine.classList.add("ligne"); // on ajoute la classe "ligne" à newline
  newLine.id = "line" + lineNumber; // on ajoute un id à la ligne
  parentElement.appendChild(newLine); // on ajoute la ligne créée avec sa classe et son id
}

const tooglepictures = function (card, url) {
  // fonction pour retourner l'image, si elle est sur le dos, on la mets sur face, sinon on la met sur dos.  appelée dans addCard
  console.log(card.hasAttribute("style"), url);
  if (
    card.style.backgroundImage == 'url("pictures/DcDos.jpg")' ||
    !card.hasAttribute("style") // si l'image de fond est dos ou que la carte n'a pas d'image de fond (par contre je sais pas c'est quoi cette histoire de !card.hasAttribute("style")) mais si je l'enlève ça marche plus
  ) {
    card.style.backgroundImage = `url(${url})`; // alors il mets l'image du personnage
    card.style.transition = "transform 0.5s ease"; // pour une transition lente
    card.style.transform = "rotateY(180deg)";// et il la tourne de 180°
  } else {
    card.style.backgroundImage = 'url("pictures/DcDos.jpg")'; // sinon il mets l'image de dos
    card.style.transition = "transform 0.5s ease";  // pour une transition lente
    card.style.transform = "rotateY(0deg)";// et il la tourne de 180°
  }
};

function afficherGrille() {
  addLine();
  for (const key in doublePaquetShuffled) {
    if (key % abscisse == 0 && key > 0) {
      lineNumber++;
      addLine();
    }
    addCard(key);
  }
}
afficherGrille();

//#endregion


//#region suppresion et activation du clic de souris

function disableMouseClicks() { // désactiver la souris
  document.addEventListener('click', disableClickEvent, true);
}

function disableClickEvent(event) { 
  event.stopPropagation();
  event.preventDefault();
}

function enableMouseClicks() { // réactiver la souris
  document.removeEventListener('click', disableClickEvent, true);
}

//#endregion

//#region Fin De Partie


function gameOver() {
  document.getElementById('modal').style.display = 'block'; // pour révéler le Modal dans l'html
  // alert("Partie terminée, cliquez sur OK pour voir votre classement");
  
  document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
  let scoreNbrAttemps=maxAttempts*abscisse*ordonnee
  let scoreTimeLeft=countDown*10
  let scoreTotal=scoreNbrAttemps+scoreTimeLeft
  
  let recordPlayer={
    playerName:pseudo,
    score:scoreTotal,
    time:new Date()
  }
  scoreTab.push(recordPlayer); // scoreTab qui a été récupéré lors de la récupération du localStorage

  let scoreValues = {
    pseudo:pseudo,
    scoreTotal:scoreTotal,
    ranking:scoreTab
  }
  let scoreJson = JSON.stringify(scoreValues);
  localStorage.setItem("score", scoreJson);
 
  window.location.href = 'fin.html';
}
});
}

//#endregion