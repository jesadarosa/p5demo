
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
  createCanvas(windowWidth, windowHeight);
  
  // Resize images
  backgroundImg.resize(windowWidth, windowHeight);
  catcherImg.resize(500, 0); // Adjust the width of the catcher image
  fallingObjectImg.resize(300, 0); // Adjust the width of the falling object image
  
  //Calculate initial positions
  let catcherX = windowWidth / 2; // Center the catcher horizontally
  let catcherY = windowHeight - catcherImg.height; // Place the catcher at the bottom of the window
  let fallingObjectX = random(windowWidth); // Randomize the falling object's initial X position
  let fallingObjectY = 0; // Start the falling object at the top of the window

  //Create catcher 
  catcher = new Sprite(catcherImg, catcherX, catcherY, "k");

  //Create falling object
  fallingObject = new Sprite(fallingObjectImg, fallingObjectX, fallingObjectY);
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
    fallingObject.velocity.y = random(1, 5);

    // Spicy 
    score -= 1;
  }
  // Move catcher
  if (keyIsDown(LEFT_ARROW)) {
    catcher.velocity.x = -3;
  } else if (keyIsDown(RIGHT_ARROW)) {
    catcher.velocity.x = 3;
  } else {
    catcher.velocity.x = 0;
  }

  // Stop catcher at edges of screen
  catcher.position.x = constrain(catcher.position.x, 0, width - catcher.width);

  // If fallingObject collides with catcher, move back to random position at top
  if (fallingObject.collides(catcher)) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.velocity.y = random(1, 5);
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
    catcher.position.x = 600;
    catcher.position.y = -300;
    fallingObject.position.x = -100;
    fallingObject.position.y = 0;

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
  catcher.position.x = 600;
  catcher.position.y = -300;
  fallingObject.position.x = -100;
  fallingObject.position.y = 0;

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
  catcher.position.x = 200;
  catcher.position.y = 380;
  fallingObject.y = 0;
  fallingObject.x = random(width);
  fallingObject.velocity.y = random(1, 5);
  fallingObject.direction = "down";
}
