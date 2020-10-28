import boardsData from './boards-data.js';

const board = document.querySelector('video-pad-board');
const boardSelect = document.querySelector('#boardSelect');
const performModeButton = document.querySelector('#performMode');

boardSelect.addEventListener('change', (e)=>{
  board.loadBoardData(boardsData[e.target.value]);
}, false);

boardsData.forEach(function(board, i){
  var option =  document.createElement('option');
  option.value = i;
  option.innerText = board.name;
  boardSelect.appendChild(option);
});

// Set default board
boardSelect.value = 0;
boardSelect.dispatchEvent(new Event('change'));

performModeButton.addEventListener('click', (e)=>{
  board.togglePerformMode();
});
