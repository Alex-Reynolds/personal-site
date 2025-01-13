import { Ball } from './Ball.js';

export function Snake() {
    this.queue = [new Ball(200,200)];
    this.food = new Ball(300,300);
    this.addLength = function(length) {
        for (let x = 0; x < length; x++) {
            this.queue.push(new Ball(this.queue[this.queue.length-1].xpos, this.queue[this.queue.length-1].ypos));
            console.log(this.queue);
        }
    };

    this.printBody = function() {
        for (let x = 0; x < this.queue.length; x++) {
            // Functionality can be added here
            //console.log("snake at " + x + " is valued " + this.queue[x]);
            this.queue[x].printSelf();
        }
    };

    this.updateSnake = function(x , y) {
        let curx = this.queue[0].xpos;
        let cury = this.queue[0].ypos;
        this.queue[0].updateVectors(x, y);
        this.queue[0].updatePosWithVectors();
        for (let x = 1; x < this.queue.length; x++) {
            // Functionality can be added here
            //console.log("snake at " + x + " is valued " + this.queue[x]);
            let nextx = this.queue[x].xpos;
            let nexty = this.queue[x].ypos;
            this.queue[x].updateVectors(curx, cury);
            this.queue[x].updatePosWithVectors();
            curx = nextx;
            cury = nexty;
        }
    };

    this.spawnFood = function(){//good code practice would be to pass in current rgb for fill but i am lazy
        this.food.xpos = Math.random()*400;
        this.food.ypos = Math.random()*400;
    };

    this.renderFood = function(){
        fill(0,100,0);
        this.food.printSelf();
        fill(60, 60, 60);
    };

    this.checkSelfEat = function(){
        if(this.queue.length > 8){
            for (let x = 7; x < this.queue.length; x++) {
                let xvector = this.queue[x].xpos - this.queue[0].xpos;
                let yvector = this.queue[x].ypos - this.queue[0].ypos;
                let magnitude = Math.sqrt((xvector*xvector)+(yvector*yvector));
                if(magnitude < this.queue[0].diameter/2){
                    return true;
                }
            }
        }
        return false;
    }

    this.checkOutOfBounds = function(){
    }

    this.attemptEat = function(){
        let headx = this.queue[0].xpos;
        let heady = this.queue[0].ypos;
        let xdistance = this.food.xpos - headx;
        let ydistance = this.food.ypos - heady;
        let distance = Math.sqrt((xdistance*xdistance)+(ydistance*ydistance));
        let eatDist = (this.food.diameter+this.queue[0].diameter)/2;
        if(distance <= eatDist){
            this.spawnFood();
            this.addLength(10);
        }
    };
}
