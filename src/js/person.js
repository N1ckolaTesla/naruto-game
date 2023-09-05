import { GameField } from "./gameField";
import { VectorUtils } from "./utils/vectorUtils";

export class Person extends GameField {
  constructor({ position, width, height }) {
    super();
    this.vectorUtils = new VectorUtils();
    this.position = position
    this.width = width;
    this.height = height;
    this.velocity = {x: 0, y: 0}
    this.isJumping = false;
    this.dead = false
    this.moveDirection = 0;
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
  render() {
    this.vectorUtils.personJump(this);
    this.move();

    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
