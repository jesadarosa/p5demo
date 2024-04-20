
/* VARIABLES */
let catcher, fallingObject;
let score = 0;
let backgroundImg, catcherImg, fallingObjectImg;

function preload() {
  backgroundImg = loadImage("IMG/backgroundImg.png");
  catcherImg = loadImage("IMG/catcherImg.png");
  fallingObjectImg = loadImage("IMG/fallingObjectImg.png");
}

function setup() {
  createCanvas(400, 400);
  
  // Resize images
  backgroundImg.resize(400, 400);
  catcherImg.resize(150, 0);
  fallingObjectImg.resize(45, 0);
  
  //Create catcher 
   catcher = new Sprite(catcherImg, 200, 370, "k");
  //catcher.color = color(95,158,160);
  
  //Create falling object
  fallingObject = new Sprite(fallingObjectImg, 100, 0);
  //fallingObject.color = color(0,128,128);
  fallingObject.velocity.y = 2;
  
}

function draw() {
  background(220);
  
  // Draw background image
  image(backgroundImg, 0, 0);
  
  // Draw directions to screen
  fill(0);
  textSize(12);
  text("Move the \ncatcher with the \nleft and right \narrow keys to \ncatch the falling \nobjects.", width-100, 20);
  
  // If fallingObject reaches bottom, move back to random position at top
  if (fallingObject.y >= height) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1, 5);

    // Spicy 
    score -= 1;
  }
  // Move catcher
  if (kb.pressing("left")) {
    catcher.vel.x = -3;
  } else if (kb.pressing("right")) {
    catcher.vel.x = 3;
  } else {
    catcher.vel.x = 0;
  }

  // Stop catcher at edges of screen
  if (catcher.x < 50) {
    catcher.x = 50;
  } else if (catcher.x > 350) {
    catcher.x = 350;
  }

  // If fallingObject collides with catcher, move back to random position at top
  if (fallingObject.collides(catcher)) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1, 5);
    fallingObject.direction = "down";
    score += 1;
  }

  // Draw the score to screen
  stroke(1);
  fill(255);
  textSize(20);
  text("Score = " + score, 10, 30);

  // Medium Losing screen
  if (score < 0){
    
  background(224, 224, 224);
    // Draw sprites off of screen
  catcher.pos = { x: 600, y: -300 };
  fallingObject.pos = { x: -100, y: 0 };

  noStroke();
  fill(0);
  text("You gave in", width / 2 - 50, height / 2 - 30);
  textSize(12);
  text("Click the mouse anywhere to play again.", width / 2 - 120, height / 2);

    if (mouseIsPressed) {
      restart();
    }
    
  }

  // Spicy - Check to see if player won
  if (score == 10) {
    youWin();

    // Restart the game if player clicks the mouse
    if (mouseIsPressed) {
      restart();
    }
  }

}

/* FUNCTIONS */

// Spicy
function youWin() {
  background(224, 224, 224);

  // Draw sprites off of screen
  catcher.pos = { x: 600, y: -300 };
  fallingObject.pos = { x: -100, y: 0 };

  // Draw end of game text
  noStroke();
  textSize(20);
  fill(0);
  text("You healed!", width / 2 - 50, height / 2 - 30);
  textSize(12);
  text("Click the mouse anywhere to play again.", width / 2 - 120, height / 2);
}

// Spicy 
function restart() {
  // Reset score
  score = 0;

  // Reset sprites
  catcher.pos = { x: 200, y: 380 };
  fallingObject.y = 0;
  fallingObject.x = random(width);
  fallingObject.velocity.y = random(1, 5);
  fallingObject.direction = "down";
}
