import { GameConstants } from "./gameConstants"
import { Sprite } from "./sprite"

export class Fighter extends Sprite {
    constructor({
        position, 
        velocity, 
        color = 'red', 
        imageSrc, 
        scale = 1, 
        framesMax = 1,
        offset = {x: 0, y: 0},
        sprites,
        attackBox = { offset: {}, width: undefined, height: undefined },
    }) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height 
        }
        this.color = color
        this.isAttacking
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.sprites = sprites
        for (const sprite in sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
        this.dead = false
        this.attack3Available = false
        this.readyToRunRight = false,
        this.readyToRunLeft = false,
        this.readyToRunRightTimeout,
        this.readyToRunLeftTimeout,
        this.isRunningRight = false,
        this.isRunningLeft = false
    }
    update() {
        this.draw()
        if (!this.dead) this.animateFrames()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y
        // draw the attack box
        // c.fillRect(
        //     this.attackBox.position.x,
        //     this.attackBox.position.y,
        //     this.attackBox.width,
        //     this.attackBox.height
        // )
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        if (this.position.y + this.height + this.velocity.y >= this.canvasHeight - 96) {
            this.velocity.y = 0
            this.position.y = 330
        } else {
            this.velocity.y += this.gravity 
        }
    }
    attack() {
        if (this.framesCount % this.framesHold === 0) {
            this.attackCountAvailable++
        }
        if (this.attackCountAvailable > this.attackCount) {
            console.log(this.framesAttackElapsed / this.framesHold <= this.framesMax)
            if (this.attackCountAvailable < 7) {
                if (this.attackCountAvailable % 2 !== 0) {
                    this.switchSprite('attack1')
                    this.framesAttackElapsed = 0
                    this.attack3Available = true
                    setTimeout(() => {
                        this.attackCount = 0
                        this.attackCountAvailable = 0
                        this.attack3Available = false
                    }, 1000)
                } else if (this.attackCountAvailable % 2 === 0) {
                    this.switchSprite('attack2')
                    this.framesAttackElapsed = 0
                    this.attack3Available = true
                    setTimeout(() => {
                        this.attackCount = 0
                        this.attackCountAvailable = 0
                        this.attack3Available = false
                    }, 1000)
                }
            } else if (
                (this.attackCountAvailable >= 7 && this.attack3Available)
            ) {
                this.switchSprite('attack3')
            } else {
                this.switchSprite('attack1')
                this.framesAttackElapsed = 0
                this.attack3Available = true
                setTimeout(() => this.attack3Available = false, 1000)
            }
        }
        this.isAttacking = true
    }
    takeHit() {
        this.health -= 20
        if (this.health <= 0) {
            this.switchSprite('takeHit')
        } else this.switchSprite('takeHit')
    }
    switchSprite(sprite) {
        //override all other animations with the attack animation
        if (
            (this.image === this.sprites.attack1.image &&
            this.framesCurrent < this.sprites.attack1.framesMax - 1) ||
            (this.image === this.sprites.attack2.image &&
            this.framesCurrent < this.sprites.attack2.framesMax - 1) ||
            (this.image === this.sprites.attack3.image &&
            this.framesCurrent < this.sprites.attack3.framesMax - 1)
        ) return
        //override when fighter gets hit
        if (
            this.image === this.sprites.takeHit.image &&
            this.framesCurrent < this.sprites.takeHit.framesMax - 1
        ) 
        return
        if (this.image === this.sprites.death.image) {
            if (this.framesCurrent === this.sprites.death.framesMax - 1) this.dead = true 
            return
        }
        switch(sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.framesCurrent = 0
                    this.framesMax = this.sprites.idle.framesMax
                }
                break
            case 'run':
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.framesCurrent = 0
                    this.framesMax = this.sprites.run.framesMax
                }
                break
            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent = 0
                    this.framesMax = this.sprites.jump.framesMax
                }
                break
            case 'fall':
                if (this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    this.framesCurrent = 0
                    this.framesMax = this.sprites.fall.framesMax
                }
                break
            case 'attack1':
                if (this.image !== this.sprites.attack1.image) {
                    this.image = this.sprites.attack1.image
                    this.framesMax = this.sprites.attack1.framesMax
                    this.framesCurrent = 0
                    this.framesMax = this.sprites.attack1.framesMax
                    this.attackCount++
                }
                break
            case 'attack2':
                if (this.image !== this.sprites.attack2.image) {
                    this.image = this.sprites.attack2.image
                    this.framesMax = this.sprites.attack2.framesMax
                    this.framesCurrent = 0
                    this.framesMax = this.sprites.attack2.framesMax
                    this.attackCount++
                }
                break
            case 'attack3':
                if (this.image !== this.sprites.attack3.image) {
                    this.image = this.sprites.attack3.image
                    this.framesMax = this.sprites.attack3.framesMax
                    this.framesCurrent = 0
                    this.framesMax = this.sprites.attack3.framesMax
                    this.attackCount = 0
                    this.attackCountAvailable = 0
                }
                break
            case 'takeHit':
                if (this.image !== this.sprites.takeHit.image) {
                    this.image = this.sprites.takeHit.image
                    this.framesMax = this.sprites.takeHit.framesMax
                    this.framesCurrent = 0
                    this.framesMax = this.sprites.takeHit.framesMax
                }
                break
            case 'death':
                if (this.image !== this.sprites.death.image) {
                    this.image = this.sprites.death.image
                    this.framesMax = this.sprites.death.framesMax
                    this.framesCurrent = 0
                    this.framesMax = this.sprites.death.framesMax
                }
                break
        }
    }
}