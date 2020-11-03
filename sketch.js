
var monkey , monkey_running, ground;
var banana ,bananaImage, obstacle, bg,bgImg, obstacleImage
var bananaGroup, obstacleGroup, invisibleBlock;
var score=0;
var SurvivalTime=0;
var gameState="play";

function preload(){
  
  
  monkey_running =loadAnimation( "monkey.png" ,"monkey1.png" ,"monkey2.png", "monkey3.png", "monkey4.png","monkey5.png", "monkey6.png", "monkey7.png","monkey8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgImg = loadImage("bg.png");
 
}



function setup() {
  
  createCanvas(600,600)
  
  
  
  
 
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,350,900,10);
  
  
  bananaGroup = new Group();
  obstacleGroup = new Group(); 
  
}


function draw() {

  background("white");
  spawnBananas()
  spawnObstacles()
  ground.velocityX=-2;
  
 
   ground.x = ground.width/2;
  text("SurvivalTime:"+ SurvivalTime, 100, 50);
  SurvivalTime = Math.ceil(frameCount/ frameRate());
  
  text("Score:" + score, 500,50);
  //bg.velocityX=-4;
 // if(bg.x<60){
     //bg.x= bg.width/2;
     //}
  monkey.collide(ground);
  drawSprites();
  monkey.velocityY= monkey.velocityY+0.9;
 
  if(keyDown("space")){
     monkey.velocityY=-10;
     }
  if(monkey.isTouching(bananaGroup)){
     score+=2;
    bananaGroup.destroyEach();
     }
  
  if(monkey.isTouching(obstacleGroup)){
     monkey.destroy(); 
    monkey.velocityX=0;
    monkey.velocityY=0;
    gameState="end";
    reset();
     }
  if(gameState==="end"){
  text("GameOver",250,300)   
  bg = createSprite(0,0,900,900);
  bg.addImage(bgImg);
  bg.scale=0.7;
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();

     }
}
 function spawnBananas() {
   if(frameCount % 80 ===0){
      banana = createSprite(Math.round(random(100, 400 )) ,Math.round(random(120,200)));
     banana.addImage(bananaImage)
     banana.scale=0.1;
     banana.velocityX=-2;
     banana.lifetime=150; 
     bananaGroup.add(banana);
      }
   
 }

 function spawnObstacles()  {
   if(frameCount%300===0){
    obstacle = createSprite(400,310,6,6) 
    obstacle.addImage(obstacleImage)   
    obstacle.scale=0.2;
    
  //   obstacle.setCollider("rectangle",0,0,60,60);
   //  obstacle.debug=true;
    // console.log(obstacle.height)
     invisibleBlock = createSprite(400,390,50,50);
      obstacle.collide(invisibleBlock);
     invisibleBlock.visible=false;
     obstacle.velocityX=-3;
     obstacle.lifetime=300;
      monkey.depth = obstacle.depth;
      monkey.depth+=1;
     obstacleGroup.add(obstacle)
 }
 }
function reset(){
 // gameState="end";
 
  //monkey.addImage(bgImg)
  
}






