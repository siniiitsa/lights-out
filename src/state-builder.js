const buildBoard = (side) => {
  const board = {};

  for (let y = 0; y < side; y++) {
    for (let x = 0; x < side; x++) {
      board[`${y}:${x}`] = 0;
    }
  }

  return board;
};

const buildState = (side) => {
  return {
    board: buildBoard(side),
    moves: 0,
    win: false,
  };
};

export default buildState;
