/* eslint-disable brace-style */
/* eslint-disable operator-linebreak */
/* eslint-disable no-plusplus */
const letters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'];
const playerField = document.getElementById('player');
const opponentField = document.getElementById('opponent');

// making tables
for (let i = 0; i < 11; i++) {
  const playerRow = document.createElement('tr');
  const opponentRow = document.createElement('tr');

  for (let k = 0; k < 11; k++) {
    const playerCell = document.createElement('td');
    const opponentCell = document.createElement('td');

    // remove unnecessary borders
    if (i === 0) {
      playerCell.classList.add('firstRow');
      opponentCell.classList.add('firstRow');
    }

    playerCell.classList.add('cell');
    playerRow.appendChild(playerCell);
    opponentCell.classList.add('cell');
    opponentRow.appendChild(opponentCell);
  }

  // remove unnecessary borders
  playerRow.cells[0].classList.add('firstColumn');
  opponentRow.cells[0].classList.add('firstColumn');

  playerField.appendChild(playerRow);
  opponentField.appendChild(opponentRow);
}

// set coordinates
playerField.rows[0].cells[0].setAttribute('id', 'coords');
opponentField.rows[0].cells[0].setAttribute('id', 'coords');

for (let j = 1; j < playerField.rows.length; j++) {
  playerField.rows[0].cells[j].innerHTML = letters[j - 1];
  playerField.rows[j].cells[0].innerHTML = j;
  opponentField.rows[0].cells[j].innerHTML = letters[j - 1];
  opponentField.rows[j].cells[0].innerHTML = j;
  playerField.rows[0].cells[j].setAttribute('id', 'coords');
  playerField.rows[j].cells[0].setAttribute('id', 'coords');
  opponentField.rows[0].cells[j].setAttribute('id', 'coords');
  opponentField.rows[j].cells[0].setAttribute('id', 'coords');
}

// shooting the opponent field
let targetCell;

function highlight(node) {
  targetCell = node;
  targetCell.classList.add('highlight');
}

opponentField.onclick = function clickForShoot(event) {
  let { target } = event;
  while (target !== this) {
    if (target.tagName === 'TD' && target.id !== 'coords') {
      highlight(target);
      return;
    }
    target = target.parentNode;
  }
};

const coordList = document.createElement('div');
document.body.append(coordList);

const message = document.createElement('span');
message.classList.add('message');
message.innerHTML = 'Place 4-decks ship';
playerField.after(message);

