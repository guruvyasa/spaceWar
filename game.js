// import Game from "Game";
window.onload = function(){
    class Bullet{
        constructor(angle, x, y){
            this.width = 30;
            this.height = 10;
            this.speed = 20;
            this.blasted=false;

            this.angle=angle - Math.PI/2;
            this.position = {x:x, y:y};
        }
        move(){
            // this.angle += 0.2;
            this.position.x += this.speed * Math.cos(this.angle);
            this.position.y += this.speed * Math.sin(this.angle);

        }

        draw(ctx){
            ctx.save();
            ctx.translate(this.position.x, this.position.y);
            ctx.rotate(this.angle);
            ctx.fillStyle = "#00ff00";
            ctx.fillRect(-this.width/2, 
                -this.height/2,
                this.width,
                this.height)
            ctx.restore();
        }
    }

    class Asteroid{
        constructor(){
            this.width = 150;
            this.height = 150;
            this.speed = 3;
            this.angle=0;
            this.position = {x:100, y:0};
            this.blasted=false;
            this.position.x = Math.floor(Math.random()*1000)%1000;
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
            this.angle=0;//Math.PI/2;
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
            this.asteroids = [];
            this.bullets = [];
            this.spaceShip = new SpaceShip();
            this.initEventHandlers();
        }

        handleBulletAsteroidCollision(){
            this.bullets.map((bullet)=>{
                this.asteroids.forEach((asteroid)=>{
                    let x = bullet.width/2 +bullet.position.x + Math.cos(bullet.angle);
                    let y = bullet.height/2 +bullet.position.y + Math.cos(bullet.angle);
                    let distance = (Math.sqrt((x-asteroid.position.x)**2 + (y-asteroid.position.y)**2));
                    if(distance <= asteroid.width/2 || distance < asteroid.height/2)
                    {
                        asteroid.blasted = true;
                        bullet.blasted = true;
                    }
                })
            })
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
            // console.log(this.bullets);
            requestAnimationFrame(()=>this.update());
            this.handleBulletAsteroidCollision();

            if (this.asteroids.length < 2)
                this.asteroids.push(new Asteroid());
            this.ctx.clearRect(0,0,600,600);
            this.spaceShip.draw(this.ctx);
            this.asteroids = this.asteroids.filter((asteroid)=>!asteroid.blasted);
            this.bullets = this.bullets.filter((bullet)=>!bullet.blasted);

            this.asteroids.forEach((asteroid)=>{
                                asteroid.move();
                                asteroid.draw(this.ctx);
            });
            this.bullets.forEach((bullet)=>{
                bullet.move();
                bullet.draw(this.ctx);
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
                else if(e.key == 'f'){
                    console.log(e.key);
                    let bullet = new Bullet(this.spaceShip.angle,
                                            this.spaceShip.position.x,
                                            this.spaceShip.position.y);
                    this.bullets.push(bullet);
                    console.log(this.bullets);
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