import './style.css';
import { makeObservable } from './observer.js';
import buildState from './state-builder.js';
import { renderBoard, renderInfo, renderWin } from './view.js';

const initialState = buildState(9);

const isCell = (elem) => !!elem.dataset.id;

const getCellId = (cell) => cell.dataset.id;

const makeId = (y, x) => `${y}:${x}`;

const isWin = (board) => {
  const values = Object.values(board);
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

  const temp = ids.reduce((acc, id) => {
    const currentValue = state.board[id];
    if (currentValue === undefined) return acc;
    const newValue = currentValue === 0 ? 1 : 0;
    acc[id] = newValue;
    return acc;
  }, {});

  state.board = { ...state.board, ...temp };

  if (isWin(state.board)) {
    state.win = true;
  }
};

const app = () => {
  const state = makeObservable(initialState, (prop, newVal, oldVal) => {
    console.log('RENDER!!!!!');
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
