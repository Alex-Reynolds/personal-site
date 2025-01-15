const rootSketch = (p) => {
    let canvas;
    let myButton;
    p.setup = () => {
      myButton = document.getElementById('reload-tree');
      myButton.addEventListener('click', () => {
        rootP5.redraw();
      });
      canvas = p.createCanvas(p.windowWidth, (p.windowHeight/4)*3);
      canvas.parent('background-roots');
      p.angleMode(p.DEGREES);
      p.noLoop();
    };
  
    p.draw = () => {
      
      p.background(255);
      p.translate(p.width / 2, 0);
      p.rotate(180);
      p.scale(p.height/800);
      branch(100);
    };
  
    function branch(len) {
      p.push();
      if (len > 10) {
        let dist = p.max((len/50)*len, len);
        p.strokeWeight(p.map(len, 10, 100, 1, 30));
        p.stroke(0, 0, 0);
        p.noFill();
        p.beginShape();
        p.vertex(0,0);
        let curve = p.random(1,3);
        let direction = p.random(-1,1);
        p.bezierVertex((-dist/curve)*direction, -dist/4, (-dist/curve)*direction, (-dist - (-dist/curve)), 0, -dist);
        p.endShape();
        p.translate(0, -dist);
        p.rotate(p.random(-20, -30));
        branch(len * p.random(0.7, 0.9));
        p.rotate(p.random(50, 60));
        branch(len * p.random(0.7, 0.9));
        

      }
      p.pop();
    }
  
    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, (p.windowHeight/4)*3);
    };
  };
  // Create the p5 instance
  const rootP5 = new p5(rootSketch);