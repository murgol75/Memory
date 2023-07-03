let valeurs = JSON.parse(localStorage.getItem("donnees"));
let pseudo = valeurs.pseudo;
let abscisse = valeurs.abscisse;
let ordonnee = valeurs.ordonnee;

let nom = document.getElementById("joueur");

nom.innerHTML = pseudo;

//#region liste des cartes

let cartes = [
  {
    id: 1,
    nom: "batman",
    url: "images/tokens/01batman.png",
    flipped: false,
    found: false,
  },
  {
    id: 2,
    nom: "joker",
    url: "images/tokens/02joker.png",
    flipped: false,
    found: false,
  },
  {
    id: 3,
    nom: "superman",
    url: "images/tokens/03superman.png",
    flipped: false,
    found: false,
  },
  {
    id: 4,
    nom: "luthor",
    url: "images/tokens/04luthor.png",
    flipped: false,
    found: false,
  },
  {
    id: 5,
    nom: "wonderwoman",
    url: "images/tokens/05wonderwoman.png",
    flipped: false,
    found: false,
  },
  {
    id: 6,
    nom: "sheetha",
    url: "images/tokens/06sheetha.png",
    flipped: false,
    found: false,
  },
  {
    id: 7,
    nom: "flash",
    url: "images/tokens/07flash.png",
    flipped: false,
    found: false,
  },
  {
    id: 8,
    nom: "negaflash",
    url: "images/tokens/08negaflash.png",
    flipped: false,
    found: false,
  },
  {
    id: 9,
    nom: "aquaman",
    url: "images/tokens/09aquaman.png",
    flipped: false,
    found: false,
  },
  {
    id: 10,
    nom: "blackmanta",
    url: "images/tokens/10black manta.png",
    flipped: false,
    found: false,
  },
  {
    id: 11,
    nom: "greenarrow",
    url: "images/tokens/11green arrow.png",
    flipped: false,
    found: false,
  },
  {
    id: 12,
    nom: "merlyn",
    url: "images/tokens/12merlyn.png",
    flipped: false,
    found: false,
  },
  {
    id: 13,
    nom: "greenlantern",
    url: "images/tokens/13green lantern.png",
    flipped: false,
    found: false,
  },
  {
    id: 14,
    nom: "sinestro",
    url: "images/tokens/14sinestro.png",
    flipped: false,
    found: false,
  },
  {
    id: 15,
    nom: "martian",
    url: "images/tokens/15martian.png",
    flipped: false,
    found: false,
  },
  {
    id: 16,
    nom: "maalefaak",
    url: "images/tokens/16maalefaak.png",
    flipped: false,
    found: false,
  },
  {
    id: 17,
    nom: "shazam",
    url: "images/tokens/17shazam.png",
    flipped: false,
    found: false,
  },
  {
    id: 18,
    nom: "blackadam",
    url: "images/tokens/18black adam.png",
    flipped: false,
    found: false,
  },
];
let nbrPairs = (abscisse * ordonnee) / 2;

// mélanger les cartes
const paquetShuffled = [...cartes].sort((a, b) => 0.5 - Math.random()); // on crée le paquet mélangé en lui ajoutant cartes, qui est mélangé
const slice = paquetShuffled.slice(0, nbrPairs); // il découpé le tableau pour n'en prendre que les nbrPairs éléments
const doublePaquetShuffled = [
  ...slice.map((it) => ({ ...it })),
  ...slice.map((it) => ({ ...it })),
].sort((a, b) => 0.5 - Math.random()); // il crée le tableau final en ajoutant 2x slice et en le mélangeant après

const parentElement = document.getElementById("game");

let lineNumber = 1;

let selectedCard = []; // création d'un tableau qui sera utilisé dans la fonction addCard

let addCard = function (index) {
  // début de la fonction qui prend en parametre index, elle vient de la fonction affichergrille
  const card = doublePaquetShuffled[index]; // Card est égal à la carte du paquet avec le bon index
  // ajoute une carte dans sa ligne
  let parentLine = document.getElementById("line" + lineNumber); // je récupere la ligne parent car c'est là que je vais ajouter ma carte
  const newCard = document.createElement("div"); // newCard est une div que je vais créer
  newCard.classList.add("square"); // j'y ajoute la classe square
  newCard.id = "index" + index; // j'y ajoute un id="index1" ou 2 ou 3...
  newCard.addEventListener("click", function () {
    // j'ajoute un eventlistener, quand on clique sur cette case il fait ce qui suit
    if (!card.flipped){
        card.flipped=!card.flipped; // la carte change de position, de flipped=false elle devient flipped=true
    selectedCard.push(this); // la carte cliquée est ajoutée au tableau
    console.log(selectedCard);
    // revele("index"+ index)
    const flipped = doublePaquetShuffled.filter(
      (it) => it.flipped && !it.found
    ); //il filtre mon paquet pour créer un nouveau tableau (flipped) qui contient les élements qui sont retourné (flipped=true) et qui n'ont pas encore été trouvées (found=false)
    // console.log(flipped);
    if (card.flipped) {
      // si la carte est retournée
      toogleImage(this, card.url); // appel de la fonction pour retourner l'image
    }

    if (flipped.length == 2) {
      // si le nombre de cartes retournées est égal à 2, alors on commence la comparaison
      const ids = doublePaquetShuffled // ids = le paquet
        .filter((it) => it.flipped) //filtré par toutes les cartes qui sont retournées
        .map((it) => it.id); //  est utilisé pour extraire les IDs de ces cartes retournées. Les IDs sont stockés dans le tableau ids.  donc au final ids est un tableau avec 2 id
      if (ids[0] != ids[1]) {
        // si les 2 id sont différents
        flipped.forEach((it) => (it.flipped = false)); // renvoie toutes les cartes flipped true à false
        setTimeout(() => {
          // fait l'action qui suit après 3 secondes
          selectedCard.forEach((it) => toogleImage(it, card.url)); //parcours le tableau de cartes (2 cartes) pour remettre la carte sur DOS
          selectedCard = []; // vide le tableau
        }, 1000);
      } else {
        // sinon si les 2 sont bons, alors c'est une paire
        flipped.forEach((it) => (it.found = true)); // transforme la valeur found des 2 cartes sur true
      }
    }
  }});
  parentLine.appendChild(newCard); // ajoute la carte dans la ligne
};

