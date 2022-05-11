
class Ball {

    constructor(graphics) {
        this.fx = graphics;
        this.color = "#ecf0f1";
        this.pointcolor="#3cac4e";
        this.xpos = 0;
        this.ypos = 0;
        this.xvel = 0;//movement on x axis
        this.yvel = 0;//movement on y axis
        this.size = 0;
        this.point=0;//point
        this.life=-1;//life
        this.pypos=0;//point and life
        this.pxpos=0;//point and life
    }

    init() {
        this.size = this.fx.height() * 0.03;
        this.xpos = this.fx.width()/2 - this.size/2;
        this.ypos = this.fx.height()/2 - this.size/2;
        this.yvel = this.fx.width() * 0.005;//for movement
        this.xvel = 0;//for movement
        this.pypos = this.fx.height()*0.96;
        this.pxpos = this.fx.width()/25;
    }

    getlife(){return this.life;}
    setlife(newlife){this.life=newlife;}
    getpoint(){return this.point;}
    setpoint(newpoint){this.point=newpoint;}
    
    //if(info=game.getdie_on()=="off"){this.life=-1;}
    //else if(info=game.getdie_on()=="on"){this.life=5;}

    reset() {
        this.init();
    }

    draw() {
        this.fx.drawCircle(this.xpos,this.ypos, this.size,this.size, this.color);
        //this.fx.drawRect(this.xpos,this.ypos, this.size,this.size, this.color);
        this.fx.drawPoint(this.pxpos,this.pypos,this.pointcolor,this.point);
        if(this.life>0){//normal mode but still have life 
            this.fx.drawLife(this.pxpos+200,this.pypos,this.pointcolor,this.life);
            this.showlastpoint();
        }
        if(this.life==0){//normal mode but out of life so restart the game
            this.showlastpoint();
            this.life=5;
            this.point=0;
        }
        if(this.life<0){//for other than normal mode
            this.showlastpoint();
        }
        
    }

    move() {
        this.xpos += this.xvel;
        this.ypos += this.yvel;
    }

    collisions(paddle,bricks) {
        this.checkForPaddleCollisions(paddle);
        this.checkForPerimeterCollisions();
        this.checkForBrickCollisions(bricks);
    }

    checkForPaddleCollisions(paddle) {
        if ( this.checkForCollisions(paddle,this) ) {
            let centerOfPaddleX = paddle.xpos + paddle.width/2;
            let ballDistFromPaddleCenterX = this.xpos - centerOfPaddleX;
            this.xvel = ballDistFromPaddleCenterX * 0.05;
            this.yvel *= -1;
        }
    }

    checkForPerimeterCollisions() {
        if ( this.ypos < 0 ) {
            this.yvel = -this.yvel;
        }
        if ( this.ypos > this.fx.height() ) {
            this.reset();
            this.life=this.life-1;
            
        }
        if ( this.xpos < 0 || this.xpos > this.fx.width() - this.size) {
            this.xvel = -this.xvel;
        }
    }

    checkForCollisions(a,b) {

        let aLeftOfB = ( a.xpos + a.width ) < ( b.xpos );
        let aRightOfB = ( a.xpos ) > ( b.xpos + b.size );
        let aAboveB = ( a.ypos ) > ( b.ypos + b.size );
        let aBelowB = ( a.ypos + a.height ) < ( b.ypos );

        return !( aLeftOfB || aRightOfB || aAboveB || aBelowB );
    }

    checkForBrickCollisions(bricks) {

        let ballBrickCol = Math.floor((this.xpos + this.size/2)/bricks.brickWidth);
        let ballBrickRow = Math.floor((this.ypos + this.size/2)/bricks.brickHeight);
        let brickIndexUnderBall = bricks.rowColToArray(ballBrickCol,ballBrickRow);

        if ( ballBrickCol >= 0
            && ballBrickCol < bricks.columns
            && ballBrickRow >= 0
            && ballBrickRow < bricks.rows ) {
                
            if ( bricks.isBrickAtColRow(ballBrickCol,ballBrickRow) ) {
                bricks.grid[brickIndexUnderBall] = false;
                bricks.liveBricks--;

                let prevBallX = this.xpos - this.xvel;
                let prevBallY = this.ypos - this.yvel;
                let prevBrickCol = Math.floor(prevBallX / bricks.brickWidth);
                let prevBrickRow = Math.floor(prevBallY / bricks.brickHeight);
                let bothTestsFailed = true;
                this.point=this.point+10;
                if ( prevBrickCol != ballBrickCol ) {
                    if ( bricks.isBrickAtColRow(prevBrickCol,ballBrickCol) == false ) {
                        this.xvel *= -1;
                        bothTestsFailed = false;   
                    }
                }
                if ( prevBrickRow != ballBrickRow ) {
                    if ( bricks.isBrickAtColRow(prevBrickRow,ballBrickRow) == false ) {
                        this.yvel *= -1;
                        bothTestsFailed = false;
                    }
                }
                if ( bothTestsFailed ) {
                    this.xvel *= -1;
                    this.yvel *= -1;
                }
            }
        }
    }
    
    showlastpoint(){
        let lastpoint=document.getElementById("lastpoint");
        lastpoint.innerHTML="your point: "+this.point;
    }
}
