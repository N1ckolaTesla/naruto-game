export class VectorUtils {
  personJump(person) {
    person.position.y += person.velocity.y;
    person.velocity.y += 0.5;

    if (person.position.y >= person.canvasHeight - person.height) {
      person.position.y = person.canvasHeight - person.height;
      person.isJumping = false;
    }
  }
  personMoveLeft(person) {
    person.velocity.x = Math.max(person.velocity.x - 0.5, -5);
    person.position.x += person.velocity.x;

    if (person.position.x <= 0) {
      person.position.x = 0;
    }
  }

  personMoveRight(person) {
    person.velocity.x = Math.min(person.velocity.x + 0.5, 5);
    person.position.x += person.velocity.x;

    if (person.position.x >= person.canvasWidth - person.width) {
      person.position.x = person.canvasWidth - person.width;
    }
  }
}
