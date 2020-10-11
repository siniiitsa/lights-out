import './style.css';
import { makeObservable } from './observer.js';
import { renderBoard } from './view.js';

const initialState = {
  board: {
    '0:0': 0,
    '0:1': 0,
    '0:2': 0,
    '0:3': 0,
    '0:4': 0,
    '1:0': 0,
    '1:1': 0,
    '1:2': 0,
    '1:3': 0,
    '1:4': 0,
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
};

const isCell = (elem) => !!elem.dataset.id;

const getCellId = (cell) => cell.dataset.id;

const app = () => {
  const state = makeObservable(initialState, (prop, newVal, oldVal) => {
    renderBoard(state.board, elems.gameContainer);
  });

  const elems = {
    gameContainer: document.querySelector('#game'),
  };

  const init = () => {
    renderBoard(state.board, elems.gameContainer);
  };

  elems.gameContainer.addEventListener('click', (e) => {
    e.preventDefault();

    const { target } = e;

    if (isCell(target)) {
      const id = getCellId(target);
      const currentValue = state.board[id];
      const newValue = currentValue === 0 ? 1 : 0;
      state.board[id] = newValue;
    }
  });

  init();
};

app();
