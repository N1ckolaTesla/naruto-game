import { GameConstants } from "./gameConstants";
import { renderHealth } from "./utils";

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

    turnFighters() {
        if (this.player1.position.x >= this.player2.position.x) {
            if (this.player1.velocity.x <= 0 && !this.player1.dead) {
                this.player1.activeSprites = this.player1.sprites.left
            } else if (this.player1.velocity.x > 0 && !this.player1.dead) {
                this.player1.activeSprites = this.player1.sprites.right
            }
            if (this.player2.velocity.x < 0 && !this.player2.dead) {
                this.player2.activeSprites = this.player2.sprites.left
            } else if (this.player2.velocity.x >= 0 && !this.player2.dead) {
                this.player2.activeSprites = this.player2.sprites.right
            }
            //setting the attackBox
            this.player1.attackBox.offset.x = -5
            this.player2.attackBox.offset.x = 80
        } else if (this.player1.position.x < this.player2.position.x) {
            if (this.player2.velocity.x <= 0 && !this.player2.dead) {
                this.player2.activeSprites = this.player2.sprites.left
            } else if (this.player2.velocity.x > 0 && !this.player2.dead) {
                this.player2.activeSprites = this.player2.sprites.right
            }
            if (this.player1.velocity.x < 0 && !this.player1.dead) {
                this.player1.activeSprites = this.player1.sprites.left
            } else if (this.player1.velocity.x >= 0 && !this.player1.dead) {
                this.player1.activeSprites = this.player1.sprites.right
            }
            //setting the attackBox
            this.player1.attackBox.offset.x = 80
            this.player2.attackBox.offset.x = -5
        }
    }

    detectCollision() {
        // Detect for collision & this.player2 gets hit
        if (this.attackCollision(this.player1, this.player2)) {
            this.playerTakesHit(this.player2, this.player1, 'enemyHealth')
        } else if (this.player1.isAttacking && this.player1.framesCurrent === 2) { //If this.player1 misses
            this.player1.isAttacking = false;
        }

        // Detect for collison & this.player1 gets hit
        if (this.attackCollision(this.player2, this.player1)) {
            this.playerTakesHit(this.player1, this.player2, 'playerHealth')
        } else if (this.player2.isAttacking && this.player2.framesCurrent === 2) { // If this.player2 misses
            this.player2.isAttacking = false;
        }
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
            if (!this.checkY(player1, player2)) {
                if (this.checkXRight(player1, player2)) {
                    if (!player1.image.src.includes('fallOff')) {
                        player1.velocity.x = 0
                    }
                }
            }
        } else if (keys.a.pressed && player1.lastKey === 'a') {
            if (!this.checkY(player1, player2)) {
                if (this.checkXLeft(player1, player2)) {
                    if (!player1.image.src.includes('fallOff')) {
                        player1.velocity.x = 0
                    }
                }
            }
        }
        if (keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
            if (!this.checkY(player2, player1)) {
                if (this.checkXRight(player2, player1)) {
                    if (!player2.image.src.includes('fallOff')) {
                        player2.velocity.x = 0
                    }
                }
            }
        } else if (keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft') {
            if (!this.checkY(player2, player1)) {
                if (this.checkXLeft(player2, player1)) {
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

    checkY(player1, player2) {
        if (
            (player1.position.y + player1.height < player2.position.y) ||
            (player1.position.y > player2.position.y + player2.height)
        ) {
            return true
        } else {
            return false
        }
    }
    
    checkXRight(player1, player2) {
        if (
            (player1.position.x + player1.width >= player2.position.x) &&
            (player1.position.x + player1.width < player2.position.x + player2.width)
        ) {
            return true
        } else {
            return false
        }
    }
    
    checkXLeft(player1, player2) {
        if (
            (player1.position.x <= player2.position.x + player2.width) &&
            (player1.position.x > player2.position.x)
        ) {
            return true
        } else {
            return false
        }
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