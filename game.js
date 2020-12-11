class Game{
    constructor(){

    }

    getState(){
        var gs_ref=database.ref('gameState');
        gs_ref.on("value", function(data){
            gameState=data.val();
        })
    }

    update(s){
        database.ref('/').update({
            gameState: s
        });
    }

    async start(){
        if (gameState===0){
            player = new Player();
            
            var pc_ref = await database.ref('playerCount').once("value");
            if (pc_ref.exists()){
                playerCount = pc_ref.val();
                player.getCount();
            }
            
            form = new Form();
            form.display();
        }

        car1 = createSprite(100, 200);
        car1.addImage(c1);
        car2 = createSprite(300, 200);
        car2.addImage(c2);
        car3 = createSprite(500, 200);
        car3.addImage(c3);
        car4 = createSprite(700, 200);
        car4.addImage(c4);
        cars=[car1, car2, car3, car4];
    }
    
    play(){
        form.hide();

        Player.getPlayerInfo();
        player.getCarsAtEnd();

        if(allPlayers!==undefined){
            background(rgb(198,135,103));
            image(t,0,-displayHeight*4, displayWidth, displayHeight*5)
            var index = 0;
            var x = 150;
            var y
            for(var p in allPlayers){
                index=index+1;
                x=x+250
                y=displayHeight-allPlayers[p].distance;
                cars[index-1].x = x;
                cars[index-1].y = y;
                if(index === player.index){
                    stroke(10);
                    fill("lime");
                    ellipse(x,y,60,60);
                    cars[index-1].shapeColor="red"
                    camera.position.x=displayWidth/2
                    camera.position.y=cars[index-1].y
                }
            }
        }

        if (keyIsDown(UP_ARROW) && player.index!==null){
            player.distance+=50;
            player.update();
        }
        if(player.distance>4250){
            gameState=2;
            player.rank+=1;
            Player.updateCarsAtEnd(player.rank);
        }
        drawSprites();
    }
    
    end(){
        console.log("Game Over");
        console.log(player.rank);
    }
}