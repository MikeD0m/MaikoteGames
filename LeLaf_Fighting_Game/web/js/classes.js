class Sprite{
    constructor({position, imageSrc, scale =1, framesMax = 1, offset= {x: 0, y:0}}){
        this.position = position;
        this.height = 150;
        this.width = 50;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMax= framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.offset = offset;
    }
    draw(){
    c.drawImage(
        this.image,
        this.framesCurrent * (this.image.width/this.framesMax),
        0, 
        this.image.width / this.framesMax,
        this.image.height,
        this.position.x - this.offset.x, 
        this.position.y - this.offset.y, 
        (this.image.width/this.framesMax) * this.scale, 
        this.image.height * this.scale);
}
    animateFrames(){
        this.framesElapsed++;
        if(this.framesElapsed % this.framesHold === 0){
            if(this.framesCurrent < this.framesMax - 1){
                this.framesCurrent++;
                }
            else{
                this.framesCurrent = 0;
                }
        }
    }
    update(){
        this.draw()
        this.animateFrames();
        
    }

}
class Fighter extends Sprite{
    constructor({position, velocity, color = 'red', imageSrc, scale =1, framesMax = 1, sprites, offset= {x: 0, y:0}, attackBox = {offset: {}, width: undefined, height: undefined}}){
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset,
        })
        //this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.width = 50;
        this.lastKey;
        this.inAir;
        this.color = color;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height,
        }
        this.isAttacking;
        this.health = 100;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.sprites = sprites;
        this.dead = false;

        for(const sprite in this.sprites){
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imageSrc;
        }

    }
 
    update(){
        this.draw()
        if(!this.dead){
           this.animateFrames(); 
        }
        
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
        //draw attack box
        /*
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y,this.attackBox.width,this.attackBox.height);
*/
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0;
            this.inAir = false;
        }
        else{
            this.velocity.y += gravity;
            this.inAir = true;
        }
        if (this.position.x <= 0 || this.position.x + this.width >= canvas.width) {
            this.velocity.x = 0;
          }
    }
    attack(){
        this.switchSprite('attack');
        this.isAttacking = true;
    }
    getHit(){
        
        this.health -= 10;
        if(this.health <= 0){
            var audio = new Audio('ko.wav');
            audio.play();
            this.switchSprite('death');
        }
        else{
            var audio = new Audio('hit.wav');
            audio.play();
            this.switchSprite('getHit');
        }
    }
    switchSprite(sprite){
        if(this.image === this.sprites.death.image){
            if(this.framesCurrent === this.sprites.death.framesMax -1){
                this.dead = true;
            }
            
            return;
        }
        if(this.image === this.sprites.attack.image && this.framesCurrent < this.sprites.attack.framesMax-1){
            return;
        }
        if(this.image === this.sprites.getHit.image && this.framesCurrent < this.sprites.getHit.framesMax-1){
            return;
        }
        switch(sprite){
            case 'idle':
                if(this.image !== this.sprites.idle.image){
                  this.image = this.sprites.idle.image;
                  this.framesMax = this.sprites.idle.framesMax; 
                  this.framesCurrent = 0; 
                }
                
            break;
            case 'run':
                if(this.image !== this.sprites.run.image){
                    this.image = this.sprites.run.image;
                    this.framesMax = this.sprites.run.framesMax;  
                    this.framesCurrent = 0; 
                  }
            break;
            case 'jump':
                if(this.image !== this.sprites.jump.image){
                    this.image = this.sprites.jump.image;
                    this.framesMax = this.sprites.jump.framesMax; 
                    this.framesCurrent = 0;  
                  }
            break;
            case 'fall':
                if(this.image !== this.sprites.fall.image){
                    this.image = this.sprites.fall.image;
                    this.framesMax = this.sprites.fall.framesMax; 
                    this.framesCurrent = 0;  
                  }
            break;
            case 'attack':
                if(this.image !== this.sprites.attack.image){
                    this.image = this.sprites.attack.image;
                    this.framesMax = this.sprites.attack.framesMax; 
                    this.framesCurrent = 0;  
                  }
            break;
            case 'getHit':
                if(this.image !== this.sprites.getHit.image){
                    this.image = this.sprites.getHit.image;
                    this.framesMax = this.sprites.getHit.framesMax; 
                    this.framesCurrent = 0;  
                  }
            break;
            case 'death':
                if(this.image !== this.sprites.death.image){
                    this.image = this.sprites.death.image;
                    this.framesMax = this.sprites.death.framesMax; 
                    this.framesCurrent = 0;  
                  }
            break;
        }
    }
}
