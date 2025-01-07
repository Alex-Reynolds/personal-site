/*
function setup() {
  createCanvas(600, 400);
  background(220);
}

function draw() {
  fill(0, 102, 153);
  console.log("inside draw function snake");
  ellipse(mouseX, mouseY, 50, 50); // Blue circle follows the mouse
}


  */
import { Game } from './Game.js';

var game = new Game();
//console.log("hello");
//console.log(game);
let canvas;

function setup() {
  canvas = createCanvas(400, 400); // Create a canvas
  canvas.parent('game-container'); // Place the canvas inside the container
}

function draw() {
  background(0,0,0);
  //"inside draw function snake");
  game.render();
}

// Attach setup and draw to the global scope
window.setup = setup;
window.draw = draw;


/*

*/