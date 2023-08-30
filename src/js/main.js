import { GameField } from "./gameField";
import { Person } from "./person";
class Game extends GameField {
  constructor() {
    super();
    this.person = new Person({
      x: 200,
      y: this.canvasHeight,
      width: 40,
      height: 80,
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === " ") {
        this.person.jump();
      }
    });
  }

  gameLoop() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.person.render();
    requestAnimationFrame(this.gameLoop.bind(this));
  }
}

const game = new Game();
game.gameLoop();