playerField.onclick = function clickForShip(event) {
  const { target } = event;
  const targetX = target.cellIndex;
  const targetY = target.parentNode.rowIndex;
  const fourDecksShips = document.getElementsByClassName('fourDecks');
  const threeDecksShips = document.getElementsByClassName('threeDecks');
  const twoDecksShips = document.getElementsByClassName('twoDecks');
  const oneDeckShips = document.getElementsByClassName('oneDeck');

  // placing ships in horisontal direction
  function placeShipHorisontal(decks, shipClass) {
    const afterShip = playerField.rows[targetY].cells[targetX + decks - 1];
    const beforeShip = playerField.rows[targetY].cells[targetX - 1];

    if (
      targetX !== 0 &&
      targetY !== 0 &&
      targetX + decks <= playerField.rows.length &&
      !target.classList.contains('ship') &&
      !target.classList.contains('nearShip') &&
      !afterShip.classList.contains('nearShip') &&
      !afterShip.classList.contains('ship')
    ) {
      // create ship
      for (let i = 0; i < decks; i++) {
        playerField.rows[targetY].cells[targetX + i].classList.add('ship', shipClass);
      }

      // create field around ship
      for (let k = 0; k <= decks + 1; k++) {
        const aboveShip = playerField.rows[targetY - 1].cells[targetX - 1 + k];
        const belowShip = playerField.rows[targetY + 1];

        if (
          aboveShip !== undefined &&
          !aboveShip.classList.contains('firstRow') &&
          !aboveShip.classList.contains('firstColumn')
        ) {
          aboveShip.classList.add('nearShip');
        }
        if (belowShip !== undefined && belowShip.cells[targetX - 1 + k] !== undefined) {
          belowShip.cells[targetX - 1 + k].classList.add('nearShip');
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

  // placing ships in vertical direction
  function placeShipVertical(decks, shipClass) {
    const afterShip = playerField.rows[targetY + decks - 1];
    const beforeShip = playerField.rows[targetY - 1].cells[targetX];

    if (
      targetX !== 0 &&
      targetY !== 0 &&
      targetY + decks - 1 !== undefined &&
      !target.classList.contains('ship') &&
      !target.classList.contains('nearShip') &&
      afterShip !== undefined &&
      afterShip.cells[targetX] !== undefined &&
      !afterShip.cells[targetX].classList.contains('nearShip') &&
      !afterShip.cells[targetX].classList.contains('ship') &&
      !beforeShip.classList.contains('ship')
    ) {
      // create ship
      for (let i = 0; i < decks; i++) {
        playerField.rows[targetY + i].cells[targetX].classList.add('ship', shipClass);
      }

      // create field around ship
      for (let k = 0; k <= decks + 1; k++) {
        const rightOfShip = playerField.rows[targetY - 1 + k];
        const leftOfShip = playerField.rows[targetY - 1 + k];

        if (
          leftOfShip !== undefined &&
          leftOfShip.cells[targetX - 1] !== undefined &&
          !leftOfShip.cells[targetX - 1].classList.contains('firstRow') &&
          !leftOfShip.cells[targetX - 1].classList.contains('firstColumn')
        ) {
          leftOfShip.cells[targetX - 1].classList.add('nearShip');
        }
        if (
          rightOfShip !== undefined &&
          rightOfShip.cells[targetX + 1] !== undefined &&
          !rightOfShip.cells[targetX + 1].classList.contains('ship') &&
          !rightOfShip.cells[targetX + 1].classList.contains('firstRow')
        ) {
          rightOfShip.cells[targetX + 1].classList.add('nearShip');
        }
        if (
          !beforeShip.classList.contains('firstColumn') &&
          !beforeShip.classList.contains('firstRow')
        ) {
          beforeShip.classList.add('nearShip');
        }
        if (
          playerField.rows[targetY + decks] !== undefined &&
          !playerField.rows[targetY + decks].cells[targetX].classList.contains('ship')
        ) {
          playerField.rows[targetY + decks].cells[targetX].classList.add('nearShip');
        }
      }
    }
  }

  // horisontal
  // placing 4-decks ship
  if (fourDecksShips.length < 4) {
    placeShipHorisontal(4, 'fourDecks');
    if (fourDecksShips.length === 4) {
      message.innerHTML = 'Place 3-decks ship';
    }
  }

  // placing 3-decks ships
  else if (threeDecksShips.length < 6) {
    placeShipHorisontal(3, 'threeDecks');
    if (threeDecksShips.length === 6) {
      message.innerHTML = 'Place 2-decks ship';
    }
  }

  // placing 2-decks ships
  else if (twoDecksShips.length < 6) {
    placeShipHorisontal(2, 'twoDecks');
    if (twoDecksShips.length === 6) {
      message.innerHTML = 'Place 1-deck ship';
    }
  }

  // placing 1-deck ships
  else if (oneDeckShips.length < 4) {
    placeShipHorisontal(1, 'oneDeck');
    if (oneDeckShips.length === 4) {
      message.innerHTML = "All player's ships placed";
    }
  }

  // vertical
  // placing 4-decks ship
  if (fourDecksShips.length < 4) {
    placeShipVertical(4, 'fourDecks');
    if (fourDecksShips.length === 4) {
      message.innerHTML = 'Place 3-decks ship';
    }
  }

  // placing 3-decks ships
  else if (threeDecksShips.length < 6) {
    placeShipVertical(3, 'threeDecks');
    if (threeDecksShips.length === 6) {
      message.innerHTML = 'Place 2-decks ship';
    }
  }

  // placing 2-decks ships
  else if (twoDecksShips.length < 6) {
    placeShipVertical(2, 'twoDecks');
    if (twoDecksShips.length === 6) {
      message.innerHTML = 'Place 1-deck ship';
    }
  }

  // placing 1-deck ships
  else if (oneDeckShips.length < 4) {
    placeShipVertical(1, 'oneDeck');
    if (oneDeckShips.length === 4) {
      message.innerHTML = "All player's ships placed";
    }
  }
  coordList.innerHTML = `${targetX} : ${targetY}`;
};
