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
        if(bullet[index].y <0){
            bullet[index] = bullet[bullet.length-1];
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
    if (a.key == 'ArrowUp' && hero.y>0) {
        hero.y -= 10;
    }
    if (a.key == 'ArrowDown' && hero.y<500) {
        hero.y += 10;
    }
    if (a.key == 'ArrowLeft' && hero.x>0) {
        hero.x -= 10;
    }
    if (a.key == 'ArrowRight' && hero.x<470) {
        hero.x += 10;
    }
    if(a.key == ' '){
        bullet.push({x:hero.x+7,y:hero.y-12});
        controllBullet();
    }
}



//Control enemy animations

var enemies = [{ x: 50, y: 50 }, { x: 250, y: 80 }, { x: 450, y: 30 },{ x: 40, y: 50 },{ x: 300, y: 50 },{ x: 400, y: 30 }];

function controllEnemies() {
    var ouput = ""
    for (let index = 0; index < enemies.length; index++) {
        ouput += "<div class='enemy1' style='top:" + enemies[index].y + "px; left:" + enemies[index].x + "px;'></div>";
    }
    document.getElementById('enemies').innerHTML = ouput;
}

function moveEnemies() {
    for (let index = 0; index < enemies.length; index++) {
        enemies[index].y += 5;
        if(enemies[index].y >525){
            enemies[index].y = 0;
            enemies[index].x = Math.random()*400;
        }
        
    }
}
//Detect collision
function detectCollision() {
    for (let i = 0; i < bullet.length; i++) {
        for (let j = 0; j < enemies.length; j++) {
            if(Math.abs(bullet[i].x - enemies[j].x) <5 && Math.abs(bullet[i].y - enemies[j].y) <5){
                enemies[j] = enemies[enemies.length-1];
                bullet[i] = bullet[bullet.length-1];
                score += 10;
                enemies.pop();
                bullet.pop();
            }
        }       
    }
}


// Loop for game
function gameLoop() {
    controllHero();
    moveEnemies();
    controllEnemies();
    moveBullets();
    controllBullet();
    detectCollision();
    controllScore();
}

setInterval(gameLoop,100);