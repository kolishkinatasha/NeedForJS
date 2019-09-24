const score = document.querySelector('.score'),
      start = document.querySelector('.start'),
      gameArea = document.querySelector('.gameArea')
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
    speed: 3,
    traffic: 3
};

function getQuantityElements(heightElement){
    return document.documentElement.clientHeight / heightElement + 1;
}

// console.log(getQuantityElements(100));

function startGame(){
    start.classList.add('hide');
    for (let i = 0; i < getQuantityElements(100); i++){
        const line = document.createElement("div");
        line.classList.add('line');
        line.style.top = ( i * 100 ) + 'px';
        line.y = i * 100;
        gameArea.appendChild(line);
    }
//цикл добавления машин
    for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++){  //частота вхождения элемента зависит от трафика
        const enemy = document.createElement('div') ;
        enemy.classList.add('enemy');
        enemy.style.top = enemy.y + 'px';
        enemy.y = -100 * setting.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidht - 50)) + 'px';
        gameArea.appendChild(enemy);
        }

    setting.start = true;
    gameArea.appendChild(car); // в игровое поле добавляем машину, путем добавления ребенка в gameArea
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);   
}   

function playGame(){
    //  console.log("Play game!");
    if (setting.start === true) {   // if (setting.start) - тоже самое 

        moveRoad();
        moveEnemy();

        if (keys.ArrowLeft === true && setting.x > 0){
            setting.x -= setting.speed;
        }

        if (keys.ArrowRight === true && setting.x < (gameArea.offsetWidht - car.offsetWidht)){
            setting.x += setting.speed;
        }

        if (keys.ArrowUp && setting.y > 0) {
            setting.y -= setting.speed;
        }

        if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
            setting.y += setting.speed;
        }

        car.style.left += setting.speed + 'px';
        car.style.top += setting.speed + 'px';
        
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
    lines.forEach( function(line) {
    // console.log(i);
    line.y += setting.speed;
    line.style.top = line.y + 'px';

        if (line.y >  document.documentElement.clientHeight) {
            line.y = -100;
        }

    })
}

function moveEnemy(){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){
    item.y += setting.speed / 2;
    item.style.top = item.y + 'px';

    if(item.y >= document.documentElement.clientHeight){
        item.y = -100 * setting.traffic;
        item.style.left = Math.floor(Math.random() * (gameArea.offsetWidht - 50)) + 'px';
    }

    });
}
