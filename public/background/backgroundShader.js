let shaderProgram;
let canvas;
let scrollValue = 0.0;
function preload() {
  // Load the shader
  shaderProgram = loadShader('background/background.vert', 'background/background.frag');
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight); // Resize canvas when the window is resized
}
function setup() {
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.parent('game-container');
    window.addEventListener('scroll', () => {
        // Normalize scroll value between 0 and 1
        scrollValue = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    });
}

function draw() {
  // Set the shader as the active shader
  shader(shaderProgram);
  shaderProgram.setUniform('u_resolution', [width, height]);
  shaderProgram.setUniform('u_time', millis() / 1000.0); // Optional for animation
  // Pass the mouse coordinates to the shader
  shaderProgram.setUniform('u_mouse', [mouseX, mouseY]);
  shaderProgram.setUniform('u_scroll', scrollValue);  // Pass the scroll value
  // Draw a rectangle that covers the whole canvas
  beginShape();
  vertex(-1, -1, 0, 0);  // Bottom-left corner
  vertex(1, -1, 1, 0);   // Bottom-right corner
  vertex(1, 1, 1, 1);    // Top-right corner
  vertex(-1, 1, 0, 1);   // Top-left corner
  endShape(CLOSE);
}
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;