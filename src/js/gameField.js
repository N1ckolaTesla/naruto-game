const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

export class GameField {
  constructor() {
    this.ctx = ctx;
    this.canvas = canvas;
    this.canvasHeight = canvas.height;
    this.canvasWidth = canvas.width;
  }
}
