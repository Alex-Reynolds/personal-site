const sketch = (p) => {//this is an instnace mode setup for p5js
  let shaderProgram;
  let canvas;
  let shaderLoadedFlag = false;
  let offset = { x: 0, y: 0 };
  let zoom = 0.5;
  const scrollThreshold = 500; // Scroll threshold
  let uMousePos = { x:0, y: 0};
  let prevMousePos = { x:0, y: 0};
  var clicked = false;
  p.preload = () => {
    // Load the shader and set a callback
    shaderProgram = p.loadShader(
      'fractal/fractal.vert',
      'fractal/fractal.frag',
      () => {
        console.log('Fractal Shader loaded successfully');
        console.log("this is inside the proload function");
        shaderLoadedFlag = true; // Set the flag to true
      },
      (err) => {
        console.error('Error loading shader:', err);
      }
    );
    
  };
  

  p.setup = () => {
    canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    canvas.parent('background-container-fractal');
  };

  p.draw = () => {
    if(shaderLoadedFlag){//fixes p5js race condition bug that I discovered
      //controls
        // W key (move up)
      if (p.keyIsDown(87)) { // 87 is the keyCode for 'W'
        offset.y+=.003/zoom;
      }

      // A key (move left)
      if (p.keyIsDown(65)) { // 65 is the keyCode for 'A'
        offset.x-=.003/zoom;
      }

      // S key (move down)
      if (p.keyIsDown(83)) { // 83 is the keyCode for 'S'
        offset.y-=.003/zoom;
      }

      // D key (move right)
      if (p.keyIsDown(68)) { // 68 is the keyCode for 'D'
        offset.x+=.003/zoom;
      }
      let zoomSpeed = 0.03;
      if (p.keyIsDown(69)) { //e
        zoom += zoomSpeed*zoom;//this zooms in
      }

      if (p.keyIsDown(81)) { //q
        zoom -= zoomSpeed*zoom; //this zooms out
      }

      if (p.keyIsDown(82)) { // 82 is the keyCode for 'R'
        offset.x = 0;
        offset.y = 0;
        zoom = 0.5;
        uMousePos = { x:0, y:0};
      }

      p.shader(shaderProgram);
      shaderProgram.setUniform('u_resolution', [p.width, p.height]);
      shaderProgram.setUniform('u_time', p.millis() / 1000.0);

      if(p.mouseIsPressed){//this is probably an overcomplicated way to do this but this was first idea I had
        console.log("fractal should be working");
        let mousexDif = 0;
        let mouseyDif = 0;
        if(clicked){
          mousexDif = p.mouseX - prevMousePos.x;
          mouseyDif = p.mouseY - prevMousePos.y;
        }
        uMousePos.x += mousexDif;
        uMousePos.y += mouseyDif;
        prevMousePos.x = p.mouseX;
        prevMousePos.y = p.mouseY;
        clicked = true;
      }else{
        clicked = false;
      }
      shaderProgram.setUniform('u_mouse', [uMousePos.x, uMousePos.y]);
      shaderProgram.setUniform('u_offset', [offset.x, offset.y]);
      shaderProgram.setUniform('u_zoom', zoom);
      shaderProgram.setUniform('u_steps', 50);
  
      p.beginShape();
      p.vertex(-1, -1, 0, 0);  // Bottom-left corner
      p.vertex(1, -1, 1, 0);   // Bottom-right corner
      p.vertex(1, 1, 1, 1);    // Top-right corner
      p.vertex(-1, 1, 0, 1);   // Top-left corner
      p.endShape(p.CLOSE);
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

// Create a unique p5 instance
const myP5 = new p5(sketch);