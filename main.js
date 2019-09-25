const score = document.querySelector('.score'),
      start = document.querySelector('.start'),
      gameArea = document.querySelector('.gameArea'),
      car = document.createElement('div');


// start.onclick = function(){
//     start.classList.add('hide');
// }
car.classList.add('car');

start.addEventListener('click', startGame); 
document.addEventListener('keydown', startRun); // обработчик на нажатие кнопки клавиатуры
document.addEventListener('keyup', stopRun); // отпускание кнопки

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

const setting = {
    start: false,
    score: 0,
    speed: 5,
    traffic: 3
};

function getQuantityElements(heightElement){
    return document.documentElement.clientHeight / heightElement + 1;
}

// console.log(getQuantityElements(100));

function startGame(){
    start.classList.add('hide');

    gameArea.innerHTML = '';
    

    for (let i = 0; i < getQuantityElements(100); i++){
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = ( i * 100 ) + 'px';
        line.y = i * 100 ;
        gameArea.appendChild(line);
    }
//цикл добавления машин
    for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++){  
    //частота вхождения элемента зависит от трафика
        const enemy = document.createElement('div') ;
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidht - 50)) + 'px';
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = 'transparent url(./image/enemy2.png) center / cover no-repeat';
        gameArea.appendChild(enemy);
        }

    setting.score = 0;
    setting.start = true;
    gameArea.appendChild(car);   // в игровое поле добавляем машину, путем добавления ребенка в gameArea
    car.style.left = gameArea.offsetWidht/2 - car.offsetWidht/2;
    car.style.top = 'auto';
    car.style.bottom = "10px";
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);   
}   

function playGame(){
    //  console.log("Play game!");
    if (setting.start) {  
        
         setting.score += setting.speed;
         score.innerHTML = 'SCORE<br>' + setting.score;

        moveRoad();
        moveEnemy();

        if (keys.ArrowLeft && setting.x > 0){
            setting.x -= setting.speed;
        }

        if (keys.ArrowRight && setting.x < (gameArea.offsetWidht - car.offsetWidht)){
            setting.x += setting.speed;
        }

          if (keys.ArrowUp && setting.y > 0) {
            setting.y -= setting.speed;
        }

        if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
            setting.y += setting.speed;
        }

        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';
        
        requestAnimationFrame(playGame);  // рекурсия 
    }
    
}

function startRun(event){
    event.preventDefault();
    keys[event.key] = true;
    // console.log(event.key);
}

function stopRun(event){
    event.preventDefault();
    keys[event.key] = false;
    // console.log(event.key); 
}

function moveRoad(){
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line) {
    // console.log(i);
    line.y += setting.speed;
    line.style.top = line.y + 'px';

        if (line.y >=  document.documentElement.clientHeight) {
            line.y = -100;
        }

    });
}

function moveEnemy(){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){
        let carRect = car.getBoundingClientRect();
        // console.log(carRect);
        let enemyRect = item.getBoundingClientRect();

        if(carRect.top <= enemyRect.bottom &&
            carRect.right >= enemyRect.left &&
            carRect.left <= enemyRect.right &&
            carRect.bottom >= enemyRect.top) {
                setting.start = false;
                 console.log("дтп");
                start.classList.remove('hide');
                start.style.top = score.offsetHeight;

        }
        

    item.y += setting.speed / 2;
    item.style.top = item.y + 'px';
    
    if(item.y >= document.documentElement.clientHeight){
        item.y = -50 * setting.traffic;
        item.style.left = Math.floor(Math.random() * (gameArea.offsetWidht - 50)) + 'px';
        console.log("item");
    }

    });
}
