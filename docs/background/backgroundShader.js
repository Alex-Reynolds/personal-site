const sketch = (p) => {
  let shaderProgram;
  let canvas;
  let shaderLoadedFlag = false;
  const scrollThreshold = 500; // Scroll threshold

  p.preload = () => {
    // Load the shader and set a callback
    shaderProgram = p.loadShader(
      'background/background.vert',
      'background/background.frag',
      () => {
        console.log('Shader loaded successfully');
        console.log("this is inside the proload function");
        shaderLoadedFlag = true; // Set the flag to true
      },
      (err) => {
        console.error('Error loading shader:', err);
      }
    );
    
  };
  

  p.setup = () => {
    canvas = p.createCanvas(p.windowWidth, p.windowHeight+8, p.WEBGL);
    canvas.parent('background-container');

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
      
      shaderProgram.setUniform('u_scroll', window.scrollY);

  
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