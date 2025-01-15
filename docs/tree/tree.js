const treeSketch = (p) => {
    let canvas;
    let myButton;
    p.setup = () => {
      myButton = document.getElementById('reload-tree');
      myButton.addEventListener('click', () => {
        treeP5.redraw();
      });
      canvas = p.createCanvas(p.windowWidth, (p.windowHeight/4)*3);
      canvas.parent('background-tree');
      p.angleMode(p.DEGREES);
      p.noLoop();
    };
  
    p.draw = () => {
      
      p.background(0);
      p.translate(p.width / 2, p.height);
      p.scale(p.height/800);
      branch(100);
    };
  
    function branch(len) {
      p.push();
      if (len > 10) {
        let slant = p.random(-45,45);
        if(len > 90){
          p.rotate(slant);
        }
        p.strokeWeight(p.map(len, 10, 100, 1, 30));
        p.stroke(250, 250, 250);
        p.noFill();
        p.beginShape();
        p.vertex(0,0);
        let curve = p.random(2,4);
        let direction = p.random(-1,1);
        p.bezierVertex((-len/curve)*direction, -len/4, (-len/curve)*direction, (-len - (-len/curve)), 0, -len);
        p.endShape();
        p.translate(0, -len);
        p.rotate(p.random(-20, -30));
        if(len > 90){
          p.rotate(-slant);
        }
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
      p.resizeCanvas(p.windowWidth, (p.windowHeight/4)*3);
    };
  };
  

  function genFlower(p){
    let r = 220 + p.random(-10, 20);  // High red for pink
    let g = 120 + p.random(-10, 30);  // Lower green for softness
    let b = 160 + p.random(-10, 30);  // Moderate blue for pink hue
    p.strokeWeight(1);
    let randAngle = p.random(0,360);
    p.rotate(randAngle);
    let randDist = p.random(2,4);
    p.line(0,0,0,randDist);
    p.translate(0, randDist);

    p.fill(r, g, b, 200);
    p.noStroke();

    
    for (let i = 0; i < 5; i += 1) {
        p.translate(0,5);
        p.ellipse(0, 0, 5, 10);
        p.translate(0,-5);
        p.rotate(72);
    }
    p.rotate(180);
    p.translate(0, randDist);
    p.rotate(-randAngle);
  }
  // Create the p5 instance
  const treeP5 = new p5(treeSketch);
  