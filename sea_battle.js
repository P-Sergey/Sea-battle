const letters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'];
const playerField = document.getElementById('player');
const opponentField = document.getElementById('opponent');
const fourDecksShips = document.getElementsByClassName('fourDecks');
const threeDecksShips = document.getElementsByClassName('threeDecks');
const twoDecksShips = document.getElementsByClassName('twoDecks');
const oneDeckShips = document.getElementsByClassName('oneDeck');

const message = document.createElement('span');
message.classList.add('message');
message.innerHTML = 'Place 4-decks ship';
playerField.after(message);

function makeButton(id, func, text, status) {
  const button = document.createElement('button');
  document.body.append(button);
  button.setAttribute('id', id);
  button.disabled = status;
  button.innerHTML = text;
  button.addEventListener('click', func);
}
makeButton('switchButton', switchDirection, "Ship's direction: horisontal", false);
makeButton(
  'autoButton',
  () => autoPlacing(playerField, 20, 4, 6, 6, 4),
  'Ships auto-placing',
  false
);
makeButton('startButton', aiAutoPlacing, 'Start battle', true);

// making battle-fields
for (let i = 0; i < 11; i += 1) {
  const playerRow = document.createElement('tr');
  const opponentRow = document.createElement('tr');

  for (let k = 0; k < 11; k += 1) {
    const playerCell = document.createElement('td');
    const opponentCell = document.createElement('td');

    // add class to remove unnecessary borders
    if (i === 0) {
      playerCell.classList.add('firstRow');
      opponentCell.classList.add('firstRow');
    }

    playerCell.classList.add('cell');
    playerRow.appendChild(playerCell);
    opponentCell.classList.add('cell');
    opponentRow.appendChild(opponentCell);
  }

  // add class to remove unnecessary borders
  playerRow.cells[0].classList.add('firstColumn');
  opponentRow.cells[0].classList.add('firstColumn');

  playerField.appendChild(playerRow);
  opponentField.appendChild(opponentRow);
}

// set coordinate axises
for (let j = 1; j < playerField.rows.length; j += 1) {
  playerField.rows[0].cells[j].innerHTML = letters[j - 1];
  playerField.rows[j].cells[0].innerHTML = j;
  opponentField.rows[0].cells[j].innerHTML = letters[j - 1];
  opponentField.rows[j].cells[0].innerHTML = j;
}

//ships direction switch
let direction = true;
function switchDirection() {
  const switchButton = document.getElementById('switchButton');
  direction = !direction;
  if (direction) {
    switchButton.innerHTML = "Ship's direction: horisontal";
  } else switchButton.innerHTML = "Ship's direction: vertical";
}

// placing ships in horisontal direction
function placeShipHorisontal(field, decks, shipClass, coordX, coordY) {
  const afterShip = field.rows[coordY].cells[coordX + decks - 1];
  const beforeShip = field.rows[coordY].cells[coordX - 1];

  if (
    coordX !== 0 &&
    coordY !== 0 &&
    coordX + decks <= field.rows.length &&
    !field.rows[coordY].cells[coordX].classList.contains('ship') &&
    !field.rows[coordY].cells[coordX].classList.contains('nearShip') &&
    !afterShip.classList.contains('nearShip') &&
    !afterShip.classList.contains('ship')
  ) {
    // create ship
    for (let i = 0; i < decks; i += 1) {
      field.rows[coordY].cells[coordX + i].classList.add('ship', shipClass);
    }

    // create field around ship
    for (let k = 0; k <= decks + 1; k += 1) {
      const aboveShip = field.rows[coordY - 1].cells[coordX - 1 + k];
      const belowShip = field.rows[coordY + 1];

      if (
        aboveShip !== undefined &&
        !aboveShip.classList.contains('firstRow') &&
        !aboveShip.classList.contains('firstColumn')
      ) {
        aboveShip.classList.add('nearShip');
      }
      if (
        belowShip !== undefined &&
        belowShip.cells[coordX - 1 + k] !== undefined &&
        !belowShip.cells[coordX - 1 + k].classList.contains('firstRow') &&
        !belowShip.cells[coordX - 1 + k].classList.contains('firstColumn')
      ) {
        belowShip.cells[coordX - 1 + k].classList.add('nearShip');
      }
      if (!beforeShip.classList.contains('firstColumn')) {
        beforeShip.classList.add('nearShip');
      }
      if (field.rows[coordY].cells[coordX + decks] !== undefined) {
        field.rows[coordY].cells[coordX + decks].classList.add('nearShip');
      }
    }
  }
}

