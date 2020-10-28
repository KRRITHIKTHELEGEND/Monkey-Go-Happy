var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score = 0;
var ground;

function preload(){
  monkey_running =          loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bananaGroup = new Group();
  obstacleGroup = new Group();
}
function setup() {
  createCanvas(500,500);
  monkey = createSprite(60,350,0,0);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.175;
  ground = createSprite(250,440,1000,200);
}
function draw() {
  background("lightgreen");
  if (gameState === PLAY){
  spawnObstacles();
  spawnBananas();
  ground.velocityX = -3;
  if (ground.x < 0)  {
    ground.x = 250;
  }
  if (keyDown("SPACE")){
    monkey.velocityY = -13;
  }
  monkey.velocityY = monkey.velocityY + 0.75;
  monkey.collide(ground);
  score = Math.ceil(frameCount/frameRate());
  textSize(20);
  textFont()
  text("SuRvIvAl tImE : "+ score, 190,20);
  if (obstacleGroup.isTouching(monkey)){
    gameState = END;
  }
  }
  else if (gameState === END) {
    monkey.velocityY = 0;
    ground.velocityX = 0;
    bananaGroup.setVelocityXEach = 0;
    obstacleGroup.setVelocityXEach = 0;
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    monkey.velocityY = monkey.velocityY + 0.75;
    monkey.collide(ground);
  }
  //monkey.velocityY = monkey.velocityY + 0.75;
  drawSprites();
}
function spawnObstacles() {
  if (frameCount % 222 === 0) {
    obstacle = createSprite(510,335,0,0);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = random(0.25,0.35);
    obstacle.velocityX = -5;
    obstacleGroup.add(obstacle);
  }
}
function spawnBananas() {
  if (frameCount % 321 === 0) {
    banana = createSprite(510,random(150,250),0,0);
    banana.addImage("banana", bananaImage);
    banana.scale = random(0.15,0.150);
    banana.velocityX = -5.5;
    bananaGroup.add(banana);
    monkey.depth = banana.depth - 1;
  }
}


