const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;
c.fillRect(0, 0, canvas.width, canvas.height);
const gravity = 0.3;
const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './img/background/packardLab.png',
});
/*
const shop = new Sprite({
    position: {
        x:600,
        y:150,
    },
    imageSrc: './img/clutch/clutchIdle.png',
    scale: 3,
    framesMax: 9,
});
*/
const player = new Fighter({
    position: {
        x: 25,
        y: 425,
    },
    velocity: {
        x: 0,
        y: 0,
    },
    color: 'red',
    offset: {
        x: 0,
        y: 0,
    },
    imageSrc: './img/clutch/clutchIdle.png',
    scale: 3.5,
    framesMax: 10,
    sprites: {
        idle: {
            imageSrc: './img/clutch/clutchIdle.png',
            framesMax: 10,
        },
        run: {
            imageSrc: './img/clutch/clutchRun.png',
            framesMax: 6,
        },
        jump: {
            imageSrc: './img/clutch/clutchJump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './img/clutch/clutchFall.png',
            framesMax: 2,
        },
        attack: {
            imageSrc: './img/clutch/clutchAttack.png',
            framesMax: 4,
        },
        getHit: {
            imageSrc: './img/clutch/clutchGetHit.png',
            framesMax: 3,
        },
        death: {
            imageSrc: './img/clutch/clutchDeath.png',
            framesMax: 9,
        }
    },
    offset: {
        x: 170,
        y: 170,
    },
    attackBox: {
        offset: {
            x: 130,
            y: 25,
        },
        width: 130,
        height: 50,
    },
});
const enemy = new Fighter({
    position: {
        x: 825,
        y: 425,
    },
    velocity: {
        x: 0,
        y: 0,
    },
    color: 'blue',
    offset: {
        x: -50,
        y: 0,
    },
    imageSrc: './img/leopard/leopard2/leopardIdle2.png',
    scale: 3.5,
    framesMax: 10,
    sprites: {
        idle: {
            imageSrc: './img/leopard/leopard2/leopardIdle2.png',
            framesMax: 10,
        },
        run: {
            imageSrc: './img/leopard/leopard2/leopardRun2.png',
            framesMax: 6,
        },
        jump: {
            imageSrc: './img/leopard/leopard2/leopardJump2.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './img/leopard/leopard2/leopardFall2.png',
            framesMax: 2,
        },
        attack: {
            imageSrc: './img/leopard/leopard2/leopardAttack2.png',
            framesMax: 4,
        },
        getHit: {
            imageSrc: './img/leopard/leopard2/leopardGetHit2.png',
            framesMax: 3,
        },
        death: {
            imageSrc: './img/leopard/leopard2/leopardDeath2.png',
            framesMax: 9,
        }
    },
    offset: {
        x: 170,
        y: 170,
    },
    attackBox: {
        offset: {
            x: -150,
            y: 30,
        },
        width: 150,
        height: 50,
    },

});
//console.log(player);
const keys = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    w: {
        pressed: false,
    },
    ArrowUp: {
        pressed: false,
    },
    ArrowLeft: {
        pressed: false,
    },
    ArrowRight: {
        pressed: false,
    },
}

