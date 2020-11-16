var SERVE = 2;
var PLAY = 1;
var END =0;
var gameState = SERVE


var podium

var person

var obstacle1
var obstacle2
var img, img1, img2, img3
var restart

function preload(){
  img = loadImage("carimage1.png")
  img1 = loadImage("restart.png")
  img2 = loadImage("flag.png")
  img3 = loadImage("flag.png")
}
 

 function setup(){

   createCanvas(windowWidth, windowHeight)

  podium =createSprite(200,289,180,19)
  sprite1 = createSprite(123,278,5,15)
  sprite2 = createSprite(302,278,5,15)

 obstacle1 = createSprite(35,128,600,19)
 obstacle2 = createSprite(900,128,600,19)

 //invobstacle1 = createSprite(58,120,700,19)
 //invobstacle2 = createSprite(900,120,700,19)
 //invobstacle1.visible = false
 //invobstacle2.visible = false

 person = createSprite(28,100,15,15)

 restart = createSprite(200,340,15,15)

 person.setCollider("circle",0,0,20)

 podium.shapeColor=("yellow")
 obstacle2.debug = true
 obstacle1.debug = true

person.addImage("running",img) 
person.scale =(0.1)
restart.addImage("button",img1)
restart.scale = (0.2)
sprite1.addImage("sprite",img2)
sprite1.scale=(0.09)
sprite2.addImage("sprite",img3)
sprite2.scale= (0.09)


 }

function draw() {
  background("white")
  sprite1.x = podium.x-77
  sprite2.x = podium.x+102
  
if(gameState === SERVE){
  textSize(18)
  text("Hello! Press the Spacebar to move the Obstacles",5,200)
  text("Use the arrow key to move the car so that it reaches the podium!", 04,220)
  
  restart.visible = false;
}
if(keyDown("space") && gameState == SERVE){
gameState = PLAY
}

 if(gameState === PLAY){
   
   if(obstacle1.x < -9){
   obstacle1.velocityX = (16 );
   obstacle2.velocityX = (16);
 }
   
   if(obstacle2.x > windowWidth){
     obstacle1.velocityX = -(16);
   obstacle2.velocityX = -(16);
   }
   
   if(podium.x < -9){
    podium.velocityX = (19);
  }

    if(podium.x > windowWidth){
      podium.velocityX = -(19);
   }
   
   if(touches.length > 0 || keyDown("space")){
  obstacle1.velocityX = -(16);
  obstacle2.velocityX = -(16);
  podium.velocityX = (19);
     touches = []
   }
  
   //console.log(obstacle1.x)

   if(keyDown("RIGHT_ARROW")){
     person.velocityX = 11;
   }
  
  if(keyWentUp("RIGHT_ARROW")){
    person.velocityX = 0;
  }

  if(keyDown("LEFT_ARROW")){
    person.velocityX = -11;
  }
 
 if(keyWentUp("LEFT_ARROW")){
   person.velocityX = 0;
 }

if(person.collide(obstacle1)){
  if(touches.length > 0 || keyDown("UP_ARROW") && person.y >= 100 ){
    person.velocityY= -8;
    touches = []
  }
}

if(person.collide(obstacle2)){
  if(touches.length > 0 || keyDown("UP_ARROW") && person.y >= 100 ){
    person.velocityY= -8;
    touches = []
  }
}
  //console.log(person.y)


person.velocityY = person.velocityY + 0.8;
person.collide(obstacle1);
person.collide(obstacle2);

restart.visible = false;


if(person.y > windowHeight){
  textSize(20)
  text("Ohh, Bad Luck. Better luck next time!", 20,200)
  obstacle1.velocityX = 0
  obstacle2.velocityX = 0
  podium.velocityX  = 0
  person.velocityY = 0
  restart.visible= true;
}
if(mousePressedOver(restart)) {
  reset();
}

if(person.isTouching(podium)){
  gameState=(END)
}

}

if(gameState === END ){
  textSize(19) 
  text("CONGRATULATIONS, You have completed and mastered the game!!",5,200)
  obstacle1.velocityX = 0
  obstacle2.velocityX = 0
  person.collide(podium);
  podium.velocityX  = 0
  restart.visible = true;
  if(mousePressedOver(restart)) {
    reset();
  }
}


  console.log(gameState)
  
  drawSprites()
}

function reset(){
  gameState = SERVE;
  restart.visible = false;
  person.collide(obstacle1)
  person.x = 28;
  person.y = 80;
  person.velocityX=0;
  obstacle1.x = 35
  obstacle2.x = 900
}
