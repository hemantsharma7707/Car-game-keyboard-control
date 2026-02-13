const gameArea = document.querySelector(".gameArea");
const scoreDisplay = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");

let player = { speed:5, score:0 };
let keys = { ArrowUp:false, ArrowDown:false, ArrowLeft:false, ArrowRight:false };

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

startScreen.addEventListener("click", startGame);

function startGame(){
    startScreen.classList.add("hidden");
    gameArea.innerHTML = "";
    gameArea.appendChild(scoreDisplay);
    player.score = 0;

    for(let x=0; x<5; x++){
        let roadLine = document.createElement("div");
        roadLine.classList.add("roadLine");
        roadLine.style.top = (x*150) + "px";
        gameArea.appendChild(roadLine);
    }

    let car = document.createElement("div");
    car.classList.add("car");
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for(let x=0; x<3; x++){
        let enemy = document.createElement("div");
        enemy.classList.add("enemy");
        enemy.style.top = ((x+1)*-300) + "px";
        enemy.style.left = Math.floor(Math.random()*350) + "px";
        gameArea.appendChild(enemy);
    }

    window.requestAnimationFrame(gamePlay);
}

function isCollide(a,b){
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();

    return !(
        aRect.bottom < bRect.top ||
        aRect.top > bRect.bottom ||
        aRect.right < bRect.left ||
        aRect.left > bRect.right
    );
}

function moveRoad(){
    let roadLines = document.querySelectorAll(".roadLine");
    roadLines.forEach(item=>{
        let top = parseInt(item.style.top);
        top += player.speed;
        if(top >= 600){
            top -= 750;
        }
        item.style.top = top + "px";
    });
}

function moveEnemy(car){
    let enemies = document.querySelectorAll(".enemy");
    enemies.forEach(item=>{
        if(isCollide(car,item)){
            endGame();
        }

        let top = parseInt(item.style.top);
        top += player.speed;
        if(top >= 600){
            top = -300;
            item.style.left = Math.floor(Math.random()*350) + "px";
            player.score += 10;
        }
        item.style.top = top + "px";
    });
}

function gamePlay(){
    let car = document.querySelector(".car");

    moveRoad();
    moveEnemy(car);

    if(keys.ArrowLeft && player.x > 0){
        player.x -= player.speed;
    }
    if(keys.ArrowRight && player.x < 350){
        player.x += player.speed;
    }
    if(keys.ArrowUp && player.y > 0){
        player.y -= player.speed;
    }
    if(keys.ArrowDown && player.y < 510){
        player.y += player.speed;
    }

    car.style.left = player.x + "px";
    car.style.top = player.y + "px";

    player.score++;
    scoreDisplay.innerHTML = "Score: " + player.score;

    window.requestAnimationFrame(gamePlay);
}

function endGame(){
    startScreen.innerHTML = "Game Over <br> Score: " + player.score + "<br> Click To Restart";
    startScreen.classList.remove("hidden");
}