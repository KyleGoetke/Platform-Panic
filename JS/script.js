//Create drawing variables
let canvas;
let ctx;
let hcanvas;
let htx;

//create input variables
let keys = [];
let keyPressed = false;

//create game variables
let gameLoop;
let player;
let enemy = [];
let borders = [];
let goal = [];
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
    });

    document.addEventListener("keyup", function (e) {
        keys[e.keyCode] = false;
    });

    //Create player
    player = new Player(40, 660); //////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////
    document.getElementById("end").style.visibility = "hidden";
    ////////////////////////////////////////////////////////////////////////////

    levelTwo();
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
        ////////////////////////////////////////////////////////////////////////////
        document.getElementById("display").innerHTML = "";
        document.getElementById("end").style.visibility = "initial";
        ////////////////////////////////////////////////////////////////////////////
    }

    if (player.goal == true) {
        if (level == 1) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            player.x = 40;
            player.y = 660;
            borders = [];
            goal = [];
            enemy = [];
            levelTwo();
            player.goal = false;
            player.xspeed = 0;
            player.yspeed = 0;
        } else if (level == 2) {
            ////////////////////////////////////////////////////////////////////////////
            document.getElementById("display").innerHTML = "";
            document.getElementById("end").style.visibility = "initial";
            document.getElementById("end").firstChild.data = "You won, great job!";
            ////////////////////////////////////////////////////////////////////////////
        }
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

function pointRectangleIntersect(x, y, rect) {
    if (rect.x < x && rect.x + rect.width > x && rect.y < y && rect.y + rect.width > y) {
        return true;
    }
    return false;
}