// import Game from "Game";
window.onload = function(){
    class Asteroid{
        constructor(){
            this.width = 150;
            this.height = 150;
            this.speed = 3;
            this.angle=0;
            this.position = {x:100, y:0};
            this.position.x = Math.floor(Math.random()*100)%600;
            this.img = new Image(this.width,this.height);
            this.img.src = "assets/spaceship.png";
        }
        move(){
            this.angle += 0.2;
            this.position.y += this.speed;
        }

        draw(ctx){
            ctx.save();
            ctx.translate(this.position.x, this.position.y);
            ctx.rotate(this.angle);
            ctx.drawImage(this.img, 
                        -this.width/2, 
                        -this.height/2, 
                         this.width,this.height);
            ctx.restore();
        }
    }
    class SpaceShip{
        constructor(){
            this.width = 100;
            this.height = 100;
            this.speed = 2;
            this.angle=0;
            this.position = {x:100, y:450};
            this.img = new Image(this.width,this.height);
            this.img.src = "assets/spaceship.png";
        }
        move(keycode){
            // console.log(keycode);
            switch(keycode){
                case 37:this.position.x -= this.speed;
                        break;
                case 38:this.position.y -= this.speed;
                        break;
                case 39:this.position.x += this.speed;
                        break;
                case 40:this.position.y += this.speed; 
                        break;
                case 74:this.angle -= 0.2;
                        break;
                case 75:this.angle += 0.2;
                        break;
            }
        }

        draw(ctx){
            ctx.save();
            ctx.translate(this.position.x, this.position.y);
            ctx.rotate(this.angle);
            ctx.drawImage(this.img, 
                        -this.width/2, 
                        -this.height/2, 
                         this.width,this.height);
            ctx.restore();
        }
    }
   
    class Game{
        constructor(ctx){
            this.stopped = true;
            this.ctx = ctx;
            this.asteroids = []
            this.spaceShip = new SpaceShip();
            this.initEventHandlers();
        }
    
        drawStartScreen(ctx){
            if(this.stopped){
                ctx.save();
                ctx.translate(300,300);
                ctx.fillStyle = "#fff";
                ctx.font = '48px serif';
                
                ctx.fillText("Press spacebar to start...",-200,0);
                ctx.restore();
            }
        }
        update(){
            
            requestAnimationFrame(()=>this.update());
            this.asteroids.push(new Asteroid());
            this.ctx.clearRect(0,0,600,600);
            this.spaceShip.draw(this.ctx);
            this.asteroids.forEach((asteroid)=>{
                                asteroid.move();
                                asteroid.draw(this.ctx);
            });

        }

        initEventHandlers(){
            //handle spacebar
            document.addEventListener('keydown',(e)=>{
                console.log(e.keyCode);
                if (e.keyCode == 32 && this.stopped){
                    this.stopped = false;
                    requestAnimationFrame(()=>this.update());
                }
                else if((e.key=='j' || e.key=='k') || (e.keyCode >= 37 && e.keyCode <= 40)
                       && !this.stopped){
                    this.spaceShip.move(e.keyCode);
                }
            })
        }
        
    }
    let ctx = document.querySelector("#gameScreen").getContext("2d");
    // console.log(ctx);
    // ctx.fillRect(200,200,200,100);
    let game = new Game(ctx);
    game.drawStartScreen(ctx);
}