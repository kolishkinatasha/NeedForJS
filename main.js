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
    speed: 3
};

function startGame(){
    start.classList.add('hide');
    setting.start = true;
    gameArea.appendChild(car); // в игровое поле добавляем машину, путем добавления ребенка в gameArea
    requestAnimationFrame(playGame);   
}   

function playGame(){
    // console.log("Plat game!");
    if (setting.start) {   // if (setting.start === true) - тоже самое 
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


