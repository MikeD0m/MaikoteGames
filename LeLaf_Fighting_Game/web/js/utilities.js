function rectangularCollision({ rectangle1, rectangle2 }) {
    return (rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height)
}
function determineWinner({ player, enemy, timerId }) {
    clearTimeout(timerId);
    document.querySelector('#displayText').style.display = 'flex';
    if (player.health === enemy.health) {

        document.querySelector('#displayText').innerHTML = 'Draw';
    }
    if (player.health > enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Clutch Wins!';
    }
    if (player.health < enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Leopard Wins!';

    }
}
let timer = 60;
let timerId;
function decreaseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000);
        timer--;
        document.querySelector('#timer').innerHTML = timer;
    }
    if (timer === 0) {

        determineWinner({ player, enemy, timerId });
    }
}
function resetTimer() {
    timer = 60;
    document.querySelector('#timer').innerHTML = timer;
    decreaseTimer();
}
function pauseTimer() {
    clearTimeout(timerId);
}
function resumeTimer() {
    timerId = setTimeout(decreaseTimer, 1000);
}