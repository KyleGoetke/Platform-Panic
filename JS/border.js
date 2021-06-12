// These are the blocks the player collides with when traversing the map
function Border(x, y, width, height, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;

    this.render = function () {
        if (this.type === 1) {
            ctx.fillStyle = "#5D4037";
        } else if (this.type === 2) {
            ctx.fillStyle = "red";
        } else if (this.type === 3) {
            ctx.fillStyle = "blue";
        }
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function Goal(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.render = function () {
        ctx.fillStyle = "#FFE0BD";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}