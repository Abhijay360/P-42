var backImage,backgr;
var player, player_running;
var ground,ground_img;
var foodgrp, obsgrp
var score;
//var gameOver, gameOverImage;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  gameOverImage = loadImage("gameOver.png");

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;

  foodgrp=new Group();
  obsgrp=new Group();
  gameOvergrp=new Group();

  score=0;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }

  spawnFood();
  spawnobstacles();


  if(foodgrp.isTouching(player)){
    foodgrp.destroyEach();
    score=score+2
    player.scale += +0.1
  }

  if(obsgrp.isTouching(player)){
    gameState = END;
  }
 
  else if(gameState === END){
   backgr.velocityX = 0;
   player.visible = false;

   foodgrp.destroyEach();
   obsgrp.destroyEach();
   
   var gameOver = createSprite(330,220,40,20)
   gameOver.addImage(gameOverImage);
   gameOvergrp.add(gameOver);
   //stroke("white");
   //textSize(30);
   //fill("white");
   //text("Game Over!", 300,220);
 }
      
    

  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("score: "+score,500,50)
}

function spawnFood(){
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX= -4;

    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    foodgrp.add(banana);
    
  }
}

function spawnobstacles(){
  if(frameCount%300===0){
    obs=createSprite(700,340,10,40);
    
    obs.velocityX=-4;
    obs.addImage(obstacleImage);
    obs.scale=0.15;
    obs.lifetime=200;
    obsgrp.add(obs);
  }
}

