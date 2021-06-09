const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

let gameOverBtn = document.getElementById('startGameBtn');
let modalEl = document.getElementById('modalEl');

let scoreEl = document.getElementById('score');
let bigscoreEl = document.getElementById('bigscore');

canvas.width = innerWidth;
canvas.height = innerHeight;

let keydown = false;
let keyup = false;
let keyw = false;
let keys = false;


document.onkeydown = function(e){
    if(e.keyCode == 40){
        keydown = true;
    }
    if(e.keyCode == 38){
        keyup = true;
    }
    if(e.keyCode == 87){
        keyw = true;
    }
    if(e.keyCode == 83){
        keys = true;
    }
}
let score = 0;

document.onkeyup = function(e){
    if(e.keyCode == 40){
        keydown = false;
    }
    if(e.keyCode == 38){
        keyup = false;
    }
    if(e.keyCode == 87){
        keyw = false;
    }
    if(e.keyCode == 83){
        keys = false;
    }
}

class Wall1 {
    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.x, this.y, this.width, this.height);
    }
    update(){
        
        this.draw();
        if(keydown && this.y < innerHeight - 80){
            this.y += 8;
        }
        if(keyup && this.y > 10){
            this.y -= 8;
        }
    }
}

class Wall2 {
    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.x, this.y, this.width, this.height);
    }
    update(){
        
        this.draw();
        if(keys && this.y < innerHeight - 80){
            this.y += 8;
        }
        if(keyw && this.y > 10){
            this.y -= 8;
        }
        
    }
}

class Ball {
    constructor(x, y, width, height, color, dx, dy){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.dx = dx;
        this.dy = dy;
    }
    draw() {
        c.beginPath();
        c.fillStyle = 'white';
        c.fillRect(this.x, this.y, this.width, this.height);
        c.closePath();
    }
    update() {
        this.draw();
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;
        if(this.y > innerHeight - 20 || this.y < 20){
            
            this.dy = -this.dy;
        }
        if(this.x > innerWidth - 20 || this.x < 20 ){
            
            modalEl.style.display = 'flex';
            bigscoreEl.innerHTML = score;
        }
    }
}
class Cball {
    constructor(x, y, width, height, color,dy){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.dy = dy;
    }
    draw() {
        c.beginPath();
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.width, this.height);
        c.closePath();
    }
    update() {
        this.draw();
        this.y = this.y + this.dy;
        if(this.y > innerHeight - 20 || this.y < 20){
            
            this.dy = -this.dy;
        }
        
    }
}




let wall1 = new Wall1(innerWidth - 150, 300, 20, 80, 'red');
let wall2 = new Wall2(150, 300, 20, 80, 'red');
let ball = new Ball(500, 300, 20, 20, 'white', 5,-5 );
let center = new Cball(canvas.width / 2, canvas.height / 2, ball.width, ball.height, ball.color, 10);
let center2 = new Cball(canvas.width / 2, center.y + 750, ball.width, ball.height, ball.color, 10);


function init() {
    ball = new Ball(500, 300, 20, 20, 'white', 6, 6);
    wall2 = new Wall2(150, 300, 20, 80, 'red');
    wall1 = new Wall1(innerWidth - 150, 300, 20, 80, 'red');
    center = new Cball(canvas.width / 2, canvas.height / 2, ball.width, ball.height, ball.color, 10);
    center2 = new Cball(canvas.width / 2, center.y + 300, ball.width, ball.height, ball.color, 10);
}
function animate() {
     requestAnimationFrame(animate);
    
    c.fillStyle = 'rgba(0, 0, 0, 0.1)';
    c.fillRect(0, 0, canvas.width, canvas.height)

    ball.update();
    center.update();
    center2.update();
    wall1.update();
    wall2.update();

    if(ball.x <= wall1.x + wall1.width && ball.x + ball.width >= wall1.x && ball.y <= wall1.y + wall1.height && ball.y + ball.height >= wall1.y){
        ball.dx = -ball.dx;
        ball.dy = -ball.dy;
        score += 50;
    }

    if(ball.x <= wall2.x + wall2.width && ball.x + ball.width >= wall2.x && ball.y <= wall2.y + wall2.height && ball.y + ball.height >= wall2.y){
        ball.dx = -ball.dx;
        ball.dy = -ball.dy;
        score += 50;
    }
    scoreEl.innerHTML = score;

    
    

    
}

gameOverBtn.addEventListener('click', () => {
    modalEl.style.display = 'none';
    init();
    animate();
})
