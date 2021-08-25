var bg;
var ground;
var tomImg, tom,jerryImg, jerry;
var cheeseImg;
var cheeseGroup;
var mouseTrapImg;
var resetImg;
var invisibleGround;
var mouseTrapGroup;
var score=0;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameOverImg;
var gameOver;
var reset;
var happyTomImg,angryJerryImg;

function preload(){
   bg=loadImage("bg.jpg");
   tomImg=loadAnimation("tom1.png","tom2.png","tom3.png","tom4.png");
   jerryImg=loadAnimation("jerry1.png","jerry2.png","jerry3.png","jerry4.png");
   cheeseImg=loadImage("cheese.png");
   mouseTrapImg=loadImage("mouseTrap.png");
   resetImg=loadImage("reset.png");
   gameOverImg=loadImage("gameOver.png");
   happyTomImg=loadImage("happy_tom.png");
   angryJerryImg=loadImage("angry_jerry.png");
}

function setup(){
    createCanvas(600,500);
    
    ground = createSprite(300,120,600,20);
    ground.addImage(bg);
    ground.x=ground.width/2;
    ground.scale=2;
    
    invisibleGround =  createSprite(300,400,600,20);
    invisibleGround.visible=false;

    tom= createSprite(50,350,50,50);
    tom.addAnimation("tom_running",tomImg);
    tom.scale=2;
    //tom.debug=true;
    tom.setCollider("rectangle",0,-5,100,tom.height);
    tom.addAnimation("happytom",happyTomImg);

    jerry= createSprite(120,350,50,50);
    jerry.addAnimation("jerry_running",jerryImg);
    jerry.addAnimation("angryjerry",angryJerryImg);
    gameOver=createSprite(280,250,20,20);
    gameOver.addImage(gameOverImg);
    gameOver.scale=0.09;
    gameOver.visible=false;

    reset=createSprite(400,250,20,20);
    reset.addImage(resetImg);
    reset.scale=0.3;
    reset.visible=false;

    cheeseGroup = new Group();
    mouseTrapGroup = new Group();
}

function draw(){
    background(255);
    textSize(20);
    fill("black");
    text("Score : "+score,50,50);

    if(gameState===PLAY){
    ground.velocityX= -3;
    if(ground.x<0){
      ground.x=ground.width/2;
    }
    if(keyDown("SPACE")){
      jerry.velocityY=-4;
    }
    jerry.velocityY+=0.5;
    
    if(jerry.isTouching(cheeseGroup)){
      score+=1;
      cheeseGroup.destroyEach();
    }
    if(jerry.isTouching(mouseTrapGroup)){
      gameState=END;
    }
    if(tom.isTouching(mouseTrapGroup)){
      tom.velocityY=-5;
    }
    tom.velocityY+=0.5;
    spawnCheese();
    spawnMouseTrap();
  }
    if(gameState===END){
      ground.velocityX=0;
      cheeseGroup.setVelocityXEach(0);
      mouseTrapGroup.setVelocityXEach(0);
      cheeseGroup.setLifetimeEach(-1);
      mouseTrapGroup.setLifetimeEach(-1);
      tom.velocityY=0;
      
      gameOver.visible=true;
      reset.visible=true;

      tom.changeAnimation("happytom",happyTomImg);
      tom.scale=0.15;
      jerry.changeAnimation("angryjerry",angryJerryImg);
      jerry.scale=0.15;
      if(mousePressedOver(reset)){
        restart();
      }
    }
    jerry.collide(invisibleGround);
    tom.collide(invisibleGround);
    drawSprites();
}

function spawnCheese(){
  if(frameCount%250===0){
    var cheese = createSprite(600,250,50,50);
    cheese.addImage(cheeseImg);
    cheese.velocityX=-2;
    cheese.scale=0.08;
    cheese.lifetime=300;

    cheeseGroup.add(cheese);
  }
}
function spawnMouseTrap(){
  if(frameCount%280===0){
    var mouseTrap = createSprite(600,350,50,50);
    mouseTrap.addImage(mouseTrapImg);
    mouseTrap.velocityX=-2;
    mouseTrap.scale=0.3;
    mouseTrap.lifetime=300;

    mouseTrapGroup.add(mouseTrap);
  }
}
function restart(){
  gameState=PLAY;
  reset.visible=false;
  gameOver.visible=false;
   mouseTrapGroup.destroyEach();
   cheeseGroup.destroyEach();
   tom.changeAnimation("tom_running",tomImg);
   tom.scale=2;
  jerry.changeAnimation("jerry_running",jerryImg);
  jerry.scale=0.9;
}