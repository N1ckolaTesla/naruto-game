export class VectorUtils {
  personJump(person) {
    person.y += person.velocityY;
    person.velocityY += 0.5;

    if (person.y >= person.canvasHeight - person.height) {
      person.y = person.canvasHeight - person.height;
      person.isJumping = false;
    }
  }
}
