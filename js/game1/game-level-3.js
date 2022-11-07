// Control Score
var score = 0;
function controllScore() {
    document.getElementById('score').innerHTML = score;
}
//Control shoot and bullet
var bullet = [];
function controllBullet() {
    var ouput = '';
    for (let index = 0; index < bullet.length; index++) {
        ouput += "<div class='bullet' style='top:" + bullet[index].y + "px; left:" + bullet[index].x + "px;'></div>";
    }
    document.getElementById('bullets').innerHTML = ouput;
}
function moveBullets() {
    for (let index = 0; index < bullet.length; index++) {
        bullet[index].y -= 5;
        if (bullet[index].y < 0) {
            bullet[index] = bullet[bullet.length - 1];
            bullet.pop();
        }
    }
}

//Control hero animations
var hero = {
    x: 300,
    y: 500
}
function controllHero() {
    document.getElementById('hero').style['top'] = hero.y + "px";
    document.getElementById('hero').style['left'] = hero.x + "px";
}

document.onkeydown = (a) => {
    if (a.key == 'ArrowUp' && hero.y > 0) {
        hero.y -= 10;
    }
    if (a.key == 'ArrowDown' && hero.y < 500) {
        hero.y += 10;
    }
    if (a.key == 'ArrowLeft' && hero.x > 0) {
        hero.x -= 10;
    }
    if (a.key == 'ArrowRight' && hero.x < 470) {
        hero.x += 10;
    }
    if (a.key == ' ') {
        bullet.push({ x: hero.x + 7, y: hero.y - 12 });
        controllBullet();
    }
}


//Control enemy animations


var boss = [{ x: 50, y: 50 }];




function controllboss() {
    var ouput = ""
    for (let index = 0; index < boss.length; index++) {
        ouput += "<div class='boss' style='top:" + boss[index].y + "px; left:" + boss[index].x + "px;'></div>";
    }
    document.getElementById('boss').innerHTML = ouput;
}

function moveboss() {
    boss[0].y += 5;
    if (boss[0].y > 525) {
        boss[0].y = 0;
        boss[0].x = Math.random() * 400;
    }


}
//Detect collision
var finalizarNivel = false;
var heroDead = false;
function detectCollision() {
    for (let i = 0; i < bullet.length; i++) {
        if (Math.abs(bullet[i].x - boss[0].x) < 10 && Math.abs(bullet[i].y - boss[0].y) < 10) {
            bullet[i] = bullet[bullet.length - 1];
            score += 10;
            bullet.pop();
            if (score == 200) {
                boss.pop();
                finalizarNivel = true;
            }
        }
    }
    if(Math.abs(boss[0].x - hero.x) < 10 && Math.abs(boss[0].y - hero.y) < 10){
        hero.pop();
        heroDead = true;
    }
}


// Loop for game
function gameLoop() {
    if (!finalizarNivel && !heroDead) {
        controllHero();
        moveboss();
        controllboss();
        moveBullets();
        controllBullet();
        detectCollision();
        controllScore();
    }else if(heroDead){
        alert('Has muerto');
        window.location.href = '/index.html';
    }else{
        alert('Has matado al boss');
        window.location.href = '/index.html';
    }
}

//Button for game
var id;
var startGame = document.getElementById("start");
var stopGame = document.getElementById("stop");
startGame.onclick = () => {
    if (!startGame.checked) {
        id = setInterval(gameLoop, 100);
        startGame.checked = true;
        stopGame.checked = false;
    }
};
stopGame.onclick = () => {
    if (!stopGame.checked) {
        clearInterval(id);
        startGame.checked = false;
        stopGame.checked = true;
    }
};