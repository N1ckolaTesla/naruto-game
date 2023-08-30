import { GameField } from "./gameField";
import { Person } from "./person";
class Game extends GameField {
  constructor() {
    super();
    this.person = new Person({
      x: 200,
      y: this.canvasHeight,
      width: 40,
      height: 60,
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === " ") {
        this.person.jump();
      } else if (event.key === "ArrowLeft") {
        this.person.moveDirection = -1;
      } else if (event.key === "ArrowRight") {
        this.person.moveDirection = 1;
      }
    });
    document.addEventListener("keyup", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        this.person.stopMove();
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
