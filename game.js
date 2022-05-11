
let fx;
let loop;
let fps = 1000/90;
let paddle;
let ball;
let bricks;
let movement_type;
window.onload = function() {
    fx = new Fx('canvas');
    paddle = new Paddle(fx);
    ball = new Ball(fx);
    bricks = new Bricks(fx);
    addEventListener('mousemove', mouseMove);
}

window.onresize = function() {
    init();
}

function init() {
    fx.setCanvasToPageSize();
    bricks.init();
    paddle.init();
    ball.init();
}

function start() {
    init();
    loop = setInterval(update,fps);
}

function update() {
    move();
    draw();
}

function draw() {
    fx.fillCanvas("#2c3e50");
    bricks.draw();
    ball.draw();
    paddle.draw();
}

function move() {
    ball.move();
    ball.collisions(paddle,bricks);
    if ( bricks.isBrickCountZero()) {//breaking all bricks ending
        gameOver();
    }
    if(ball.getlife()==0){//out off life ending
        gameOver();
        //ball.setlife(ball.getlife()+5);
    }
}

function mouseMove(event) {
    if (movement_type=="fun"){
    paddle.FunmoveWithMouse(event);
    }
    paddle.moveWithMouse(event);
}

function startGame() {
    let startDiv = document.getElementById('start');
    let gameCanvas = document.getElementById('canvas');
    let gameOver = document.getElementById('game-over');
    startDiv.style.display = 'none';
    gameCanvas.style.display = 'block';
    gameOver.style.display = 'none';
    start();
}

function LifestartGame() {
    let startDiv = document.getElementById('start');
    let gameCanvas = document.getElementById('canvas');
    let gameOver = document.getElementById('game-over');
    startDiv.style.display = 'none';
    gameCanvas.style.display = 'block';
    gameOver.style.display = 'none';
    let life=ball.getlife();
    life=5;
    ball.setlife(life);
    start();
}

function FunModeGame() {
    let startDiv = document.getElementById('start');
    let gameCanvas = document.getElementById('canvas');
    let gameOver = document.getElementById('game-over');
    startDiv.style.display = 'none';
    gameCanvas.style.display = 'block';
    gameOver.style.display = 'none';
    start();
    movement_type="fun";

}

function gameOver() {

    let startDiv = document.getElementById('start');
    let gameCanvas = document.getElementById('canvas');
    let gameOver = document.getElementById('game-over');
    startDiv.style.display = 'none';
    gameCanvas.style.display = 'none';
    gameOver.style.display = 'block';
    bricks.reset();
    ball.reset();
    //paddle.reset();
    clearInterval(loop);
}


