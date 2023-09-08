import { GameConstants } from "./gameConstants";
import { Fighter } from "./fighter";
import { decreaseTimer, rectangularCollision, determineWinner, timerId } from "./utils";
import { gameObjects } from "./sprites/gameObjects";
import { personNaruto } from "./persons/naruto";
import { personSasuke } from "./persons/sasuke";
import { keyDownListener } from "./controllers/keyDown";
import { keyUpListener } from "./controllers/keyUp";

const gameConstants = new GameConstants();

class Game extends GameConstants {
    constructor() {
        super();
        decreaseTimer();
        this.player1 = new Fighter(personNaruto);
        this.player2 = new Fighter(personSasuke);
        this.player1.draw();
        this.player2.draw();
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
        };
        document.addEventListener('keydown', keyDownListener({keys: this.keys, enemy: this.player2, player: this.player1})); 
        document.addEventListener('keyup', keyUpListener({keys: this.keys, enemy: this.player2, player: this.player1})); 
    }

    animate() {
        gameConstants.ctx.fillStyle = 'black';
        gameConstants.ctx.fillRect(0, 0, gameConstants.canvasWidth, gameConstants.canvasHeight);

        gameObjects.forEach(sprite => sprite.update());
        gameConstants.ctx.fillStyle = 'rgba(255, 255, 255, .15)';
        gameConstants.ctx.fillRect(0, 0, gameConstants.canvasWidth, gameConstants.canvasHeight);

        this.player1.update();
        this.player2.update();

        this.player1.velocity.x = 0;
        this.player2.velocity.x = 0;

        // this.player1 movement
        if (this.keys.a.pressed && this.player1.lastKey === 'a' && !this.player1.dead) {
            if (this.player1.isRunningLeft) {
                this.player1.velocity.x = -10;
                this.player1.switchSprite('run');
            } else if (!this.player1.isRunningLeft) {
                this.player1.velocity.x = -4;
                this.player1.switchSprite('walk');
            }
        } else if (this.keys.d.pressed && this.player1.lastKey === 'd' && !this.player1.dead) {
            if (this.player1.isRunningRight) {
                this.player1.velocity.x = 10;
                this.player1.switchSprite('run');
            } else if (!this.player1.isRunningRight) {
                this.player1.velocity.x = 4;
                this.player1.switchSprite('walk');
            }
        } else {
            this.player1.switchSprite('idle');
        }
        if (this.player1.velocity.y < 0) {
            this.player1.velocity.x = this.player1.velocityXFlying;
            this.player1.switchSprite('jump');
        } else if (this.player1.velocity.y > 0) {
            this.player1.velocity.x = this.player1.velocityXFlying;
            this.player1.switchSprite('fall');
        }

        // this.player2 movement
        if (this.keys.ArrowLeft.pressed && this.player2.lastKey === 'ArrowLeft' && !this.player2.dead) {
            if (this.player2.isRunningLeft) {
                this.player2.velocity.x = -10;
                this.player2.switchSprite('run');
            } else if (!this.player2.isRunningLeft) {
                this.player2.velocity.x = -5;
                this.player2.switchSprite('walk');
            }
        } else if (this.keys.ArrowRight.pressed && this.player2.lastKey === 'ArrowRight' && !this.player2.dead) {
            if (this.player2.isRunningRight) {
                this.player2.velocity.x = 10;
                this.player2.switchSprite('run');
            } else if (!this.player2.isRunningRight) {
                this.player2.velocity.x = 5;
                this.player2.switchSprite('walk');
            }
        } else {
            this.player2.switchSprite('idle');
        }
        if (this.player2.velocity.y < 0) {
            this.player2.velocity.x = this.player2.velocityXFlying;
            this.player2.switchSprite('jump');
        } else if (this.player2.velocity.y > 0) {
            this.player2.velocity.x = this.player2.velocityXFlying;
            this.player2.switchSprite('fall');
        }

        // turn fighters
        this.player1.turnFighters(this.player1, this.player2)

        // Detect for collision & this.player2 gets hit
        if (
            rectangularCollision({
                rectangle1: this.player1,
                rectangle2: this.player2
            }) &&
            this.player1.isAttacking &&
            this.player1.framesCurrent === 2
        ) {
            this.player2.takeHit();
            this.player1.isAttacking = false;
            renderHealth('enemyHealth', this.player2.health);
        }
        // If this.player1 misses
        if (this.player1.isAttacking && this.player1.framesCurrent === 4) {
            this.player1.isAttacking = false;
        }
        // Detect for collison & this.player1 gets hit
        if (
            rectangularCollision({
                rectangle1: this.player2,
                rectangle2: this.player1
            }) &&
            this.player2.isAttacking &&
            this.player2.framesCurrent === 2
        ) {
            this.player1.takeHit();
            this.player2.isAttacking = false;
            renderHealth('playerHealth', this.player1.health);
        }
        // If this.player2 misses
        if (this.player2.isAttacking && this.player2.framesCurrent === 2) {
            this.player2.isAttacking = false;
        }
        // End game based on health
        if (this.player1.health <= 0 || this.player2.health <= 0) {
            determineWinner({ player: this.player1, enemy: this.player2, timerId });
            if (this.player1.health <= 0) {
                this.player1.switchSprite('death');
            } else if (this.player2.health <= 0) {
                this.player2.switchSprite('death');
            }
        }

        requestAnimationFrame(this.animate.bind(this)); // Use bind(this) to maintain the correct context
    }
    removeListeners() {
        document.removeEventListener('keydown', keyDownListener({keys:this.keys, enemy: this.player2, player: this.player1})); 
        document.removeEventListener('keyup', keyUpListener({keys:this.keys, enemy: this.player2, player: this.player1})); 
    }
}

let game;

const newGame = () => {
    if(game){
        game.removeListeners()
    }
    game = new Game();
    game.animate();
}

newGame()


const renderHealth = (id , health) => {
       const element = document.getElementById(id)
       element.style.width = `${health}%`
}