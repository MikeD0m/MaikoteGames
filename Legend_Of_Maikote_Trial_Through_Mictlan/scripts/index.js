const GameViewport = {
    WIDTH: 395,
    HEIGHT: 253,
};

window.onload = function(){
    const canvasEl = document.querySelector('canvas');
    const context = canvasEl.getContext('2d');
    canvasEl.width = GameViewport.WIDTH;
    canvasEl.height = GameViewport.HEIGHT;

    const [kahn,background] = document.querySelectorAll('img');

    const position = {
        x: 0,
        y: 60,
    };

    let velocity = 0;


    function frame(){
        position.x += velocity;

        if(position.x > GameViewport.WIDTH - kahn.width || position.x < 0){
            velocity = -velocity;
        }
        context.drawImage(background, 0,0);
        context.drawImage(kahn, position.x, position.y);

        window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
}