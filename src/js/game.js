import { GameConstants } from "./gameConstants";
import { Fighter } from "./fighter";
import { decreaseTimer, attackCollision, move, playerTakesHit, isPlayerLookingRight, endGame } from "./utils";
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
        move(this.player1, this.keys, 'naruto')

        // this.player2 movement
        move(this.player2, this.keys, 'sasuke')

        // turn fighters
        this.player1.turnFighters(this.player1, this.player2)

        // Detect for collision & this.player2 gets hit
        if (attackCollision(this.player1, this.player2)) {
            playerTakesHit(this.player2, this.player1, 'enemyHealth')
        } else if (this.player1.isAttacking && this.player1.framesCurrent === 2) { //If this.player1 misses
            this.player1.isAttacking = false;
        }

        // Detect for collison & this.player1 gets hit
        if (attackCollision(this.player2, this.player1)) {
            playerTakesHit(this.player1, this.player2, 'playerHealth')
        } else if (this.player2.isAttacking && this.player2.framesCurrent === 2) { // If this.player2 misses
            this.player2.isAttacking = false;
        }

        if (
            this.player1.image === this.player1.activeSprites.fallOff.image &&
            this.player1.framesCurrent < this.player1.activeSprites.fallOff.framesMax - 1
        ) {
            if (isPlayerLookingRight(this.player1, this.player2)) {
                this.player1.velocity.x = -10
            } else {
                this.player1.velocity.x = 10
            }
        }

        if (
            this.player2.image === this.player2.activeSprites.fallOff.image &&
            this.player2.framesCurrent < this.player2.activeSprites.fallOff.framesMax - 1
        ) {
            if (isPlayerLookingRight(this.player2, this.player1)) {
                this.player2.velocity.x = -10
            } else {
                this.player2.velocity.x = 10
            }
        }

        // End game based on health
        endGame(this.player1, this.player2)

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
