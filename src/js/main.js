import { GameField } from "./gameField";
import { Person } from "./person";
class Game extends GameField {
  constructor() {
    super();
    this.person = new Person({
      position: {
        x: 200,
        y: this.canvasHeight
      },
      width: 40,
      height: 60,
    });
    this.keys = {
      a: {
          pressed: false
      },
      d: {
          pressed: false
      },
      w: {
          pressed: false
      },
      ArrowLeft: {
          pressed: false
      }, 
      ArrowRight: {
          pressed: false
      },
      ArrowUp: {
          pressed: false
      }
    }
    this.lastKey
    document.addEventListener("keydown", (e) => {
      if (!this.person.dead) {
        switch (e.key) {
          case 'ArrowLeft':
            this.keys.ArrowLeft.pressed = true
            this.person.lastKey = 'ArrowLeft'
            break
          case 'ArrowRight':
            this.keys.ArrowRight.pressed = true
            this.person.lastKey = 'ArrowRight'
            break
          case 'ArrowUp':
            this.keys.ArrowUp.pressed = true
            this.person.lastKey = 'ArrowUp'
            this.person.jump()
        }
      }
    });
    document.addEventListener("keyup", (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          this.keys.ArrowLeft.pressed = false
          if (this.person.lastKey === 'ArrowRight') return 
          this.person.stopMove()
          break
        case 'ArrowRight':
          this.keys.ArrowRight.pressed = false
          if (this.person.lastKey === 'ArrowLeft') return 
          this.person.stopMove()
          break
        case 'ArrowUp':
          this.keys.ArrowUp.pressed = false
          break
      }
    });
  }

  gameLoop() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.person.render();
    //person movement
    if (this.keys.ArrowLeft.pressed && this.person.lastKey === 'ArrowLeft') {
      this.person.moveDirection = -1
    } else if (this.keys.ArrowRight.pressed && this.person.lastKey === 'ArrowRight') {
      this.person.moveDirection = 1
    }
    requestAnimationFrame(this.gameLoop.bind(this));
  }
}

const game = new Game();
game.gameLoop();
