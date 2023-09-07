import { GameConstants } from "./gameConstants"
export class Sprite extends GameConstants {
    constructor({ position, imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0} }) {
        super()
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.offset = offset
        this.attackCount = 0
        this.attackCountAvailable = 0
        this.framesAttackElapsed = 0
    }
    draw() {
        this.ctx.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        )
    }
    animateFrames() {
        this.framesElapsed++
        this.framesAttackElapsed++
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }
        }
    }
    update() {
        this.draw()
        this.animateFrames()
    }
}