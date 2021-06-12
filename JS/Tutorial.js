//Create rendering variables
let canvas;
let ctx;
let hcanvas;
let tcanvas;
let htx;

//create input variables
let keys = []

//create game variables
let gameLoop;
let player;
let enemy = [];
let borders = [];
let goal = [];

let times = 0;
let level = 0;


//Runs once page has loaded
window.onload = function () {
    // Assign canvas and context variables
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    hcanvas = document.getElementById("health");
    htx = hcanvas.getContext("2d");
    htx.fillStyle = "red";

    //set up key listeners
    document.addEventListener("keydown", function (e) {
        keys[e.keyCode] = true;
        times++;
        e.preventDefault();
    });

    document.addEventListener("keyup", function (e) {
        keys[e.keyCode] = false;
        e.preventDefault();
    });



    //Create player
    player = new Player(50, 640);
    TutorialOne()
    //start game loop
    gameLoop = setInterval(update, 15);


}

function update() {
    //update player
    player.update();

    //render everything
    render();

    if (player.y > ctx.canvas.height) {
        player.x = 40;
        player.y = 660;
        player.health -= 1;
        htx.clearRect(0, 0, htx.canvas.width, htx.canvas.height);
        player.xspeed = 0;
        player.yspeed = 0;
    } else if (player.health == 0) {
        player.health = 5;

    }

    //Horizontal collision rect
    horizontalRect = {
        x: player.x + player.xspeed,
        y: player.y,
        width: player.width,
        height: player.height
    }

    //vertical collision rect
    verticalRect = {
        x: player.x,
        y: player.y + player.yspeed,
        width: player.width,
        height: player.height
    }

    if (checkIntersection(verticalRect, goalRect)) {
        while (checkIntersection(verticalRect, goalRect)) {
            verticalRect.y -= Math.sign(player.yspeed);
        }
        player.y = verticalRect.y;
        player.yspeed = 0;
        if (level == 1) {
            document.getElementById("end").innerHTML = "Congratulations! You finished the Tutorial!";
            document.getElementById("Continue").style.visibility = "visible";
            document.getElementById("Button").style.padding = "28px 64px";
        }
        level += 1;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        player.x = 50;
        player.y = 640;
        borders = [];
        goal = [];
        enemy = [];
        TutorialTwo();
        player.goal = false;
        player.xspeed = 0;
        player.yspeed = 0;
        times = 0;
        writingText(0, 0, true);
    }

    for (let i = 0; i < enemy.length; i++) {
        enemy[i].update();
    }
}

// render the player's health
function renderHealth() {
    var heart = new Image();
    heart.src = 'images\\heart.png'

    htx.clearRect(0, 0, htx.canvas.width, htx.canvas.height);
    if (player.health === 1) {
        htx.drawImage(heart, 0, 0);
    } else if (player.health === 2) {
        htx.drawImage(heart, 0, 0);
        htx.drawImage(heart, 30, 0);
    } else if (player.health === 3) {
        htx.drawImage(heart, 0, 0);
        htx.drawImage(heart, 30, 0);
        htx.drawImage(heart, 60, 0);
    } else if (player.health === 4) {
        htx.drawImage(heart, 0, 0);
        htx.drawImage(heart, 30, 0);
        htx.drawImage(heart, 60, 0);
        htx.drawImage(heart, 90, 0);
    } else if (player.health === 5) {
        htx.drawImage(heart, 0, 0);
        htx.drawImage(heart, 30, 0);
        htx.drawImage(heart, 60, 0);
        htx.drawImage(heart, 90, 0);
        htx.drawImage(heart, 120, 0);
    }
}

function render() {
    //Clear the canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 1280, 736);
    ctx.font = "30px Comic Sans MS";
    ctx.textAlign = "center";

    //Changes Text on Canvas based on variable times and stage on tutroial
    if (times >= 0 && times <= 3 && level == 0) {
        writingText("Hello There! Welcome to the tutorial.", 0, false);
        writingText("To begin, click WASD or Arrow Keys to move. ", 1, false);

    } else if ((times < 1000 && times >= 5) && level == 0) {
        writingText(0, 0, true)
        writingText("The Podium on the right is a goal.", 0, false);
        writingText("Jump on top of it to move on. But don't fall", 1, false);
        writingText("or you will lose a life at the bottom.", 2, false);
    }
    if (player.health == 0 || times >= 1001) {
        times = 1001;
        writingText(0, 0, true);
        writingText("It looks like you lost all your health!", 0, false);
        writingText("Remember to be careful!", 1, false);
    }
    if (level == 1 && times < 1000) {
        writingText("Now there is an enemy! The enemy can hurt you.", 0, false);
        writingText("Try to reach the goal by dodging the enemy. ", 1, false);
    }

    //render the player
    player.render();

    //render the player
    renderHealth();

    //render the borders
    for (let i = 0; i < borders.length; i++) {
        borders[i].render();
    }

    //render the goal
    for (let i = 0; i < goal.length; i++) {
        goal[i].render();
    }

    for (let i = 0; i < enemy.length; i++) {
        enemy[i].render();
    }
}

function checkIntersection(entity, border) {
    if (entity.x >= border.x + border.width) {
        return false;
    } else if (entity.x + entity.width <= border.x) {
        return false;
    } else if (entity.y >= border.y + border.height) {
        return false;
    } else if (entity.y + entity.height <= border.y) {
        return false;
    } else {
        return true;
    }
}

function writingText(text, num, reset) {
    if (reset) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 1280, 720);
    } else {
        ctx.fillStyle = "black";
        ctx.fillText(text, canvas.width / 2, canvas.height / 4.5 + num * 35);
    }

}