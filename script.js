const canvas = document.getElementById('canvas1')
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

let colorchanger = 2;

let gradient = c.createRadialGradient( canvas.width / 2, canvas.height / 2, 100, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
gradient.addColorStop(0, 'red');
gradient.addColorStop(0.4, 'green');
gradient.addColorStop(0.6, 'cyan');
gradient.addColorStop(1, 'magenta');

let gradient1 = c.createLinearGradient( 0, 0, canvas.width, canvas.height );
gradient.addColorStop(0, 'red');
gradient.addColorStop(0.2, 'yellow');
gradient.addColorStop(0.4, 'green');
gradient.addColorStop(0.6, 'cyan');
gradient.addColorStop(0.8, 'blue');
gradient.addColorStop(1, 'magenta');

class Symbol{
    constructor(x, y, fontSize, canvasHeight){
        this.caracters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        this.text = '';

        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.canvasHeight = canvasHeight;
    }
    draw(context){
        this.text = this.caracters.charAt(Math.floor(Math.random() * this.caracters.length ));
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);

        if ( this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98 ){
            this.y = 0;
        }else{
            this.y += 1;
        }
    }
}

class Effect{
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.fontSize = 25;
        this.colums = this.canvasWidth / this.fontSize;
        this.symbols = new Array();
        this.#initialize();
    }
    #initialize(){
        for(let i = 0; i < this.colums; i++){
            this.symbols[i] = new Symbol( i , 0, this.fontSize, this.canvasHeight);
        }
    }
    resize( width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.colums = this.canvasWidth / this.fontSize;
        this.colums = new Array();
        this.#initialize();
    }
}

const effect = new Effect(canvas.width, canvas.height);

let lastTime = 0;
const fps = 160;
const nextFrame = 1000 / fps;
let timer = 0;

function animate(timeStamp){
    const deltatime = timeStamp - lastTime;
    lastTime = timeStamp;

    if ( timer > nextFrame ){
        c.fillStyle = 'rgba(0, 0, 0, 0.05)';
        c.textAlign = 'center';
        c.fillRect(0, 0, canvas.width, canvas.height); 
        if(colorchanger % 2 === 0){
            c.fillStyle = '#0aff0a';
        }else{
            c.fillStyle = gradient;
        }
        c.font = effect.fontSize + 'px monospace';
        effect.symbols.forEach(symbol => symbol.draw(c));
        timer = 0;
    }else{
        timer += deltatime;
    }
    
    requestAnimationFrame(animate);
}

animate(0);

window.addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    effect.resize(canvas.width, canvas.height);

    gradient1 = c.createLinearGradient( 0, 0, canvas.width, canvas.height );
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.2, 'yellow');
    gradient.addColorStop(0.4, 'green');
    gradient.addColorStop(0.6, 'cyan');
    gradient.addColorStop(0.8, 'blue');
    gradient.addColorStop(1, 'magenta');

    gradient = c.createRadialGradient( canvas.width / 2, canvas.height / 2, 100, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.4, 'green');
    gradient.addColorStop(0.6, 'cyan');
    gradient.addColorStop(1, 'magenta');
})

addEventListener('keydown', (event) => {
    if( event.keyCode == 32){
        colorchanger++;
    }
})

