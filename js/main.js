let positions = range(50, 10, 10);

let grassImg = new Image();
grassImg.src = "./img/grass.jpg";

let meta = new Image();
meta.src = "./img/meta.png";

let asphaltImg = new Image();
asphaltImg.src = "./img/asphalt.jpg";

let cycleImg = new Image();
cycleImg.src = "./img/cycle.png";

let gamePlaying = false;

let playerNum = null;
let lapsAmount = null;

String.prototype.friendlify = function() {
    return this.replace(/ /g, "_")
}

function range(a,b,c) {
    if(!c)
        c = 1;
    if(!b)
        [b, a] = [a, 0];
        
    d = [];
    if(a < b)
        for(let i = a; i < b; i+= c)
            d.push(i)
    else
        for(let i = a; i > b; i-= c)
            d.push(i)
    return d;
}

document.addEventListener("DOMContentLoaded", () => {
    makeMenu();
})

function makeMenu(){
    document.body.innerHTML = `
        <header> 
            <section> 
                Wybierz liczbę graczy: 
                <span class="players">1</span>
                <span class="players">2</span>
                <span class="players">3</span>
                <span class="players">4</span>
            </section>
            
            <section> 
                Wybierz liczbę okrążeń: 
                <span class="laps">1</span>
                <span class="laps">2</span>
                <span class="laps">3</span>
                <span class="laps">4</span>
            </section>
        </header>

        <main></main>
        <footer>
            <button type="submit">GRAJ</button>
        </footer>
    `
    players = [];
    let colorsArr = ["cyan", "lime", "yellow", "magenta"];
    let controls = [
        {
            left: "ArrowLeft",
            right: "ArrowRight"
        }, {
            left: "a",
            right: "d"
        }, {
            left: "j",
            right: "l"
        }, {
            left: "4",
            right: "6"
        }
    ]
    for(let el of document.querySelectorAll(".players")) {
        el.addEventListener("click", function() {
            players = [];
            let main = document.querySelector("main");
            main.innerText = "";
            for(let [i, el] of range(this.innerText).entries()) {
                let playerObj = {
                    playerName: `Player ${i}`,
                    left: controls[i].left,
                    right: controls[i].right,
                    color: new Color(colorsArr[i]).hex,
                    rainbow: false
                };
                let playerCard = document.createElement("DIV");
                let name = document.createElement("input");
                let arrows = document.createElement("section");
                let left = document.createElement("input");
                let right = document.createElement("input");
                let color = document.createElement("input");

                name.value = playerObj.playerName;

                left.type = "button";
                left.value = playerObj.left;
                
                right.type = "button";
                right.value = playerObj.right;
                
                color.type = "color";
                color.value = playerObj.color;

                playerCard.style.backgroundColor = color.value;

                let func;

                name.addEventListener("input", function() {
                    playerObj.playerName = this.value;
                    players[i] = playerObj;
                })

                left.addEventListener("click", function() {
                    this.value = "...";
                    this.addEventListener('keydown', func = e => {
                        this.value = e.key;
                        playerObj.left = this.value;
                        players[i] = playerObj;
                        this.removeEventListener("keydown", func)                    
                    })                    
                })

                right.addEventListener("click", function() {
                    this.value = "...";
                    this.addEventListener('keydown', func = e => {
                        this.value = e.key;
                        playerObj.right = this.value;
                        players[i] = playerObj;
                        this.removeEventListener("keydown", func)
                    })
                })

                color.addEventListener("input", function(){
                    this.parentElement.style.backgroundColor = this.value;
                    playerObj.color = this.value;
                    players[i] = playerObj;
                })

                players[i] = playerObj;
                arrows.append(left, right);
                playerCard.append(name, arrows, color)
                main.appendChild(playerCard);
            }
        })
    }
    document.querySelector(".players").click();

    for(let el of document.querySelectorAll(".laps")) {
        el.addEventListener("click", function() {
            lapsAmount = parseInt(this.innerText);
        })
    }
    document.querySelector(".laps").click();
    console.log(lapsAmount)
    document.querySelector("button").addEventListener("click", function() {
        console.log(players)
        startGame(players);
    })
}; 

