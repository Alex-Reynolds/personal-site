let canvas;
let mandelbrotShader;
function preload() {
    console.log("preloading happened");
    mandelbrotShader = loadShader('mandelbrot.vert', 'mandelbrot.frag');
  }
function setup() {
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.parent('game-container');
    noStroke();
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight); // Resize canvas when the window is resized
}
function draw() {
    console.log("drawing");
    background(0,0,0);
    shader(mandelbrotShader);
    mandelbrotShader.setUniform('u_resolution', [width, height]);
    mandelbrotShader.setUniform('u_time', millis() / 1000.0); // Optional for animation
    mandelbrotShader.setUniform('u_mouse', [mouseX, mouseY]);
    beginShape();
    vertex(-1, -1, 0, 0);  // Bottom-left corner
    vertex(1, -1, 1, 0);   // Bottom-right corner
    vertex(1, 1, 1, 1);    // Top-right corner
    vertex(-1, 1, 0, 1);   // Top-left corner
    endShape(CLOSE);
}

// Attach setup and draw to the global scope
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;