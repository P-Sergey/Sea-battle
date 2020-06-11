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

let currentElem = null;

playerField.onmouseover = function(event) {
  if (currentElem) return;
  let target = event.target.closest('td');
  if (!target) return;
  if (!playerField.contains(target)) return;
  currentElem = target;
  target.style.background = 'pink';
};

playerField.onmouseout = function(event) {
  if (!currentElem) return;
  let relatedTarget = event.relatedTarget;

  while (relatedTarget) {
    if (relatedTarget == currentElem) return;
    relatedTarget = relatedTarget.parentNode;
  }

  currentElem.style.background = '';
  currentElem = null;
};