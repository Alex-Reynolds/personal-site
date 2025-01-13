const sketch = (p) => {//this is an instnace mode setup for p5js
  let shaderProgram;
  let canvas;
  let shaderLoadedFlag = false;
  const scrollThreshold = 500; // Scroll threshold

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

    // Listen for scroll events to update the scroll value
    window.addEventListener('scroll', handleScroll);
  };

  const handleScroll = () => {
    // Use requestAnimationFrame for smooth performance
    requestAnimationFrame(() => {
      const gameContainer = document.getElementById('background-container');
      if (window.scrollY < scrollThreshold) {
        gameContainer.style.position = 'fixed';
      } else {
        gameContainer.style.position = 'absolute';
      }
    });
  };

  p.draw = () => {
    if(shaderLoadedFlag){//fixes p5js race condition bug that I discovered
      p.shader(shaderProgram);
      shaderProgram.setUniform('u_resolution', [p.width, p.height]);
      shaderProgram.setUniform('u_time', p.millis() / 1000.0);
      shaderProgram.setUniform('u_mouse', [p.mouseX, p.mouseY]);

  
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