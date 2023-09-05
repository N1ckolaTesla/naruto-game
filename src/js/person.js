import { GameField } from "./gameField";
import { VectorUtils } from "./utils/vectorUtils";

export class Person extends GameField {
  constructor({ position, width, height, sprites }) {
    super();
    this.vectorUtils = new VectorUtils();
    this.position = position
    this.width = width;
    this.height = height;
    this.velocity = {x: 0, y: 0}
    this.isJumping = false;
    this.dead = false
    this.moveDirection = 0
    this.imageSrc
    this.framesMax = 1
    this.framesCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 5
    this.sprites = sprites
    for (const sprite in sprites) {
        sprites[sprite].image = new Image()
        sprites[sprite].image.src = sprites[sprite].imageSrc
    }
  }

  move() {
    if (this.moveDirection === 1) {
      this.vectorUtils.personMoveRight(this);
    }
    if (this.moveDirection === -1) {
      this.vectorUtils.personMoveLeft(this);
    }
  }
  stopMove() {
    this.moveDirection = 0;
    this.velocity.x = 0;
  }

  jump() {
    if (!this.isJumping) {
      this.velocity.y = -13;
      this.isJumping = true;
    }
  }

  switchSprite(sprite) {
    //override all other animations with the attack animation
    if (
      this.image === this.sprites.attack1.image &&
      this.framesCurrent < this.sprites.attack1.framesMax - 1
    ) return
    //override when fighter gets hit
    if (
      this.image === this.sprites.takeHit.image &&
      this.framesCurrent < this.sprites.takeHit.framesMax - 1
    ) 
    return
    if (this.image === this.sprites.death.image) {
      if (this.framesCurrent === this.sprites.death.framesMax - 1) this.dead = true 
      return
    }
    switch(sprite) {
      case 'idle':
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image
          this.framesMax = this.sprites.idle.framesMax
          this.framesCurrent = 0
        }
        break
      case 'run':
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image
          this.framesMax = this.sprites.run.framesMax
          this.framesCurrent = 0
        }
        break
      case 'jump':
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image
          this.framesMax = this.sprites.jump.framesMax
          this.framesCurrent = 0
        }
        break
      case 'fall':
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image
          this.framesMax = this.sprites.fall.framesMax
          this.framesCurrent = 0
        }
        break
      case 'attack1':
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image
          this.framesMax = this.sprites.attack1.framesMax
          this.framesCurrent = 0
        }
        break
      case 'takeHit':
        if (this.image !== this.sprites.takeHit.image) {
          this.image = this.sprites.takeHit.image
          this.framesMax = this.sprites.takeHit.framesMax
          this.framesCurrent = 0
        }
        break
      case 'death':
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image
          this.framesMax = this.sprites.death.framesMax
          this.framesCurrent = 0
        }
        break
    }
  }

  render() {
    this.vectorUtils.personJump(this);
    this.move();

    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
