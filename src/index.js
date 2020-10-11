import './style.css';
import { makeObservable } from './observer.js';
import { renderBoard, renderInfo, renderWin } from './view.js';

const initialState = {
  board: {
    '0:0': 1,
    '0:1': 1,
    '0:2': 1,
    '0:3': 1,
    '0:4': 1,
    '1:0': 0,
    '1:1': 1,
    '1:2': 0,
    '1:3': 0,
    '1:4': 1,
    '2:0': 0,
    '2:1': 0,
    '2:2': 0,
    '2:3': 0,
    '2:4': 0,
    '3:0': 0,
    '3:1': 0,
    '3:2': 0,
    '3:3': 0,
    '3:4': 0,
    '4:0': 0,
    '4:1': 0,
    '4:2': 0,
    '4:3': 0,
    '4:4': 0,
  },
  win: false,
  moves: 0,
};

const isCell = (elem) => !!elem.dataset.id;

const getCellId = (cell) => cell.dataset.id;

const makeId = (y, x) => `${y}:${x}`;

const isWin = (board) => {
  const values = Object.values(board);
  console.log(values);
  return !values.includes(1);
};

const updateBoard = (state, id) => {
  state.moves++;

  const [y, x] = id.split(':').map(Number);
  const ids = [
    id,
    makeId(y - 1, x),
    makeId(y + 1, x),
    makeId(y, x - 1),
    makeId(y, x + 1),
  ];

  ids.forEach((id) => {
    const currentValue = state.board[id];
    if (currentValue === undefined) return;
    const newValue = currentValue === 0 ? 1 : 0;
    state.board[id] = newValue;
  });

  if (isWin(state.board)) {
    state.win = true;
  }
};

const app = () => {
  const state = makeObservable(initialState, (prop, newVal, oldVal) => {
    renderBoard(state.board, elems.board);
    renderInfo(state.moves, elems.info);
    if (state.win) renderWin(elems.winner);
  });

  const elems = {
    container: document.querySelector('#game'),
    board: document.querySelector('#board'),
    info: document.querySelector('#game-info'),
    winner: document.querySelector('#winner'),
  };

  const init = () => {
    renderBoard(state.board, elems.board);
  };

  elems.container.addEventListener('click', (e) => {
    e.preventDefault();

    const { target } = e;

    if (isCell(target)) {
      updateBoard(state, getCellId(target));
    }
  });

  init();
};

app();
