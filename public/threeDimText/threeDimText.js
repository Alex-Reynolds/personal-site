
/** 
let font;

function preload() {
  font = loadFont('Staatliches-Regular.ttf'); // Preload the font. For 3D to work, we need a font file (not a linked font). 
}


function setup() {
  createCanvas(60,30,WEBGL);
  background('#3C2350');
}

function draw() {
  textFont(font);
  textAlign(CENTER,CENTER);
  textSize(50);
  rotateX(map(mouseX,0,width,0,TWO_PI));
  rotateY(map(mouseY,0,height,0,TWO_PI));
  //rotateZ(map(frameCount,0,600,0,TWO_PI))
  // fill('#8C53D5');
  push();
  for(let i=0; i<100; i++) {
    fill(map(i,0,100,0,255),80,215);
    translate(0,0,.5);
    text("Alex\nReynolds",0,0);
  }
  pop();
}


window.preload = preload;
window.setup = setup;
window.draw = draw;

*/

function sketch1(p) {
    p.setup = function () {
      p.createCanvas(720, 200);
      p.background(0);
    };
    p.draw = function () {
      p.circle(p.mouseX, p.mouseY, 50);
    };
  }

// Run first p5 instance
new p5(sketch1);
  
  // Function for second canvas
function sketch2(p) {
p.setup = function () {
    p.createCanvas(720, 200);
    p.background(255);
    p.fill(0);
    p.stroke(255);
};
p.draw = function () {
    p.square(p.mouseX, p.mouseY, 50);
};
}

// Run second p5 instance
new p5(sketch2);