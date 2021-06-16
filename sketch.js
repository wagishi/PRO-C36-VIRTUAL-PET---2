//Create variables here
var database ;
var dog;
var dogImage;
var happyDog;
var happydogImage;
var feed;
var foodStock;
var foodS;
var buttons;
var lastfeed,feedTime;
var foodObj;

function preload()
{
	//load images here
  dogImage = loadImage("images/dogImg.png");
  happydogImage = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(1300, 600);

  database = firebase.database();
  foodStock = database.ref('food')
  foodStock.on("value",readStock);
  foodStock.set(20);
 
  dog = createSprite(1000,300,10,10);
  dog.addImage(dogImage)
  dog.scale=0.2

  foodObj = new Food();

  feed = createButton("FEED TOMMY");
  feed.position(500,15);
  feed.mousePressed(FeedDog);

  add = createButton("ADD FOOD");
  add.position(400,15);
  add.mousePressed(AddFood);
}

function draw() {  
  background(46, 139, 87);

  feedTime = database.ref("feedTime");
  feedTime.on("value",function(data){
    lastfeed = data.val();
  });

  if(foodS!==undefined){
    fill("black");
  textSize(25);
  text("food Available:" + foodS,100,100);
  
   foodObj.display();
  
   if(foodS === 0){
     foodS = 20;
   }

    }
    
   fill (225,225,254);
   textSize(20);
   if(lastfeed >= 12){
     text("Last Feed : "+lastfeed%12 + "PM",50,50);
  }else if (lastfeed==0){
    text("Last Feed : 12 AM"+ lastfeed ,50,50);
  }else{
    text("Last Feed : "+ "AM",50,50)
  }

drawSprites();

}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x){
  if(x <= 0){
    x = 0
  }
  else{
    x = x - 1 
  }
  database.ref('/').update(
    {
      food:x
    }
  )
}

function AddFood(){
  foodS++;
  database.ref("/").update({
    food:foodS
  })
}

function FeedDog(){
  dog.addImage(happydogImage);
  
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}



