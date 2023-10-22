import { GameConstants } from "./gameConstants";
import { Fighter } from "./fighter";
import { move } from "./utils";
import { gameObjects } from "./sprites/gameObjects";
import { personNaruto } from "./persons/naruto";
import { personSasuke } from "./persons/sasuke";
import { keyDownListener } from "./controllers/keyDown";
import { keyUpListener } from "./controllers/keyUp";
import { Interaction } from "./interaction";

class Game extends GameConstants {
    constructor() {
        super();
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
            e : {
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
            },
            l: {
                pressed: false
            }
        };
        this.interaction = new Interaction(this.player1, this.player2, this.keys)
        document.addEventListener('keydown', keyDownListener({keys: this.keys, enemy: this.player2, player: this.player1})); 
        document.addEventListener('keyup', keyUpListener({keys: this.keys, enemy: this.player2, player: this.player1})); 
    }

    animate() {
        gameObjects.forEach(sprite => sprite.update());
        this.ctx.fillStyle = 'rgba(255, 255, 255, .05)';
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        this.player1.update();
        this.player2.update();

        this.player1.velocity.x = 0;
        this.player2.velocity.x = 0;

        move(this.player1, this.keys, 'naruto')
        move(this.player2, this.keys, 'sasuke')

        this.interaction.turnFighters()
        this.interaction.detectCollision()
        this.interaction.playerThrowBack(this.player1, this.player2)
        this.interaction.playerThrowBack(this.player2, this.player1)
        this.interaction.preventPassingThrough(this.player1, this.player2, this.keys)

        requestAnimationFrame(this.animate.bind(this)); // Use bind(this) to maintain the correct context
    }
    removeListeners() {
        document.removeEventListener('keydown', keyDownListener({keys: this.keys, enemy: this.player2, player: this.player1})); 
        document.removeEventListener('keyup', keyUpListener({keys: this.keys, enemy: this.player2, player: this.player1})); 
    }
}

let game;

const newGame = () => {
    if (game) {
        game.removeListeners()
    }
    game = new Game();
    game.animate();
}

newGame()
