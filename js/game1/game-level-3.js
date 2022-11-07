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



var boss =[{x:50,y:50}];




function controllboss() {
    var ouput = ""
    for (let index = 0; index < boss.length; index++) {
        ouput += "<div class='boss' style='top:" + boss[index].y + "px; left:" + boss[index].x + "px;'></div>";
    }
    document.getElementById('boss').innerHTML = ouput;
}

function moveboss() {
        boss.y += 5;
        if(boss.y >525){
            boss.y = 0;
            boss.x = Math.random()*400;
        }
        
    
}
//Detect collision
var finalizarNivel = false;
function detectCollision() {
    for (let i = 0; i < bullet.length; i++) {
        for (let j = 0; j < boss.length; j++) {
            //Object boss 
            if(Math.abs(bullet[i].x - boss.x) <10 && Math.abs(bullet[i].y - boss.y) <10){
                bullet[i] = bullet[bullet.length-1];
                score += 10;
                boss.live = boss.live-10;
                bullet.pop();
                if(boss.live == 0){
                    finalizarNivel = true;
                }
                
            }
            
        }       
    }
}


// Loop for game
function gameLoop() {
    if(!finalizarNivel || score <60){
        controllHero();
        moveboss();
        controllboss();
        moveBullets();
        controllBullet();
        detectCollision();
        controllScore();
    }else{
        alert('Ha acabado el nivel 3');
        window.location.href = '/index.html';
    }
}

var id;
var startGame=document.getElementById("start");
var stopGame=document.getElementById("stop");
startGame.onclick = ()=>{
    if(!startGame.checked){
    id = setInterval(gameLoop,100);
    startGame.checked = true;
    stopGame.checked = false;
    }
};
stopGame.onclick = ()=>{
    if(!stopGame.checked){
    clearInterval(id);
    startGame.checked = false;
    stopGame.checked = true;
    }
};