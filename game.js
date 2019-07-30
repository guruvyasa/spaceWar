// import Game from "Game";
window.onload = function(){
    console.log("hello");
    class Game{
        constructor(){
            this.stopped = true;
        }
    
        drawStartScreen(ctx){
            console.log(this.stopped);
            if(this.stopped){
                ctx.save();
                ctx.translate(300,300);
                ctx.fillStyle = "#fff";
                ctx.font = '48px serif';
                
                ctx.fillText("Press spacebar to start...",-200,0);
                ctx.restore();
            }
        }
        
    }
    let ctx = document.querySelector("#gameScreen").getContext("2d");
    // console.log(ctx);
    // ctx.fillRect(200,200,200,100);
    let game = new Game();
    game.drawStartScreen(ctx);
}