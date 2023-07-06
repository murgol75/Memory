//#region recuperer localstorage
let score = JSON.parse(localStorage.getItem("score"));
let playerName=score.pseudo;
let scoreTotal=score.scoreTotal;
let tabScore=score.ranking;
//#endregion

//#region afficher les scores du joueur
let printTotalScore=document.getElementById("score")
let printPlayerName=document.getElementById("playerName")
printTotalScore.innerHTML=scoreTotal
printPlayerName.innerHTML=playerName
//#endregion

//#region afficher le tableau de score
// on trie les scores par ordre décroissant
tabScore.sort(function(a, b) {
  return b.score - a.score;
});

let tBody=document.getElementById("tableScore")

let rankNumber=1

tabScore.forEach(data => {
  if (rankNumber<=10) {
  let row = document.createElement('tr');
  
  let rank=document.createElement("td");
  rank.textContent=rankNumber;
  row.appendChild(rank);
  
  let scoreCell=document.createElement("td");
  scoreCell.textContent=data.score;
  row.appendChild(scoreCell);
  
  let playerNameCell=document.createElement("td");
  playerNameCell.textContent=data.playerName;
  row.appendChild(playerNameCell);
  
  let timeCell=document.createElement("td");
  let date=new Date(data.time);
  let options = {day: '2-digit', month: '2-digit', year: 'numeric' };
  let formattedDate = date.toLocaleDateString(undefined, options);
  timeCell.textContent=formattedDate;
  row.appendChild(timeCell);
  
  tBody.appendChild(row);
  rankNumber+=1}
});
//#endregion

//#region recommencer
const button = document.getElementById('again');

button.addEventListener('click', function() {
    window.location.href = 'index.html';
});
//#endregion