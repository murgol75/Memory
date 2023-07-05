x=0
y=0

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

  // déclaration de la taille du tableau en X et Y
  let xy=level.split("x");
  x=parseInt(xy[0],10)
  y=parseInt(xy[1],10)
}

document.getElementById("valide").addEventListener("click", function(event) {
  event.preventDefault(); // Empêche la soumission du formulaire (rechargement de la page)
  let pseudo=document.getElementById("pseudo").value;
  if (pseudo=="") {
    alert("vous n'avez pas indiqué votre nom")
    return;
  }
  if (x==0) {
    alert("vous n'avez pas choisi le niveau")
    return;
  }
  let valeurs = {
    pseudo : pseudo,
    abscisse : x,
    ordonnee : y
  }
  let valeurJson = JSON.stringify(valeurs);
  localStorage.setItem("donnees", valeurJson);
  window.location.href = "jeu.html";
})