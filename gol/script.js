// Slider Block
const tickLengthValue = document.querySelector('#tickLengthValue');
const tickLength = document.querySelector('#tickLength');
tickLengthValue.textContent = tickLength.value;
tickLength.addEventListener('input', (event) => {
  tickLengthValue.textContent = event.target.value;
});

let grid = [];

// create first grid + html
function createGrid() {
  const newGrid = [];
  const xValue = document.getElementById('xValue').value;
  const yValue = document.getElementById('yValue').value;
  for (let i = 0; i < xValue; i++) {
    newGrid.push(new Array(parseInt(yValue)).fill(0));
  }
  grid = newGrid;

  buildHtmlGrid();
}

// builds html for current grid
function buildHtmlGrid() {
  const gridContainer = document.getElementById('grid');
  let inner = '';
  for (let i = 0; i < grid.length; i++) {
    let row = '';
    for (let j = 0; j < grid[i].length; j++) {
      row += `<input class="gridCheckbox" type="checkbox" id="r${i}c${j}" value="${grid[i][j]}" ${
        grid[i][j] ? 'checked="true"' : ''
      }>`;
    }
    inner += `<div id="r${i}">${row}</div>`;
  }
  gridContainer.innerHTML = inner;
}

function iterateOnce() {
  const maxX = document.getElementById('xValue').value;
  const maxY = document.getElementById('yValue').value;
  const newGrid = Array.from({ length: parseInt(maxX) }, (e) => Array(parseInt(maxY)).fill(0));
  const livingCells = Array.from(document.querySelectorAll('.gridCheckbox:checked')).map(
    (gridEntry) => gridEntry.id,
  );

  livingCells.forEach((livingCell) => {
    [, r, c] = livingCell.split(/\D/);
    const livingNeighbours = getLivingNeighbours(parseInt(r), parseInt(c), livingCells);
    if (livingNeighbours === 2 || livingNeighbours === 3) {
      newGrid[r][c] = 1;
    }
  });

  const deadCells = Array.from(document.querySelectorAll('.gridCheckBox:not(:checked)')).map(
    (gridEntry) => gridEntry.id,
  );
  deadCells.forEach((deadCell) => {
    [, r, c] = deadCell.split(/\D/);
    const livingNeighbours = getLivingNeighbours(parseInt(r), parseInt(c), livingCells);
    if (livingNeighbours === 3) {
      newGrid[r][c] = 1;
    }
  });
  grid = newGrid;
  buildHtmlGrid();
}

function getLivingNeighbours(r, c, livingCells) {
  let livingNeighbours = 0;
  const maxX = document.getElementById('xValue').value;
  const maxY = document.getElementById('yValue').value;
  const neighbours = [
    `r${r - 1 >= 0 ? r - 1 : maxX - 1}c${c - 1 >= 0 ? c - 1 : maxY - 1}`,
    `r${r - 1 >= 0 ? r - 1 : maxX - 1}c${c}`,
    `r${r - 1 >= 0 ? r - 1 : maxX - 1}c${c + 1 < maxY ? c + 1 : 0}`,

    `r${r}c${c - 1 >= 0 ? c - 1 : maxY - 1}`,
    `r${r}c${c + 1 < maxY ? c + 1 : 0}`,

    `r${r + 1 < maxX ? r + 1 : 0}c${c - 1 >= 0 ? c - 1 : maxY - 1}`,
    `r${r + 1 < maxX ? r + 1 : 0}c${c}`,
    `r${r + 1 < maxX ? r + 1 : 0}c${c + 1 < maxY ? c + 1 : 0}`,
  ];

  neighbours.forEach((neighbour) => (livingNeighbours += livingCells.includes(neighbour) ? 1 : 0));

  return livingNeighbours;
}

let interval;
function startSimulation() {
  interval = setInterval(iterateOnce, tickLengthValue.textContent);
  document.getElementById('startButton').disabled = true;
  document.getElementById('tickLength').disabled = true;
  document.getElementById('pauseButton').disabled = false;
}
function pauseSimulation() {
  clearInterval(interval);
  document.getElementById('pauseButton').disabled = true;
  document.getElementById('startButton').disabled = false;
  document.getElementById('tickLength').disabled = false;
}