function startGame(obj) {
    canvas = document.createElement("CANVAS");
    let ctx = canvas.getContext("2d");
    canvas.id = "root";
    document.body.innerText = "";
    let logc = document.createElement("log-container");
    for(let el of obj) {
        let log = document.createElement("log-node");
        log.id = el.playerName.friendlify();
        log.style.color = el.color;
        log.style.border = "2px solid " + el.color;
        logc.appendChild(log);
    }
    document.body.appendChild(logc);
    document.body.appendChild(canvas);
    
    C_WIDTH = canvas.width = innerWidth;
    C_HEIGHT = canvas.height = innerHeight;
    logicPath(ctx, C_WIDTH, C_HEIGHT);
    setInterval(() => {
        graphicsPath(ctx, C_WIDTH, C_HEIGHT);  
    }, 2)
    gamePlaying = true;
    for (let el of obj) {
        playerNum++;
        new Player({
            left: el.left,
            right: el.right
        }, new Color(el.color), el.rainbow, el.playerName);
    }
}


function logicPath(c, cw, ch) {
    outer = new Path2D();
    outer.rect(0, 0, cw, ch);
    
    const OUTER_DISTANCE = ch / 2;

    track = new Path2D();
    track.moveTo(OUTER_DISTANCE, 0);
    track.lineTo(cw - OUTER_DISTANCE, 0);
    track.arc(cw - OUTER_DISTANCE, OUTER_DISTANCE, OUTER_DISTANCE, Math.PI + Math.PI / 2, Math.PI * 2 + Math.PI / 2);
    track.lineTo(OUTER_DISTANCE, ch);
    track.arc(OUTER_DISTANCE, ch / 2, OUTER_DISTANCE, Math.PI * 2 + Math.PI / 2, Math.PI + Math.PI / 2);

    const INNER_DISTANCE = OUTER_DISTANCE / 2;
    const PADDING = OUTER_DISTANCE - INNER_DISTANCE;

    inner = new Path2D();
    inner.moveTo(INNER_DISTANCE + PADDING, INNER_DISTANCE);
    inner.lineTo(cw - INNER_DISTANCE - PADDING, INNER_DISTANCE);
    inner.arc(cw - INNER_DISTANCE - PADDING, OUTER_DISTANCE, INNER_DISTANCE, Math.PI + Math.PI / 2, Math.PI * 2 + Math.PI / 2);
    inner.lineTo(INNER_DISTANCE + PADDING, ch - INNER_DISTANCE);
    inner.arc(INNER_DISTANCE + PADDING, OUTER_DISTANCE, INNER_DISTANCE, Math.PI * 2 + Math.PI / 2, Math.PI + Math.PI / 2);

    const ADJUST = 40;    
    full = new Path2D();
    full.rect(cw / 2 - ADJUST / 2 , ch - INNER_DISTANCE, ADJUST,INNER_DISTANCE);
    
    half = new Path2D();
    half.rect(cw / 2 - ADJUST / 2, 0, ADJUST, INNER_DISTANCE);
}

function graphicsPath(c, cw, ch) {
    c.fillRect(0, 0, C_WIDTH, C_HEIGHT)
    
    let grass = c.createPattern(grassImg, "repeat")  
    c.fillStyle = grass;
    c.lineWidth = 3;
    c.fill(outer);
    c.stroke(outer);

    let asphalt = c.createPattern(asphaltImg, "repeat");
    c.fillStyle = asphalt;
    
    c.fill(track);
    c.stroke(track);

    c.fillStyle = grass;    
    c.fill(inner);
    c.stroke(inner);

    const OUTER_DISTANCE = ch / 2;
    const INNER_DISTANCE = OUTER_DISTANCE / 2;    
    const ADJUST = 40; 
    c.drawImage(meta, cw / 2 - ADJUST / 2 , ch - INNER_DISTANCE, ADJUST,INNER_DISTANCE);    

    c.lineWidth = 4;        
}
length
class Player {
    constructor(keys, color, rainbow, name) {
        this.position = new Position(C_WIDTH / 2, C_HEIGHT - positions.shift());
        this.angle = Math.PI / 2;
        this.PERFECT_SPEED = 5;
        this.HANDLING = 0.05;
        //this.VMAX = 8;
        //this.VMIN = -2;
        this.speed = this.PERFECT_SPEED;

        this.laps = 0;

        this.madeHalf = false;
        this.key = keys;
        this.color = color;
        this.rainbow = rainbow;
        this.name = name

        this.goingLeft = false;
        this.goingRight = false;
        this.speedingUp = false;
        this.slowingDown = false;

        this.path = [];

        document.addEventListener("keydown", this.keydown.bind(this));
        document.addEventListener("keyup", this.keyup.bind(this));

        this.ctx = canvas.getContext("2d");

        requestAnimationFrame(this.go.bind(this));
    }

