//Control hero animations
var hero = {
    x: 300,
    y: 500
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
        bullet.push({x:hero.x,y:hero.y,});
    }
}



//Control enemy animations

var enemies = [{ x: 50, y: 50 }, { x: 250, y: 80 }, { x: 450, y: 30 }];

function controllEnemys() {
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
function gameLoop() {
    controllHero();
    moveEnemies();
    controllEnemys();
    controllBullet();
}
setInterval(gameLoop,100);