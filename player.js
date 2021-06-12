function Player(x, y) {
    //player variables
    this.x = x;
    this.y = y;
    this.xspeed = 0;
    this.yspeed = 0;
    this.friction = 0.8;
    this.width = 20;
    this.height = 20;
    this.active = true;
    this.health = 5;
    this.gravity = 2;
    this.jump = false;
    this.goal = false;

    this.update = function () {
        // Movement

        this.xspeed *= this.friction;
        this.yspeed *= this.friction;
        // applies gravity
        this.yspeed += this.gravity;

        // this.jump = true;

        if ((keys[87] || keys[38])) {
            if (this.jump == false) {
                this.yspeed -= 35;
                this.jump = true;
            }
        }

        // move left
        if (keys[65] || keys[37]) {
            this.xspeed = -3;
        }
        // move right
        if (keys[68] || keys[39]) {
            this.xspeed = 3;
        }

        if (this.xspeed > 0) {
            this.xspeed = Math.floor(this.xspeed);
        } else {
            this.xspeed = Math.ceil(this.xspeed);
        }

        if (this.yspeed > 0) {
            this.yspeed = Math.floor(this.yspeed);
        } else {
            this.yspeed = Math.ceil(this.yspeed);
        }

        //Horizontal collision rect
        horizontalRect = {
            x: this.x + this.xspeed,
            y: this.y,
            width: this.width,
            height: this.height
        }

        //vertical collision rect
        verticalRect = {
            x: this.x,
            y: this.y + this.yspeed,
            width: this.width,
            height: this.height
        }

        collisions = false;

        //check for collision
        for (let i = 0; i < borders.length; i++) {
            borderRect = {
                x: borders[i].x,
                y: borders[i].y,
                width: borders[i].width,
                height: borders[i].height
            }
            if (checkIntersection(horizontalRect, borderRect)) {
                while (checkIntersection(horizontalRect, borderRect)) {
                    horizontalRect.x -= Math.sign(this.xspeed);
                }
                this.x = horizontalRect.x;
                this.xspeed = 0;
            }
            if (checkIntersection(verticalRect, borderRect) && this.yspeed < 0) {
                while (checkIntersection(verticalRect, borderRect)) {
                    verticalRect.y -= Math.sign(this.yspeed);
                }
                this.y = verticalRect.y;
                this.yspeed = 0;
            }
            if (checkIntersection(verticalRect, borderRect) && this.yspeed > 0) {
                while (checkIntersection(verticalRect, borderRect)) {
                    verticalRect.y -= Math.sign(this.yspeed);
                }
                this.y = verticalRect.y;
                this.yspeed = 0;
                collisions = true;
            }
        }

        // detect jumping
        if (!collisions) {

            this.jump = true;
        } else {
            if (keys[87] || keys[38]) { } else { this.jump = false; }
        }

        for (let i = 0; i < goal.length; i++) {
            goalRect = {
                x: goal[i].x,
                y: goal[i].y,
                width: goal[i].width,
                height: goal[i].height
            }
            if (checkIntersection(horizontalRect, goalRect)) {
                while (checkIntersection(horizontalRect, goalRect)) {
                    horizontalRect.x -= Math.sign(this.xspeed);
                }
                this.x = horizontalRect.x;
                this.xspeed = 0;
            }
            if (checkIntersection(verticalRect, goalRect)) {
                while (checkIntersection(verticalRect, goalRect)) {
                    verticalRect.y -= Math.sign(this.yspeed);
                }
                this.y = verticalRect.y;
                this.yspeed = 0;
                this.goal = true;
                level += 1;
            }
        }

        for (let i = 0; i < enemy.length; i++) {
            enHorzRect = {
                x: enemy[i].x + enemy[i].speed,
                y: enemy[i].y,
                width: enemy[i].width,
                height: enemy[i].height
            }

            //vertical collision rect
            enVertRect = {
                x: enemy[i].x,
                y: enemy[i].y,
                width: enemy[i].width,
                height: enemy[i].height
            }

            if (checkIntersection(horizontalRect, enHorzRect)) {
                if (this.x + this.width > enemy[i].x) {
                    this.x = 40;
                    this.y = 660;
                    this.health -= 1;
                    this.xspeed = 0;
                    this.yspeed = 0;
                }
                else if (this.x < enemy[i].x + enemy[i].width) {
                    this.x = 40;
                    this.y = 660;
                    this.health -= 1;
                    this.xspeed = 0;
                    this.yspeed = 0;
                }

            }
            else if (checkIntersection(verticalRect, enVertRect) && this.jump) {
                enemy.splice(i, 1);
            }

        }

        this.x += this.xspeed;
        this.y += this.yspeed;
    }

    this.render = function () {
        var playerSprite = new Image();
        playerSprite.src = 'images\\playersprite.png'
        ctx.drawImage(playerSprite, this.x, this.y);
    }
}