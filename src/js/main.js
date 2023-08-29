const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

class GameField {
  constructor(){
    this.ctx = ctx;
    this.canvas = canvas;
    this.canvasHeight = canvas.height;
    this.canvasWidth = canvas.width;
  }
}

class Cube extends GameField {
  constructor() {
    super();
    this.size = 50;
    this.x = this.canvasWidth / 2 - this.size / 2;
    this.y = 0;
    this.speedY = 2;
  }

  draw() {
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  update() {
    this.y += this.speedY;

    if (this.y > this.canvasHeight - this.size) {
      this.y = this.canvasHeight - this.size;
      this.speedY = 0;
    }

    this.draw();
  }
}

class Game extends GameField {
  constructor() {
    super();
    this.cube = new Cube();
  }

  gameLoop() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.cube.update();
    requestAnimationFrame(this.gameLoop.bind(this));
  }
}

const game = new Game(canvas, ctx);
game.gameLoop();
