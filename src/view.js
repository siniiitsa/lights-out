export const renderBoard = (board, boardElem) => {
  const ids = Object.keys(board);
  const size = +ids[ids.length - 1].split(':')[0] + 1;

  let boardHTML = '';

  for (let y = 0; y < size; y++) {
    let row = '';
    for (let x = 0; x < size; x++) {
      const id = `${y}:${x}`;
      const className = board[id] === 1 ? ' on' : '';
      const cell = `<div class="cell${className}" data-id="${id}"></div>`;
      row += cell;
    }
    row = `<div class="row">${row}</div>`;
    boardHTML += row;
  }

  boardElem.innerHTML = boardHTML;
};

export const renderInfo = (moves, infoElem) => {
  infoElem.querySelector('#moves').innerHTML = `Moves: ${moves}`;
};

export const renderWin = (winElem) => {
  winElem.innerHTML = 'Winer!';
};
