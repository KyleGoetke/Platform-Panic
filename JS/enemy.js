function Enemy(x, y, speed, width, height, patrol) {
    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;

    this.friction = 0.9;
    this.speed = speed;
    this.startX = x + (width / 2);
    this.patrolLength = patrol;

    this.update = function () {

        if (this.x > this.startX + this.patrolLength) {
            this.speed *= -1;
        }
        if (this.x < this.startX - this.patrolLength) {
            this.speed *= -1;
        }


        this.x += this.speed;

    }
    this.render = function () {
        var crab = new Image();
        crab.src = 'images\\crab.png'
        ctx.drawImage(crab, this.x, this.y);
    }
}
