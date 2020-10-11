export const renderBoard = (board, container) => {
  const ids = Object.keys(board);
  const size = +ids[ids.length - 1].split(':')[0];

  container.innerHtml = size;
  console.log(size);
};
