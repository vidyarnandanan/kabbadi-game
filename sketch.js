// add your code herevar player1,player1image,player1image2
var player2,player2image,player2image2
var database,position
var gamestate=0
var rand=0
var player1score=0
var player2score=0
var restart,restartimg
var restart
function preload(){

   player1image=loadAnimation("assests/player1a.png","assests/player1b.png","assests/player1a.png")

player2image=loadAnimation("assests/player2a.png","assests/player2b.png","assests/player2a.png")
restartimg=loadImage("assests/restart.png")

}
function setup(){
createCanvas(400,400)
database = firebase.database()
    player1=createSprite(100,10,20,20)
    player1.shapeColor="red"
    player2=createSprite(300,10,20,20)
    player2.shapeColor="yellow"
 player1.addAnimation("imagea",player1image)
 player1.scale=0.5
player2.addAnimation("imageb",player2image)
player2.scale=-0.5

   var locofplayer1=database.ref("player1/position")
locofplayer1.on("value",readop1)

var locofplayer2=database.ref("player2/position")
locofplayer2.on("value",readop2)

var game=database.ref("gamestate")
game.on("value",readgamestate)


var player1score=database.ref("player1score")
player1score.on("value",readplayer1score)

var player2score=database.ref("player2score")
player2score.on("value",readplayer2score)


}

function draw(){
    background('white')
    console.log(gamestate)
    

    if(rand===1){
        //alert("red")
       
database.ref("/").update({
    gamestate:1 
})
    }
if (gamestate===1){
    fill ("black")
        text("red",200,200)
    if (keyDown("w")){
        writeposition2(0,-1)
        }
        if (keyDown("s")){
            writeposition2(0,1)
            }
            if (keyDown("d")){
                writeposition2(0,0)
                }
                if (keyDown("a")){
                    writeposition2(0,0)
                    }
                    if (keyDown("up")){
                        writeposition1(0,-1)
                        }
                        if (keyDown("down")){
                            writeposition1(0,1)
                        }
                            if (keyDown("right")){
                                writeposition1(1,0)
                            }
                                if (keyDown("left")){
                                    writeposition1(-1,0)
                                }

                             

}





        if(rand===2){
           
            database.ref("/").update({
                gamestate:2
            }) 
            
           //alert("yellow")
        }
            if(gamestate===2){
                fill ("black")
                                            
                text("yellow",200,200) 
                if (keyDown("w")){
                    writeposition2(0,-1)
                    }
                    if (keyDown("s")){
                        writeposition2(0,1)
                        }
                        if (keyDown("d")){
                            writeposition2(1,0)
                            }
                            if (keyDown("a")){
                                writeposition2(-1,0)
                                }
                                if (keyDown("up")){
                                    writeposition1(0,-1)
                                    }
                                    if (keyDown("down")){
                                        writeposition1(0,1)
                                    }
                                        if (keyDown("right")){
                                            writeposition1(0,0)
                                        }
                                            if (keyDown("left")){
                                                writeposition1(0,0)
                                            }
             
            }
          
        

      
       
         

    if(player1.x>=300){
    
                                            
      
        database.ref("/").update({
            player1score:player1score+5
        }) 
        database.ref("player1/position").set({
            x:100,
            y:200
            
                })


rand=2
                  
    }
    fill ("black")
    textSize(20)
    text("red:"+player1score,80,20)   
    
    if(player2.x<=100){

        database.ref("/").update({
            player2score:player2score+5
        }) 
        database.ref("player2/position").set({
            x:300,
            y:200
            
                })
               
         rand=1  

    }

    textSize(20)
    fill ("black")
    text("yellow:"+player2score,280,20)      
        
    
    if (player1score===10||player2score===10){

        database.ref("/").update({
            gamestate:0
        }) 
        if(player1score > player2score){
            textSize(20)
            fill ("black")
        text("RED WINS",150,150)

        rand=0 
        }
        
       if(player2score > player1score) {

        fill ("black")
        text("YELLOW WINS",150,150)
        rand=0 
      }     
      fill ("black")     
   
text("gameover",150,200)
 restart= createSprite(200,300)

//restart.addImage(restartimg)
fill ("black")
text("clickhere to RESTART",150,300)
restart.scale=0.5
restart.visible = false
if(mousePressedOver (restart)){
   
    database.ref("/").update({
        player2score:0
    }) 

    database.ref("/").update({
        player1score:0
    }) 
   

   

}


    }



    push ()
    stroke("black")
for (i=0;i<400;i=i+20){
    line (200,i,200,i+10)
}
pop ()

push ()
stroke("red")
for (i=0;i<400;i=i+20){
    line (300,i,300,i+10)
}
pop()

push()
stroke("yellow")
for (i=0;i<400;i=i+20){
    line (100,i,100,i+10)
}
pop()





    drawSprites ()
}

function writeposition1 (x,y){
    database.ref("player1/position").set({
x:player1.x+x,
y:player1.y+y

    })

    
    
    }
    function writeposition2 (x,y){
        database.ref("player2/position").set({
    x:player2.x+x,
    y:player2.y+y
    
        })
    
        
        
        }
        function readop1(data){
position=data.val()
player1.x=position.x
player1.y=position.y

        }
        function readop2(data){
            position=data.val()
            player2.x=position.x
            player2.y=position.y
            
                    }
     function readgamestate(data){
     gamestate=data.val()

    }
    function readplayer1score(data){
        player1score=data.val()
   
       }
       function readplayer2score(data){
        player2score=data.val()
   
       }
       function keyPressed(){

        if(keyCode===32){
            rand=Math.round(random(1,2))
        
        }

       } 