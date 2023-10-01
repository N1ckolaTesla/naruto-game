import { GameConstants } from "./gameConstants";
import { checkY, checkXLeft, checkXRight, renderHealth } from "./utils";

export class Interaction extends GameConstants {
    constructor(player1, player2, keys) {
        super()
        this.player1 = player1
        this.player2 = player2
        this.keys = keys
        this.timer = 60
        this.timerId = null
        this.decreaseTimer()
    
    }

    attackCollision(player1, player2) {
        return (
            player1.attackBox.position.x + player1.attackBox.width >= player2.position.x &&
            player1.attackBox.position.x <= player2.position.x + player2.width &&
            player1.attackBox.position.y + player1.attackBox.height >= player2.position.y &&
            player1.attackBox.position.y <= player2.position.y + player2.height &&
            player1.isAttacking &&
            player1.framesCurrent === 2
        )
    }

    preventPassingThrough(player1, player2, keys) {
        if (keys.d.pressed && player1.lastKey === 'd') {
            if (!checkY(player1, player2)) {
                if (checkXRight(player1, player2)) {
                    if (!player1.image.src.includes('fallOff')) {
                        player1.velocity.x = 0
                    }
                }
            }
        } else if (keys.a.pressed && player1.lastKey === 'a') {
            if (!checkY(player1, player2)) {
                if (checkXLeft(player1, player2)) {
                    if (!player1.image.src.includes('fallOff')) {
                        player1.velocity.x = 0
                    }
                }
            }
        }
        if (keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
            if (!checkY(player2, player1)) {
                if (checkXRight(player2, player1)) {
                    if (!player2.image.src.includes('fallOff')) {
                        player2.velocity.x = 0
                    }
                }
            }
        } else if (keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft') {
            if (!checkY(player2, player1)) {
                if (checkXLeft(player2, player1)) {
                    if (!player2.image.src.includes('fallOff')) {
                        player2.velocity.x = 0
                    }
                }
            }
        }
    }

    playerThrowBack(player1, player2) {
        if (
            player1.image === player1.activeSprites.fallOff.image &&
            player1.framesCurrent < player1.activeSprites.fallOff.framesMax - 1
        ) {
            if (this.isPlayerLookingRight(player1, player2)) {
                player1.velocityXFlyingLeft += 0.6
                player1.velocity.x = player1.velocityXFlyingLeft
            } else {
                player1.velocityXFlyingRight -= 0.6
                player1.velocity.x = player1.velocityXFlyingRight           
            }
        } else {
            player1.velocityXFlyingLeft = -22
            player1.velocityXFlyingRight = 22
        }
    }

    isPlayerLookingRight(player1, player2) {
        if (player1.position.x < player2.position.x) {
            return true
        } else if (player1.position.x >= player2.position.x) {
            return false
        }
    }

    playerTakesHit(playerBeaten, playerAttacking, id) {
        if (playerAttacking.image === playerAttacking.activeSprites.attack1.image ||
            playerAttacking.image === playerAttacking.activeSprites.attack2.image ||
            playerAttacking.image === playerAttacking.activeSprites.attackFlying.image) {
            playerBeaten.takeHit(1);
        } else if (playerAttacking.image === playerAttacking.activeSprites.attack3.image) {
            playerBeaten.takeHit(2)
        }
        playerAttacking.isAttacking = false;
        renderHealth(id, playerBeaten.health);
    }

    determineWinner() {
        clearTimeout(this.timerId)
        document.querySelector('#displayText').style.display = 'flex'
        if (this.player1.health === this.player2.health) {
            document.querySelector('#displayText').innerHTML = 'Tie'
        } else if (this.player1.health > this.player2.health) {
            document.querySelector('#displayText').innerHTML = 'Player wins'
        } else if (this.player1.health < this.player2.health) {
            document.querySelector('#displayText').innerHTML = 'Enemy wins'
        }
    }
    
    decreaseTimer() {
        if (this.timer > 0) {
            this.timerId = setTimeout(this.decreaseTimer.bind(this), 1000)
            this.timer--
            document.getElementById('timer').innerHTML = this.timer
        }
    
        if (this.timer === 0) {
            document.querySelector('#displayText').style.display = 'flex'
            this.endGame()
        }
    }
    
    endGame() {
        if (this.player1.health <= 0 || this.player2.health <= 0) {
            this.determineWinner();
            if (this.player1.health <= 0) {
                this.player1.switchSprite('death');
            } else if (player2.health <= 0) {
                this.player2.switchSprite('death');
            }
        }
    }
}