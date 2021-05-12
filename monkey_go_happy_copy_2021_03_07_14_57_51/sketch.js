var PLAY=1
var END=0
var gameState=PLAY;
var monkey , monkey_running,Ground
var banana ,bananaImage, obstacle,obstacle2,obstacle2Image, obstacle1Image
var FoodGroup, obstacleGroup
var score


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkeyCollided=loadAnimation("sprite_4.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage= loadImage("obstacle.png");
  obstacle2Image=loadImage("final.PNG")
}



function setup() {
  createCanvas(700, 300)
  
  
  Ground=createSprite(350, 240,1400, 20);
  
  Ground.x=Ground.width/2
  
  invisibleGround=createSprite(350, 240, 900, 20);
  invisibleGround.visible=false;

  monkey=createSprite(50, 210, 10, 10);
  monkey.addAnimation("run",monkey_running);
  monkey.addAnimation("stop",monkeyCollided)
  monkey.scale=0.1
  
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
  
  monkey.setCollider("circle",0,0,250);
 // monkey.debug=true
  score=0
  
  FoodGroup=new Group();
}


function draw() {
background("white");
  
  text("score"+score,500, 50)

 
  if(gameState===PLAY){
    Ground.velocityX=-10
    
    
    
     if(Ground.x<0){
    Ground.x=Ground.width/2
  }
  
  if(keyDown("space") && monkey.y>=200){
    monkey.velocityY=-10
  }
    
    if(monkey.isTouching(FoodGroup)){
      score=score+1
      FoodGroup.destroyEach();
    }
  
  monkey.velocityY=monkey.velocityY+0.5
  
    spwanFood();
    spawnobstacle();
    
    if(obstacleGroup.isTouching(monkey)){
      
      gameState=END
    }
    
  }
  else if(gameState===END){
    Ground.velocityX=0;
    monkey.velocityY=0;
    monkey.changeAnimation("stop",monkeyCollided)
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
  }
  
 
  monkey.collide(invisibleGround)
 
  
  
 
  drawSprites();
}

async function getBackgroundImage() {
  var response = await fetch(" http://worldclockapi.com/api/json/est/now");
}

if(hour >= 06 && hour <= 18){
background= "image/bg 1.png";
}else {
  background= "image/bg 2.png"
}


function spawnobstacle(){
  if(frameCount%40===0){
    var obstacles=createSprite(700, 210, 10, 10)
    
     obstacles.velocityX=-10;
    var rand=Math.round(random(1,2))
    switch(rand){
        case 1: obstacles.addImage(obstacleImage);
               break;
        case 2: obstacles.addImage(obstacle2Image);
               break;
        default : break;      
    }
       obstacles.scale=0.1
        obstacles.lifetime=400
        
        obstacleGroup.add(obstacles)
        
  }
}

function spwanFood(){
  if(frameCount%90===0){
    var bananas=createSprite(700, 130, 10, 10)
    bananas.addImage(bananaImage)
    bananas.scale=0.07
    bananas.velocityX=-7
    FoodGroup.add(bananas);
  }
} 



