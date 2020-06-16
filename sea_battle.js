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

let message = document.createElement('span');
message.classList.add('message');
message.innerHTML = 'Place 4-decks ship';
playerField.after(message);


//placing ships
playerField.onclick = function(event) {

  let target = event.target;
  let targetX = target.cellIndex;
  let targetY = target.parentNode.rowIndex;
  let fourDecksShips = document.getElementsByClassName('fourDecks');
  let threeDecksShips = document.getElementsByClassName('threeDecks');
  let twoDecksShips = document.getElementsByClassName('twoDecks');
  let oneDeckShips = document.getElementsByClassName('oneDeck');
  
  function placeShipHorisontal(decks, shipClass) {
    let afterShip = playerField.rows[targetY].cells[targetX + decks-1];
    let beforeShip = playerField.rows[targetY].cells[targetX - 1];
    
    if ((targetX !== 0) && (targetY !== 0) && ((targetX + decks <= playerField.rows.length) &&
    !target.classList.contains('ship') && !target.classList.contains('nearShip')) &&
    !afterShip.classList.contains('nearShip') && !afterShip.classList.contains('ship')) {

      //create ship
      for (let i = 0; i < decks; i++) {
        playerField.rows[targetY].cells[targetX + i].classList.add('ship', shipClass);
      }

      //create field around ship
      for (let k = 0; k <= decks + 1; k++) {
        let aboveShip = playerField.rows[targetY - 1].cells[(targetX - 1) + k];
        let belowShip = playerField.rows[targetY + 1];

        if (aboveShip !== undefined && !aboveShip.classList.contains('firstRow') &&
          !aboveShip.classList.contains('firstColumn')) {
            aboveShip.classList.add('nearShip');
        }
        if (belowShip !== undefined && belowShip.cells[(targetX - 1) + k] !== undefined) {
          belowShip.cells[(targetX - 1) + k].classList.add('nearShip');
        }
        if (!beforeShip.classList.contains('firstColumn')) {
             beforeShip.classList.add('nearShip');
        }            
        if (playerField.rows[targetY].cells[targetX + decks] !== undefined) {
          playerField.rows[targetY].cells[targetX + decks].classList.add('nearShip');
        }
      }
    }
  }

  //placing 4-decks ship
  if (fourDecksShips.length < 4) {
    placeShipHorisontal(4, 'fourDecks');
    if (fourDecksShips.length === 4) {
      message.innerHTML = 'Place 3-decks ship';
    }    
  }

  //placing 3-decks ships
  else if (threeDecksShips.length < 6) {
    placeShipHorisontal(3, 'threeDecks');
    if (threeDecksShips.length === 6) {
      message.innerHTML = 'Place 2-decks ship';
    }
  }

  //placing 2-decks ships
  else if (twoDecksShips.length < 6) {
    placeShipHorisontal(2, 'twoDecks');
    if (twoDecksShips.length === 6) {
      message.innerHTML = 'Place 1-deck ship';
    }
  }

  //placing 1-deck ships
  else if (oneDeckShips.length < 4) {
    placeShipHorisontal(1, 'oneDeck');
    if (oneDeckShips.length === 4) {
      message.innerHTML = "All player's ships placed";
    }
  }
  coordList.innerHTML = targetX + ' : ' + targetY ;
}