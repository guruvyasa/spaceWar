class Game{
    contructor(){
        this.stopped = true;
    }

    drawStartScreen(ctx){
        if(this.stopped){
            ctx.save();
            ctx.fillStyle = "#ffffff";
            ctx.font = "30px Arial";
            ctx.drawText("Press spacebar to start...",300,300);
            ctx.restore();
        }
    }
    
}
export default Game;