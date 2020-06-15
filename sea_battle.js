const letters = ['А','Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'];
let playerField = document.getElementById('player');
let opponentField = document.getElementById('opponent');

//making tables
for (let i = 0; i < 11; i++) {
  let playerRow = document.createElement('tr');
  let opponentRow = document.createElement('tr');
  for (let k = 0; k < 11; k++) {
    let playerCell = document.createElement('td');
    let opponentCell = document.createElement('td');

    //remove unnecessary borders
    if (i === 0) {
      playerCell.classList.add('firstRow');
      opponentCell.classList.add('firstRow');
    }   

    playerCell.classList.add('cell');
    playerRow.appendChild(playerCell);
    opponentCell.classList.add('cell');
    opponentRow.appendChild(opponentCell);
  }

  //remove unnecessary borders
  playerRow.cells[0].classList.add('firstColumn');
  opponentRow.cells[0].classList.add('firstColumn');
  
  playerField.appendChild(playerRow);
  opponentField.appendChild(opponentRow);
}

//set coordinates
opponentField.rows[0].cells[0].setAttribute('id', 'coords');
opponentField.rows[0].cells[0].setAttribute('id', 'coords');
for (let j = 1; j < playerField.rows.length; j++) {
  playerField.rows[0].cells[j].innerHTML = letters[j-1];
  playerField.rows[j].cells[0].innerHTML = j;
  opponentField.rows[0].cells[j].innerHTML = letters[j-1];
  opponentField.rows[0].cells[j].setAttribute('id', 'coords');
  opponentField.rows[j].cells[0].innerHTML = j;
  opponentField.rows[j].cells[0].setAttribute('id', 'coords');
}

//shooting the opponent field
let targetCell;
function highlight(node) {
  targetCell = node;
  targetCell.classList.add('highlight');
}

opponentField.onclick = function(event) {
  let target = event.target;
  while (target != this) {
    if (target.tagName == 'TD' && target.id !== 'coords') {
      highlight(target);
      return;
    }
    target = target.parentNode;
  }
}

let coordList = document.createElement('div');
document.body.append(coordList);

//placing ships
playerField.onclick = function(event) {
  let target = event.target;
  let targetX = target.cellIndex;
  let targetY = target.parentNode.rowIndex;
  let fourDecksShips = document.getElementsByClassName('fourDecks');
  let threeDecksShips = document.getElementsByClassName('threeDecks');
  let twoDecksShips = document.getElementsByClassName('twoDecks');
  let oneDeckShips = document.getElementsByClassName('oneDeck');
  
  function placeShip(cells, shipClass) {
    if ((targetX !== 0) && (targetY !== 0) &&
      ((targetX + cells <= playerField.rows.length) &&
      !target.classList.contains('ship'))) {      
      for (let i = 0; i < cells; i++) {
        if (playerField.rows[targetY].cells[targetX + cells] === undefined) continue;
        else if ((!playerField.rows[targetY].cells[targetX + cells].classList.contains('ship')) &&
        !playerField.rows[targetY].cells[targetX - 1].classList.contains('ship')) {
          playerField.rows[targetY].cells[targetX + i].classList.add('ship', shipClass);
          playerField.rows[targetY - 1].cells[targetX + i].classList.add('ship');
          playerField.rows[targetY + 1].cells[targetX + i].classList.add('ship');
        }
      }
    }
  }
  //placing 4-decks ship
  if (fourDecksShips.length < 4) {
    placeShip(4, 'fourDecks');
  }

  //placing 3-decks ships
  else if (threeDecksShips.length < 6) {
    placeShip(3, 'threeDecks');
  }

  //placing 2-decks ships
  else if (twoDecksShips.length < 6) {
    placeShip(2, 'twoDecks');
  }

  //placing 1-deck ships
  else if (oneDeckShips.length < 4) {
    placeShip(1, 'oneDeck');
  }
  coordList.innerHTML = targetX + ' : ' + targetY ;


}