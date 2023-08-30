import { GameField } from "./gameField";
import { VectorUtils } from "./utils/vectorUtils";

export class Person extends GameField {
  constructor({ width, height, x, y }) {
    super();
    this.vectorUtils = new VectorUtils();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocityY = 0;
    this.isJumping = false;
  }

  jump() {
    if (!this.isJumping) {
      this.velocityY = -10;
      this.isJumping = true;
    }
  }
  render() {
    this.vectorUtils.personJump(this);

    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