// placing ships in vertical direction
function placeShipVertical(field, decks, shipClass, coordX, coordY) {
  const afterShip = field.rows[coordY + decks - 1];
  const beforeShip = field.rows[coordY - 1].cells[coordX];

  if (
    coordX !== 0 &&
    coordY !== 0 &&
    coordY + decks - 1 !== undefined &&
    !field.rows[coordY].cells[coordX].classList.contains('ship') &&
    !field.rows[coordY].cells[coordX].classList.contains('nearShip') &&
    afterShip !== undefined &&
    afterShip.cells[coordX] !== undefined &&
    !afterShip.cells[coordX].classList.contains('nearShip') &&
    !afterShip.cells[coordX].classList.contains('ship') &&
    !beforeShip.classList.contains('ship')
  ) {
    // create ship
    for (let i = 0; i < decks; i += 1) {
      field.rows[coordY + i].cells[coordX].classList.add('ship', shipClass);
    }

    // create field around ship
    for (let k = 0; k <= decks + 1; k += 1) {
      const rightOfShip = field.rows[coordY - 1 + k];
      const leftOfShip = field.rows[coordY - 1 + k];

      if (
        leftOfShip !== undefined &&
        leftOfShip.cells[coordX - 1] !== undefined &&
        !leftOfShip.cells[coordX - 1].classList.contains('firstRow') &&
        !leftOfShip.cells[coordX - 1].classList.contains('firstColumn')
      ) {
        leftOfShip.cells[coordX - 1].classList.add('nearShip');
      }
      if (
        rightOfShip !== undefined &&
        rightOfShip.cells[coordX + 1] !== undefined &&
        !rightOfShip.cells[coordX + 1].classList.contains('ship') &&
        !rightOfShip.cells[coordX + 1].classList.contains('firstRow')
      ) {
        rightOfShip.cells[coordX + 1].classList.add('nearShip');
      }
      if (
        !beforeShip.classList.contains('firstColumn') &&
        !beforeShip.classList.contains('firstRow')
      ) {
        beforeShip.classList.add('nearShip');
      }
      if (
        field.rows[coordY + decks] !== undefined &&
        !field.rows[coordY + decks].cells[coordX].classList.contains('ship')
      ) {
        field.rows[coordY + decks].cells[coordX].classList.add('nearShip');
      }
    }
  }
}

const startButton = document.getElementById('startButton');
//manual ships configuration on field
function shipsConfig(field, decks, shipClass, classCounter, count, coordX, coordY) {
  if (direction) {
    placeShipHorisontal(field, decks, shipClass, coordX, coordY);
  } else placeShipVertical(field, decks, shipClass, coordX, coordY);
  if (classCounter.length === count) {
    message.innerHTML = `Place ${decks - 1}-decks ship`;
    if (decks - 1 === 0) {
      message.innerHTML = "All player's ships placed";
      startButton.disabled = false;
    }
  }
}

//manual ships placing
playerField.onclick = function manualPlacing(event) {
  const { target } = event;
  const targetX = target.cellIndex;
  const targetY = target.parentNode.rowIndex;

  if (fourDecksShips.length < 4) {
    shipsConfig(playerField, 4, 'fourDecks', fourDecksShips, 4, targetX, targetY);
  } else if (threeDecksShips.length < 6) {
    shipsConfig(playerField, 3, 'threeDecks', threeDecksShips, 6, targetX, targetY);
  } else if (twoDecksShips.length < 6) {
    shipsConfig(playerField, 2, 'twoDecks', twoDecksShips, 6, targetX, targetY);
  } else if (oneDeckShips.length < 4) {
    shipsConfig(playerField, 1, 'oneDeck', oneDeckShips, 4, targetX, targetY);
  }
};

// ships auto-configuratiom on field
function shipsAutoConfig(field, decks, shipClass, classCounter, count) {
  let targetX = Math.floor(Math.random() * 9 + 1);
  let targetY = Math.floor(Math.random() * 9 + 1);
  let autoDirection = Boolean(Math.round(Math.random()));
  if (autoDirection) {
    placeShipHorisontal(field, decks, shipClass, targetX, targetY);
  } else placeShipVertical(field, decks, shipClass, targetX, targetY);
  if (classCounter.length === count) {
    message.innerHTML = `Place ${decks - 1}-decks ship`;
    if (decks - 1 === 0) {
      message.innerHTML = "All player's ships placed";
      startButton.disabled = false;
    }
  }
}

// ships auto-placing
function autoPlacing(field, shipClassAmount, fourDecks, threeDecks, twoDecks, oneDeck) {
  const shipClassCounter = document.getElementsByClassName('ship');
  while (shipClassCounter.length < shipClassAmount) {
    if (fourDecksShips.length < fourDecks) {
      shipsAutoConfig(field, 4, 'fourDecks', fourDecksShips, 4);
    } else if (threeDecksShips.length < threeDecks) {
      shipsAutoConfig(field, 3, 'threeDecks', threeDecksShips, 6);
    } else if (twoDecksShips.length < twoDecks) {
      shipsAutoConfig(field, 2, 'twoDecks', twoDecksShips, 6);
    } else if (oneDeckShips.length < oneDeck) {
      shipsAutoConfig(field, 1, 'oneDeck', oneDeckShips, 4);
    }
  }
}

function aiAutoPlacing() {
  autoPlacing(opponentField, 40, 8, 12, 12, 8);
  message.innerHTML = 'Sea-battle started';
}

//shooting by opponent's field
opponentField.onclick = function shooting(event) {
  const { target } = event;

  if (
    !target.classList.contains('firstRow') &&
    !target.classList.contains('firstcolumn') &&
    target.classList.contains('ship')
  ) {
    target.classList.add('damaged');
  } else if (!target.classList.contains('ship')) {
    target.classList.add('miss');
    aiShooting();
  }
};

//shooting by player's field
function aiShooting() {
  let targetX = Math.floor(Math.random() * 9 + 1);
  let targetY = Math.floor(Math.random() * 9 + 1);

  if (
    !playerField.rows[targetY].cells[targetX].classList.contains('firstRow') &&
    !playerField.rows[targetY].cells[targetX].classList.contains('firstcolumn') &&
    !playerField.rows[targetY].cells[targetX].classList.contains('miss') &&
    !playerField.rows[targetY].cells[targetX].classList.contains('damaged') &&
    playerField.rows[targetY].cells[targetX].classList.contains('ship')
  ) {
    playerField.rows[targetY].cells[targetX].classList.add('damaged');
    aiShooting();
  } else if (!playerField.rows[targetY].cells[targetX].classList.contains('ship')) {
    playerField.rows[targetY].cells[targetX].classList.add('miss');
    opponentField.onclick;
  }
}
