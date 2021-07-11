let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];

snake[0] = {
    x: 0 * box, 
    y: 0 * box
}

let direction = "right";

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function createBG(){
    context.fillStyle = "lightgreen";
    context.strokeStyle = "black";
    context.fillRect(0, 0, 16 * box, 16 * box);
    context.strokeRect(0, 0, 16 * box, 16 * box);
}

function createSnake(){
    for (let index = 0; index < snake.length; index++) {
        context.fillStyle = "green";
        context.strokeStyle = "black";
        context.fillRect(snake[index].x, snake[index].y, box, box);
        context.strokeRect(snake[index].x, snake[index].y, box, box);
    }
}

function createFood() {
    context.fillStyle = "red";
    context.strokeStyle = "black";
    context.fillRect(food.x, food.y, box, box);
    context.strokeRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(e){
    if (e.keyCode == 37 && direction != "right") direction = "left";
    if (e.keyCode == 38 && direction != "down") direction = "up";
    if (e.keyCode == 39 && direction != "left") direction = "right";
    if (e.keyCode == 40 && direction != "up") direction = "down";

}

function startGame(){

    if (snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 15*box;
    if (snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 15*box;

    for (let index = 1; index < snake.length; index++){
        console.log(` Coordenadas X: ${snake[0].x}, ${snake[index].x} `)
        console.log(` Coordenadas Y: ${snake[0].y}, ${snake[index].y} `)
        if (snake[0].x == snake[index].x && snake[0].y == snake[index].y) {
            clearInterval(game);
            alert("Game Over")
        }
    }

    createBG();
    createSnake();
    createFood();
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y){
        snake.pop();
    }
    else{
        food = {
            x: Math.floor(Math.random() * 15 + 1) * box,
            y: Math.floor(Math.random() * 15 + 1) * box
        }
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
    
}

let game = setInterval(startGame, 100);
