import goblinImage from '../img/goblin.png';
import '../css/style.css';

class Game {
  constructor() {
    this.boardSize = 4;
    this.currentPosition = null;
    this.goblin = null;
    this.interval = null;
    this.initializeGame();
  }

  createBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';

    for (let i = 0; i < this.boardSize; i += 1) {
      const row = document.createElement('div');
      row.className = 'row';

      for (let j = 0; j < this.boardSize; j += 1) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.position = `${i}-${j}`;
        row.append(cell);
      }

      gameBoard.append(row);
    }
  }

  createGoblin() {
    this.goblin = document.createElement('img');
    this.goblin.src = goblinImage;
    this.goblin.className = 'goblin';
    this.placeGoblinRandomly();
  }

  placeGoblinRandomly() {
    // Remove from current position if exists
    if (this.currentPosition) {
      const currentCell = document.querySelector(`[data-position="${this.currentPosition}"]`);
      if (currentCell && currentCell.contains(this.goblin)) {
        this.goblin.remove();
      }
    }

    // Get new random position
    let newPosition;
    do {
      const row = Math.floor(Math.random() * this.boardSize);
      const col = Math.floor(Math.random() * this.boardSize);
      newPosition = `${row}-${col}`;
    } while (newPosition === this.currentPosition);

    this.currentPosition = newPosition;
    const newCell = document.querySelector(`[data-position="${this.currentPosition}"]`);
    newCell.append(this.goblin);
  }

  startGame() {
    this.interval = setInterval(() => {
      this.placeGoblinRandomly();
    }, 1000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  game.startGame();
});

export default Game;
