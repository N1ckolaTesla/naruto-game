import { Sprite } from "./sprite"
import { attackFlying } from "./utils"

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
        attackBox = { offset: {}, width: 1, height: 1 },
    }) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })
        this.velocity = velocity
        this.width = 50 * this.scale
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
        this.isAttacking = false
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.sprites = sprites
        this.activeSprites = this.sprites.right
        for (const sprite in this.activeSprites) {
            this.activeSprites[sprite].image = new Image()
            this.activeSprites[sprite].image.src = this.activeSprites[sprite].imageSrc
        }
        for (const sprite in this.sprites.left) {
            this.sprites.left[sprite].image = new Image()
            this.sprites.left[sprite].image.src = this.sprites.left[sprite].imageSrc
        }
        this.dead = false
        this.attack3Available = false
        this.readyToRunRight = false,
        this.readyToRunLeft = false,
        this.readyToRunRightTimeout,
        this.readyToRunLeftTimeout,
        this.isRunningRight = false,
        this.isRunningLeft = false
        this.velocityXFlying = 0
    }
    turnFighters(player1, player2) {
        if (player1.position.x >= player2.position.x) {
            if (player1.velocity.x <= 0 && !player1.dead) {
                player1.activeSprites = player1.sprites.left
            } else if (player1.velocity.x > 0 && !player1.dead) {
                player1.activeSprites = player1.sprites.right
            }
            if (player2.velocity.x < 0 && !player2.dead) {
                player2.activeSprites = player2.sprites.left
            } else if (player2.velocity.x >= 0 && !player2.dead) {
                player2.activeSprites = player2.sprites.right
            }
            //setting the attackBox
            player1.attackBox.offset.x = -5
            player2.attackBox.offset.x = 80
        } else if (player1.position.x < player2.position.x) {
            if (player2.velocity.x <= 0 && !player2.dead) {
                player2.activeSprites = player2.sprites.left
            } else if (player2.velocity.x > 0 && !player2.dead) {
                player2.activeSprites = player2.sprites.right
            }
            if (player1.velocity.x < 0 && !player1.dead) {
                player1.activeSprites = player1.sprites.left
            } else if (player1.velocity.x >= 0 && !player1.dead) {
                player1.activeSprites = player1.sprites.right
            }
            //setting the attackBox
            player1.attackBox.offset.x = 80
            player2.attackBox.offset.x = -5
        }
    }
    update() {
        this.draw()
        if (!this.dead) this.animateFrames()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y
        //draw the attack box
        this.ctx.fillRect(
            this.attackBox.position.x,
            this.attackBox.position.y,
            this.attackBox.width,
            this.attackBox.height
        )
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
        if (this.velocity.y !== 0) {
            this.isAttacking = true
            attackFlying(this)
            return
        }
        if (this.isRunningLeft || this.isRunningRight) {
            this.isAttacking = true
            this.switchSprite('attack3')
            return
        }
        if (this.framesCount % this.framesHold === 0) {
            this.attackCountAvailable++
        }
        if (this.attackCountAvailable > this.attackCount) {
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
            } else if (this.attackCountAvailable >= 7 && this.attack3Available) {
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
    takeHit(hp) {
        this.health -= hp
        if (this.health <= 0) {
            this.switchSprite('death')
        } else if (hp === 2) {
            this.switchSprite('fallOff')
        } else {
            this.switchSprite('takekHit')
        }
    }
    switchSprite(sprite) {
        //override all other animations with the attack animation
        if (
            (this.image === this.activeSprites.attack1.image &&
            this.framesCurrent < this.activeSprites.attack1.framesMax - 1) ||
            (this.image === this.activeSprites.attack2.image &&
            this.framesCurrent < this.activeSprites.attack2.framesMax - 1) ||
            (this.image === this.activeSprites.attack3.image &&
            this.framesCurrent < this.activeSprites.attack3.framesMax - 1) ||
            (this.image === this.activeSprites.attackFlying.image &&
            this.framesCurrent < this.activeSprites.attackFlying.framesMax - 1)
        ) {
            this.isRunningLeft = false
            this.isRunningRight = false
            return
        }
        //override when fighter gets hit
        if (
            this.image === this.activeSprites.fallOff.image &&
            this.framesCurrent < this.activeSprites.fallOff.framesMax - 1
        ) {
            this.velocity.x = -4
            return
        }
        if (
            this.image === this.activeSprites.takeHit.image &&
            this.framesCurrent < this.activeSprites.takeHit.framesMax - 1
        ) 
        return
        if (this.image === this.activeSprites.death.image) {
            if (this.framesCurrent === this.activeSprites.death.framesMax - 1) this.dead = true 
            return
        }
        if (this.velocity.y < 0 && sprite !== 'attackFlying') {
            sprite = 'jump'
        } else if (this.velocity > 0 && sprite !== 'attackFlying') {
            sprite = 'fall'
        }
        switch(sprite) {
            case 'idle':
                if (this.image !== this.activeSprites.idle.image) {
                    this.image = this.activeSprites.idle.image
                    this.framesMax = this.activeSprites.idle.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'walk':
                if (this.image !== this.activeSprites.walk.image) {
                    this.image = this.activeSprites.walk.image
                    this.framesMax = this.activeSprites.walk.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'run':
                if (this.image !== this.activeSprites.run.image) {
                    this.image = this.activeSprites.run.image
                    this.framesMax = this.activeSprites.run.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'jump':
                if (this.image !== this.activeSprites.jump.image) {
                    this.image = this.activeSprites.jump.image
                    this.framesMax = this.activeSprites.jump.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'fall':
                if (this.image !== this.activeSprites.fall.image) {
                    this.image = this.activeSprites.fall.image
                    this.framesMax = this.activeSprites.fall.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'attack1':
                if (this.image !== this.activeSprites.attack1.image) {
                    this.image = this.activeSprites.attack1.image
                    this.framesMax = this.activeSprites.attack1.framesMax
                    this.framesCurrent = 0
                    this.attackCount++
                }
                break
            case 'attack2':
                if (this.image !== this.activeSprites.attack2.image) {
                    this.image = this.activeSprites.attack2.image
                    this.framesMax = this.activeSprites.attack2.framesMax
                    this.framesCurrent = 0
                    this.attackCount++
                }
                break
            case 'attack3':
                if (this.image !== this.activeSprites.attack3.image) {
                    this.image = this.activeSprites.attack3.image
                    this.framesMax = this.activeSprites.attack3.framesMax
                    this.framesCurrent = 0
                    this.attackCount = 0
                    this.attackCountAvailable = 0
                }
                break
            case 'attackFlying':
                if (this.image !== this.activeSprites.attackFlying.image) {
                    this.image = this.activeSprites.attackFlying.image
                    this.framesMax = this.activeSprites.attackFlying.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'takeHit':
                if (this.image !== this.activeSprites.takeHit.image) {
                    this.image = this.activeSprites.takeHit.image
                    this.framesMax = this.activeSprites.takeHit.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'fallOff':
                if (this.image !== this.activeSprites.fallOff.image) {
                    this.image = this.activeSprites.fallOff.image
                    this.framesMax = this.activeSprites.fallOff.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'death':
                if (this.image !== this.activeSprites.death.image) {
                    this.image = this.activeSprites.death.image
                    this.framesMax = this.activeSprites.death.framesMax
                    this.framesCurrent = 0
                }
                break
        }
    }
}