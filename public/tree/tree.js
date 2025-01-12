const treeSketch = (p) => {
    let canvas;
    p.setup = () => {
      canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      canvas.parent('background-tree');
      p.angleMode(p.DEGREES);
      p.noLoop();
    };
  
    p.draw = () => {
      p.background(0);
      p.translate(p.width / 2, p.height / 2 + 200);
      branch(100);
    };
  
    function branch(len) {
      p.push();
      if (len > 10) {
        p.strokeWeight(p.map(len, 10, 100, 1, 15));
        p.stroke(250, 250, 250);
        p.line(0, 0, 0, -len);
        p.translate(0, -len);
        p.rotate(p.random(-20, -30));
        branch(len * p.random(0.7, 0.9));
        p.rotate(p.random(50, 60));
        branch(len * p.random(0.7, 0.9));
        if(len < 60){
            genFlower(p);
        }

      }
      p.pop();
    }
  
    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  };
  

  function genFlower(p){
    let r = 220 + p.random(-20, 20);  // High red for pink
    let g = 100 + p.random(-30, 30);  // Lower green for softness
    let b = 150 + p.random(-30, 30);  // Moderate blue for pink hue
    p.strokeWeight(3);
    let randAngle = p.random(0,360);
    p.rotate(randAngle);
    let randDist = p.random(0,10);
    p.line(0,0,0,randDist);
    p.translate(0, randDist);

    p.fill(r, g, b, 200);
    p.noStroke();

    
    for (let i = 0; i < 5; i += 1) {
        p.ellipse(0, 0, 20, 5);
        p.rotate(72);
    }
    p.rotate(180);
    p.translate(0, randDist);
    p.rotate(-randAngle);
  }
  // Create the p5 instance
  const treeP5 = new p5(treeSketch);
  