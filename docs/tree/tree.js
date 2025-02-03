const treeSketch = (p) => {
  let canvas;
  let myButton;
  
  // Global tree data structure and growth variables:
  let treeStructure;
  let treeMaxDepth; // total number of recursive levels in the tree
  let maxDepth = 0; // current growth level (will increase gradually)
  const growthRate = 1; // how fast the tree “grows”

  p.setup = () => {
    // When the user clicks the reload button, re‐generate the tree and reset growth:
    myButton = document.getElementById('reload-tree');
    myButton.addEventListener('click', () => {
      treeStructure = generateBranch(100, 0);
      treeMaxDepth = getMaxDepth(treeStructure);
      maxDepth = 0;
    });

    canvas = p.createCanvas(p.windowWidth, (p.windowHeight / 4) * 3);
    canvas.parent('background-tree');
    p.angleMode(p.DEGREES);
    // p.noLoop(); // Commented out to allow continuous animation

    // Generate the tree once (using recursive random parameters)
    treeStructure = generateBranch(100, 0);
    treeMaxDepth = getMaxDepth(treeStructure);
  };

  p.draw = () => {
    p.background(0);
    
    // Draw the sun in the background.
    drawSun();

    p.push();
    // Move origin to bottom–center and scale relative to height:
    p.translate(p.width / 2, p.height);
    p.scale(p.height / 800);

    // Instead of using the mouse position, compute light bias based on the sun’s x–coordinate.
    // (The tree is drawn at x = p.width/2, so we compare the sun’s x to that.)
    let sunX = p.width * 0.5; // Must match the sun’s x position in drawSun()
    let lightBias = p.map(sunX - p.width / 2, -p.width / 2, p.width / 2, -20, 20);

    // Draw the tree structure with the current growth progress.
    drawBranch(treeStructure, 0, maxDepth, lightBias);
    p.pop();

    // Gradually increase maxDepth until the tree is fully “grown”
    if (maxDepth < treeMaxDepth) {
      maxDepth += growthRate;
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, (p.windowHeight / 4) * 3);
  };

  // ─── DRAW THE SUN ─────────────────────────────────────────────
  // This function draws a sun at a fixed position.
  // You can modify sunX and sunY or use p.frameCount to animate it.
  function drawSun() {
    p.push();
    // Position the sun at 80% of the canvas width and 20% of the canvas height.
    let sunX = p.width * 0.5;
    let sunY = p.height * 0.2;
    p.noStroke();
    p.fill(255, 204, 0); // A yellowish color
    p.ellipse(sunX, sunY, 80, 80);
    p.pop();
  }

  // ─── TREE GENERATION (BUILD A TREE DATA STRUCTURE) ─────────────────────────
  function generateBranch(len, depth) {
    // Stop if the branch is too short
    if (len <= 10) return null;
    let branch = {};
    branch.len = len;
    branch.slant = (len > 90) ? p.random(-45, 45) : 0;
    branch.curve = p.random(2, 4);
    branch.direction = p.random(-1, 1);
    // Base rotations for left and right child branches.
    branch.leftAngle = p.random(-30, -20);  // left branch rotation (in degrees)
    branch.rightAngle = p.random(50, 60);     // right branch rotation
    branch.leftLenFactor = p.random(0.7, 0.9);
    branch.rightLenFactor = p.random(0.7, 0.9);

    // Attach a flower if the branch is short enough.
    if (len < 60) {
      branch.flower = {
        r: 220 + p.random(-10, 20),
        g: 120 + p.random(-10, 30),
        b: 160 + p.random(-10, 30),
        randAngle: p.random(0, 360),
        randDist: p.random(2, 4)
      };
    } else {
      branch.flower = null;
    }

    // Generate children branches if possible.
    let leftLen = len * branch.leftLenFactor;
    let rightLen = len * branch.rightLenFactor;
    branch.leftChild = (leftLen > 10) ? generateBranch(leftLen, depth + 1) : null;
    branch.rightChild = (rightLen > 10) ? generateBranch(rightLen, depth + 1) : null;

    return branch;
  }

  // Compute the maximum depth (number of recursive levels) of the tree.
  function getMaxDepth(branch) {
    if (!branch) return 0;
    let leftDepth = branch.leftChild ? getMaxDepth(branch.leftChild) : 0;
    let rightDepth = branch.rightChild ? getMaxDepth(branch.rightChild) : 0;
    return 1 + Math.max(leftDepth, rightDepth);
  }

  // ─── TREE DRAWING (ANIMATED GROWTH WITH LIGHT–BIAS) ─────────────────────────
  function drawBranch(branch, depth, maxDepthLevel, lightBias) {
    if (!branch) return;
    p.push();

    // Apply any extra rotation (“slant”) for long branches.
    if (branch.len > 90) {
      p.rotate(branch.slant);
    }

    p.strokeWeight(p.map(branch.len, 10, 100, 1, 30));
    p.stroke(250);
    p.noFill();

    let currentLevel = Math.floor(maxDepthLevel);
    let progress = maxDepthLevel - currentLevel; // fractional progress at the current level

    if (depth < currentLevel) {
      // Fully grown branch: draw the full bezier curve.
      p.beginShape();
      p.vertex(0, 0);
      p.bezierVertex(
        (-branch.len / branch.curve) * branch.direction,
        -branch.len / 4,
        (-branch.len / branch.curve) * branch.direction,
        -branch.len + (branch.len / branch.curve),
        0,
        -branch.len
      );
      p.endShape();
    } else if (depth === currentLevel) {
      // Branch that is still growing: simply draw a straight line (a fraction of its full length).
      p.line(0, 0, 0, -branch.len * progress);
    }

    // Move the drawing context to the tip of the branch (fully if complete, partial otherwise)
    let tipLen = (depth < currentLevel) ? branch.len : branch.len * progress;
    p.translate(0, -tipLen);

    // Only draw child branches if this branch is already “complete.”
    if (depth < currentLevel) {
      // LEFT CHILD:
      if (branch.leftChild) {
        p.push();
        // Add the left branch’s base rotation plus a bias that “pulls” toward the light.
        p.rotate(branch.leftAngle + lightBias);
        drawBranch(branch.leftChild, depth + 1, maxDepthLevel, lightBias);
        p.pop();
      }
      // RIGHT CHILD:
      if (branch.rightChild) {
        p.push();
        // For the right branch subtract the bias (so both sides lean toward the light)
        p.rotate(branch.rightAngle - lightBias);
        drawBranch(branch.rightChild, depth + 1, maxDepthLevel, lightBias);
        p.pop();
      }
      // Draw a flower if this branch node has one.
      if (branch.flower) {
        drawFlower(branch.flower);
      }
    }
    p.pop();
  }

  // ─── FLOWER DRAWING ────────────────────────────────────────────────
  function drawFlower(flower) {
    p.strokeWeight(1);
    p.push();
    p.rotate(flower.randAngle);
    p.line(0, 0, 0, flower.randDist);
    p.translate(0, flower.randDist);
    p.fill(flower.r, flower.g, flower.b, 200);
    p.noStroke();
    for (let i = 0; i < 5; i++) {
      p.push();
      p.rotate(i * 72);
      p.translate(0, 5);
      p.ellipse(0, 0, 5, 10);
      p.pop();
    }
    p.pop();
  }
};

const treeP5 = new p5(treeSketch);