function addLine() {
  // crée une ligne.  elle vient de la fonction affichergrille
  const newLine = document.createElement("div"); // newline est un element à créer de type div
  newLine.classList.add("ligne"); // on ajoute la classe "ligne" à newline
  newLine.id = "line" + lineNumber; // on ajoute un id à la ligne
  parentElement.appendChild(newLine); // on ajoute la ligne créée avec sa classe et son id
}

const toogleImage = function (card, url) {
  // fonction pour retourner l'image, si elle est sur le dos, on la mets sur face, sinon on la met sur dos.  appelée dans addCard
  //   console.log(card.hasAttribute("style"), url);
  if (
    card.style.backgroundImage == "url('images/DcDos.jpg')" ||
    !card.hasAttribute("style") // si l'image de fond est dos ou que la carte n'a pas d'image de fond (par contre je sais pas c'est quoi cette histoire de !card.hasAttribute("style"))
  ) {
    card.style.backgroundImage = `url(${url})`; // alors il mets l'image du personnage
  } else {
    card.style.backgroundImage = "url('images/DcDos.jpg')"; // sinon il mets l'image de dos
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

//#region  ne sert plus car attachée à la fonction revele
let flippedcards = 0; // ne sert plus car attachée à la fonction revele
let foundPairs = 0; // ne sert plus car attachée à la fonction revele
let ancienneCarte = null; // ne sert plus car attachée à la fonction revele
let idCarte1 = 0; // ne sert plus car attachée à la fonction revele
let flippedCard = null; // ne sert plus car attachée à la fonction revele

function revele(carte) {
  // ancienne version de moi, qui ne fonctionne plus depuis l'intervention prof puisqu'il a mis un addeventlistener à la création de la carte
  // trouver l'index dans le tableau sur base de carte
  let chaine = carte;
  let bonIndex = chaine.match(/\d+/)[0];
  // Conversion de la valeur en nombre entier
  bonIndex = parseInt(bonIndex);

  // recuperer l'id de la carte pour comparaison
  let currentCardId = doublePaquetShuffled[bonIndex].id;

  // récuperer la carte sur laquelle je viens de cliquer
  flippedCard = document.getElementById(carte);

  // supprimer onclick pour qu'on ne puisse pas recliquer dessus
  // flippedCard.onclick = null;
  flippedCard.removeEventListener("click", flippedCard);

  // ajouter 1 à flippedcards (donc soit il passe de 0 à 1 soit de 1 à 2, puisque s'il est à 2, il repasse à 0)
  flippedcards += 1;

  // afficher le dessin de la carte.
  let url = doublePaquetShuffled[bonIndex].url; //récupère l'url de la carte
  flippedCard.style.backgroundImage = `url(${url})`; //remplace DcDos par la bonne image

  // si c'est la première carte, il faut l'enregistrer pour la comparer après
  if (flippedcards == 1) {
    ancienneCarte = flippedCard;
    idCarte1 = doublePaquetShuffled[bonIndex].id;
    indexCarte1 = bonIndex;
    // sinon, c'est que c'est la 2eme, du coup, il faut remettre le compteur des cartes retournées à 0 et vérifier si les 2 cartes sont identiques.  Si c'est le cas, on ajoute 1 aux paires trouvées, on vérifie si paires trouvées = maxpaires, et si oui, c'est gagné
  } else {
    console.log(
      { card: ancienneCarte, id: idCarte1 },
      { card: flippedCard, id: currentCardId }
    );
    flippedcards = 0;
    if (currentCardId == idCarte1) {
      foundPairs += 1;
      if (foundPairs == nbrPairs) {
        alert("C'est Gagné");
      }
    } else {
      // on retourne les cartes
      setTimeout(() => {
        ancienneCarte.style.backgroundImage = "url('images/DcDos.jpg')";
        flippedCard.style.backgroundImage = "url('images/DcDos.jpg')";
        // on remets onclick
        //   flippedCard.onclick = "revele('index" + bonIndex + "')";
        //   ancienneCarte.onclick = "revele('index" + indexCarte1 + "')";
        flippedCard.addEventListener("click", () => revele("index" + bonIndex));
        ancienneCarte.addEventListener("click", () =>
          revele("index" + indexCarte1)
        );
        ancienneCarte = null;
        flippedCard = null;
      }, 1000);
    }
  }
}

//#endregion