decreaseTimer();
function animate() {

    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    //shop.update();
    player.update();
    enemy.update();
    //1st player movement
    player.velocity.x = 0;

    if (keys.a.pressed && player.lastKey === 'a') {
        if (player.position.x > -10) {
            player.velocity.x = -5;
            player.switchSprite('run');
        }

        //console.log(player.position.x);
    }
    else if (keys.d.pressed && player.lastKey === 'd') {
        if (player.position.x < 900) {
            player.velocity.x = 5;
            player.switchSprite('run');
        }

        //console.log(player.position.x);
    }
    else {
        player.switchSprite('idle');
        //console.log(player.position.x);
    }
    if (keys.w.pressed && !player.inAir) {
        player.velocity.y = -8;
        var audio = new Audio('jump.wav');
        audio.play();
        player.inAir = true;
    }
    if (player.inAir === true && player.velocity.y > 0) {
        player.switchSprite('fall');
    } else if (player.inAir === true && player.velocity.y < 0) {
        player.switchSprite('jump');
    }

    enemy.velocity.x = 0;
    //2nd player movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        if (enemy.position.x > -10) {
            enemy.velocity.x = -5;
            enemy.switchSprite('run');
        }

    }
    else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        if (enemy.position.x < 900) {
            enemy.velocity.x = 5;
            enemy.switchSprite('run');
        }
    }
    else {
        enemy.switchSprite('idle');
    }
    if (keys.ArrowUp.pressed && !enemy.inAir) {
        enemy.velocity.y = -8;
        var audio = new Audio('jump.wav');
        audio.play();
        enemy.inAir = true;
    }
    if (enemy.inAir === true && enemy.velocity.y > 0) {
        enemy.switchSprite('fall');
    } else if (enemy.inAir === true && enemy.velocity.y < 0) {
        enemy.switchSprite('jump');
    }
    //detect for collision
    if (rectangularCollision({
        rectangle1: player,
        rectangle2: enemy,
    }) && player.isAttacking && player.framesCurrent === 3) {
        //console.log("player 1 hit");
        enemy.getHit();
        player.isAttacking = false;
        //enemy.health -= 10;
        gsap.to('#enemyHealth', {
            width: enemy.health + '%',
        });
    }

    //if player misses
    if (player.isAttacking && player.framesCurrent === 4) {
        player.isAttacking = false;
    }

    if (rectangularCollision({
        rectangle1: enemy,
        rectangle2: player,
    }) && enemy.isAttacking && enemy.framesCurrent === 3) {
        //console.log("player 2 hit");
        //player.health -= 10;
        player.getHit();
        enemy.isAttacking = false;
        gsap.to('#playerHealth', {
            width: player.health + '%',
        });
    }

    //if player misses
    if (enemy.isAttacking && enemy.framesCurrent === 4) {
        enemy.isAttacking = false;
    }

    //end game based on health
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({ player, enemy, timerId });
    }
}
animate()

window.addEventListener('keydown', (event) => {
    if (!player.dead) {
        switch (event.key) {
            case 'd':
                keys.d.pressed = true;
                player.lastKey = 'd';
                break;
            case 'a':
                keys.a.pressed = true;
                player.lastKey = 'a';
                break;
            case 'w':
                //player.velocity.y = -5;
                keys.w.pressed = true;
                break;
            case ' ':
                var audio = new Audio('swing.wav');
                audio.play();
                player.attack();
                break;
        }
    }
    if (!enemy.dead) {


        switch (event.key) {
            //second player controls
            case 'ArrowRight':
                keys.ArrowRight.pressed = true;

                enemy.lastKey = 'ArrowRight';
                break;
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true;
                enemy.lastKey = 'ArrowLeft';
                break;
            case 'ArrowUp':
                //enemy.velocity.y = -10;
                keys.ArrowUp.pressed = true;
                break;
            case 'ArrowDown':
                var audio = new Audio('swing.wav');
                audio.play();
                enemy.attack();
                break;
        }
    }
    if (event.key === 'Escape') {
        //console.log("Menu is shown");
        showMenu();
    }
})
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'w':
            keys.w.pressed = false;
            break;
    }
    //second player controls
    switch (event.key) {
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
            break;
    }

})

// Create a menu function
function showMenu() {
    pauseTimer();
    // Create a menu container element
    var menuContainer = document.createElement("div");
    menuContainer.setAttribute("id", "menu-container");

    // Create menu options
    var menuOptions = ["MENU", "Resume", "Restart","Exit"];

    // Loop through menu options
    for (var i = 0; i < menuOptions.length; i++) {
        // Create a menu option element
        var menuOption = document.createElement("div");
        menuOption.innerHTML = menuOptions[i];
        menuOption.classList.add("menu-option");

        // Add event listener for menu option click
        menuOption.addEventListener("click", handleMenuOptionClick);

        // Append the menu option to the menu container
        menuContainer.appendChild(menuOption);
    }

    // Append the menu container to the game container or body element
    var gameContainer = document.querySelector('body'); 
    gameContainer.appendChild(menuContainer);
}

// Function to handle menu option click
function handleMenuOptionClick(event) {
    var option = event.target.innerHTML;

    // Handle different menu options
    switch (option) {
        case "Resume":
            // Call your resume function here
            //console.log("Game Resumed!");
            resumeTimer();
            break;
        case "Restart":
            window.location.reload();
            break;
        case "Exit":
            window.location.replace("../menu.html");
            break;
        default:
            break;
    }

    // Remove the menu container from the DOM
    var menuContainer = document.getElementById("menu-container");
    menuContainer.parentNode.removeChild(menuContainer);
}