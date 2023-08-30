export class VectorUtils {
  personJump(person) {
    person.y += person.velocityY;
    person.velocityY += 0.5;

    if (person.y >= person.canvasHeight - person.height) {
      person.y = person.canvasHeight - person.height;
      person.isJumping = false;
    }
  }
  personMoveLeft(person) {
    person.velocityX = Math.max(person.velocityX - 0.5, -5);
    person.x += person.velocityX;

    if (person.x <= 0) {
      person.x = 0;
    }
  }

  personMoveRight(person) {
    person.velocityX = Math.min(person.velocityX + 0.5, 5);
    person.x += person.velocityX;

    if (person.x >= person.canvasWidth - person.width) {
      person.x = person.canvasWidth - person.width;
    }
  }
}
