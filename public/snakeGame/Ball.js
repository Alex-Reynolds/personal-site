export function Ball(xpos, ypos) {
    this.xpos = xpos;
    this.ypos = ypos;
  
    this.hiddenMessage = "using this for an example";
    this.diameter = 25;
    this.width = this.diameter;
    this.height = this.diameter;
    this.xvector = 0;
    this.yvector = 0;
    this.speed = 8;
    
    this.updateVectors = function(goalx, goaly) {
        this.xvector = goalx - this.xpos;
        this.yvector = goaly - this.ypos;
        let magnitude = Math.sqrt((this.xvector*this.xvector)+(this.yvector*this.yvector));
        if(magnitude > this.speed){
            let scaler = this.speed/magnitude;
            this.xvector *= scaler;
            this.yvector *= scaler;
        }
    };

    this.updateBodyPosition = function(goalx, goaly){
        this.xvector = goalx - this.xpos;
        this.yvector = goaly - this.ypos;
        let magnitude = Math.sqrt((this.xvector*this.xvector)+(this.yvector*this.yvector));
        if(magnitude > this.diameter/4){
            this.xpos = goalx;
            this.ypos = goaly;
            return true;
        }
        return false;
    }
  
    this.setPos = function(xpos, ypos) {//forgot to even use. setters and getters are used in other languages and can help with organization on large projects
      this.xpos = xpos;
      this.ypos = ypos;
    };
  
    this.updatePosWithVectors = function() {
      this.xpos = this.xpos + this.xvector;
      this.ypos = this.ypos + this.yvector;
    };

    this.printSelf = function(){
        //console.log("printing self");
        ellipse(this.xpos, this.ypos, this.width, this.height);
    };
    
  }
  