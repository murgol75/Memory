let numberOfRow=0
let numberOfColumn=0

//#region fonction pour mettre en surbrillance le bouton choisi et definir l'abscisse et l'ordonnée

function selectLevel(level) {
  // Récupérer tous les boutons de niveau
  let levelButtons = document.getElementsByClassName('level-button');

  // Réinitialiser tous les boutons à leur couleur de base
  for (var i = 0; i < levelButtons.length; i++) {
    levelButtons[i].classList.remove('selected');
  }

  // Mettre en surbrillance le bouton du niveau sélectionné
  let selectedButton = document.getElementById('btn-' + level);
  selectedButton.classList.add('selected');

  // déclaration de la taille du tableau en numberOfRow et numberOfColumn
  let xy=level.split("x");
  numberOfRow=parseInt(xy[0],10)
  numberOfColumn=parseInt(xy[1],10)
}

//#endregion


//#region fonction pour valider l'enregistrement et passer à la suite si tout est remplis

document.getElementById("validate").addEventListener("click", function(event) {
  event.preventDefault(); // Empêche la soumission du formulaire (rechargement de la page)
  let pseudo=document.getElementById("pseudo").value;
  if (pseudo=="") {
    alert("vous n'avez pas indiqué votre nom")
    return;
  }
  if (numberOfRow==0) {
    alert("vous n'avez pas choisi le niveau")
    return;
  }
  // envoi des valeurs dans le LocalStorage
  let gameData = {
    pseudo : pseudo,
    abscisse : numberOfRow,
    ordonnee : numberOfColumn
  }
  let gameDataJson = JSON.stringify(gameData);
  localStorage.setItem("gameData", gameDataJson);
  window.location.href = "jeu.html";
})