    go() {
        let ctx = this.ctx;
        this.logger = document.querySelector("#" + this.name.friendlify());
        let logger = this.logger;
        if(this.rainbow) this.color.rainbowify(1);
        if (this.goingLeft) this.angle += this.HANDLING;
        if (this.goingRight) this.angle -= this.HANDLING;
        this.angle %= Math.PI * 2;

        this.path.unshift([
            this.position.x +=  this.speed * Math.sin(this.angle),
            this.position.y +=  this.speed * Math.cos(this.angle)
        ])
        
        if(this.path.length > 50)
            this.path.pop();

        logger.innerText = `${this.name}\nOkrążenia: ${this.laps}\nPozostało: ${lapsAmount - this.laps}`;

        for(let el in this.path) {     
            ctx.beginPath();
            if(this.path[el - 1])
                ctx.moveTo(this.path[el - 1][0], this.path[el - 1][1]);
            ctx.lineTo(this.path[el][0], this.path[el][1]);
            ctx.strokeStyle = `hsla(${parseInt(this.color.h) + parseInt(el) * 2}, 100%, 50%, 1)`;
            ctx.closePath();
            ctx.stroke();
        }
        ctx.strokeStyle = "black";
        this.checkMeta();

        if(this.laps === lapsAmount) {
            logger.innerText = `${this.name}\nOkrążenia: 0`;
            win(this);                          
        }

        if(!this.checkCollision() && gamePlaying)
            requestAnimationFrame(this.go.bind(this));
        else if(this.checkCollision()) {
            playerNum--;
            logger.style.background = `hsla(0, 0%, 80%, 0.5)`;
            requestAnimationFrame(this.blur.bind(this));            
            if(playerNum === 0)
                win(this);
        }
        else if(!gamePlaying)
            requestAnimationFrame(this.blur.bind(this));

        ctx.translate(this.position.x, this.position.y)
        ctx.rotate(-this.angle + Math.PI);
        ctx.drawImage(cycleImg, -12.5, -25, 25, 50);
        ctx.rotate(this.angle + Math.PI);
        ctx.translate(-this.position.x, -this.position.y);
    }

    blur() {
        let ctx = this.ctx;
        for(let el in this.path) {     
            ctx.beginPath();
            if(this.path[el - 1])
                ctx.moveTo(this.path[el - 1][0], this.path[el - 1][1]);
            ctx.lineTo(this.path[el][0], this.path[el][1]);
            ctx.strokeStyle = `hsla(${parseInt(this.color.h) + parseInt(el) * 2}, 100%, 50%, 1)`
            ctx.closePath();
            ctx.stroke();
        }
        ctx.strokeStyle = "black";
        this.path.pop();
        if(this.path.length)
            requestAnimationFrame(this.blur.bind(this));
    }

    checkCollision() {
        return !this.ctx.isPointInPath(track, this.position.x, this.position.y) || this.ctx.isPointInPath(inner, this.position.x, this.position.y);
    }

    checkMeta() {
        if(!this.madeHalf){
            if(this.ctx.isPointInPath(half, this.position.x, this.position.y) && this.angle.isBetween(Math.PI, Math.PI * 2)){
                this.madeHalf = true;
            }
        }
        else if(this.ctx.isPointInPath(full, this.position.x, this.position.y) && this.angle.isBetween(0, Math.PI)){
            this.madeHalf = false;
            this.laps++;
        }
    }

    keydown(e) {
        if (e.key == this.key.left)
            this.goingLeft = true;
        if (e.key == this.key.right)
            this.goingRight = true;
        //if(e.key == "ArrowUp")
        //    this.speedingUp = true;
        //if(e.key == "ArrowDown") 
        //    this.slowingDown = true;
    }

    keyup(e) {
        if (e.key == this.key.left)
            this.goingLeft = false;
        if (e.key == this.key.right)
            this.goingRight = false;
        //if(e.key == "ArrowUp")
        //    this.speedingUp = false;
        //if(e.key == "ArrowDown") 
        //    this.slowingDown = false;
    }
}
class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function win(player) {
    gamePlaying = false;
    let log = document.createElement("log-node");
    log.innerHTML = player.name + " wygrywa!!!";
    console.log(player)
    log.style.color = player.color.rgb;
    log.style.border = "2px solid " + player.color.rgb
    document.querySelector("log-container").innerText = "";
    document.querySelector("log-container").appendChild(log);
    addEventListener("keydown")
}