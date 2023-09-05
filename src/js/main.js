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
    this.enemy = new Person({
      position: {
        x: 600,
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
      if (!this.enemy.dead) {
        switch (e.key) {
          case 'a':
            this.keys.a.pressed = true
            this.enemy.lastKey = 'a'
            break
          case 'd':
            this.keys.d.pressed = true
            this.enemy.lastKey = 'd'
            break
          case 'w':
            this.keys.w.pressed = true
            this.enemy.lastKey = 'w'
            this.enemy.jump()
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
        case 'a':
          this.keys.a.pressed = false
          if (this.enemy.lastKey === 'd') return 
          this.enemy.stopMove()
          break
        case 'd':
          this.keys.d.pressed = false
          if (this.enemy.lastKey === 'a') return 
          this.enemy.stopMove()
          break
        case 'w':
          this.keys.w.pressed = false
          break
      }
    });
  }

  gameLoop() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.person.render();
    this.enemy.render();
    //person movement
    if (this.keys.ArrowLeft.pressed && this.person.lastKey === 'ArrowLeft') {
      this.person.moveDirection = -1
    } else if (this.keys.ArrowRight.pressed && this.person.lastKey === 'ArrowRight') {
      this.person.moveDirection = 1
    }
    //eney movement
    if (this.keys.a.pressed && this.enemy.lastKey === 'a') {
      this.enemy.moveDirection = -1
    } else if (this.keys.d.pressed && this.enemy.lastKey === 'd') {
      this.enemy.moveDirection = 1
    }
    requestAnimationFrame(this.gameLoop.bind(this));
  }
}

const game = new Game();
game.gameLoop();
