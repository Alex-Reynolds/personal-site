const textSketch = (p) => {
  let font;
  let canvas;
  /** 
  let parentDiv = document.getElementById('threeDimText');
  let rect = parentDiv.getBoundingClientRect();
  let canvasWidth = rect.width;
  let canvasHeight = rect.height;
  */

  p.preload = () => {
      font = p.loadFont('threeDimText/Roboto-Regular.ttf'); // Preload the font
  };

  p.setup = () => {
      canvas = p.createCanvas(250, 60, p.WEBGL);
      canvas.parent('threeDimText');
  };

  p.draw = () => {
      console.log("we in 3d text");
      p.clear();
      p.textFont(font);
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(30);
      if(p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height){
        p.rotateX(-p.map(p.mouseY-(p.height/2), 0, p.height, 0, p.TWO_PI/10));
        p.rotateY(p.map(p.mouseX-(p.width/2), 0, p.width, 0, p.TWO_PI/10));
        p.fill(252, 3, 127);
      }else{
        p.fill(0,0,0);
      }
      
      p.push();
      for (let i = 0; i < 25; i++) {
          
          p.translate(0, 0, 0.5);
          p.text("Alex Reynolds", 0, 0);
      }
      p.pop();
  };

};

// Create the p5 instance
const textP5 = new p5(textSketch);
