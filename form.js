class Form{
    constructor(){
        this.input=createInput("Name");
        this.button=createButton("Play");
        this.greeting=createElement('h3');
        this.reset=createButton("Reset")
    }

    display(){
        var title=createElement('h2');
        title.html("Car Racing Game");
        title.position(displayWidth/2-110,0);

        this.input.position(displayWidth/2-110,displayHeight/2-80);

        this.button.position(displayWidth/2-50,displayHeight/2-50);

        this.reset.position(displayWidth-100, 20);

        this.reset.mousePressed(()=>{
            player.updateCount(0);
            game.update(0);

        })

        this.button.mousePressed(()=>{
            this.input.hide();
            this.button.hide();
            player.name=this.input.value();
            playerCount+=1;
            player.index=playerCount;
            player.update();
            player.updateCount(playerCount);
            this.greeting.html("Hello " + player.name);
            this.greeting.position(displayWidth/2-70 , displayHeight/4);
            });
    }

    hide(){
        this.greeting.hide();
        this.button.hide();
        this.input.hide();
    }
}