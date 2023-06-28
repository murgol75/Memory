function selectLevel(level) {
  // Récupérer tous les boutons de niveau
  var levelButtons = document.getElementsByClassName('level-button');

  // Réinitialiser tous les boutons à leur couleur de base
  for (var i = 0; i < levelButtons.length; i++) {
    levelButtons[i].classList.remove('selected');
  }

  // Mettre en surbrillance le bouton du niveau sélectionné
  var selectedButton = document.getElementById('btn-' + level);
  selectedButton.classList.add('selected');

  // Ici, tu peux effectuer d'autres actions en fonction du niveau sélectionné, par exemple, lancer le jeu correspondant à ce niveau.
}
