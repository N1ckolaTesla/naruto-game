
export const canvas = document.querySelector('canvas')
export const ctx = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

export class GameConstants {
    constructor(){
        this.ctx = ctx;
        this.canvas = canvas;
        this.canvasHeight = 576
        this.canvasWidth = 1024
        this.gravity = 0.7

    }
}