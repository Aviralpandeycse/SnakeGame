function init() {
  var canvas = document.getElementById("mycanvas");
  W = H = canvas.width = canvas.height = 1000;
  pen = canvas.getContext("2d");
  cs = 66;
  snake = {
    init_len: 5,
    color: "blue",
    cells: [],
    direction: "right",
    createSnake: function () {
      for (var i = 0; i < this.init_len; i++) {
        this.cells.push({ x: i, y: 0 });
      }
    },
    drawSnake: function () {
      for (var i = 0; i < this.cells.length; i++) {
        pen.fillStyle = this.color;
        pen.fillRect(
          this.cells[i].x * cs,
          this.cells[i].y * cs,
          cs - 2,
          cs - 2
        );
      }
    },
    updateSnake: function () {
      this.cells.shift();
      var headX = this.cells[this.cells.length - 1].x;
      var headY = this.cells[this.cells.length - 1].y;
      var nextX, nextY;
      if (this.direction == "right") {
        var nextX = headX + 1;
        var nextY = headY;
      } else if (this.direction == "left") {
        var nextX = headX - 1;
        var nextY = headY;
      } else if (this.direction == "down") {
        var nextX = headX;
        var nextY = headY + 1;
      } else {
        var nextX = headX;
        var nextY = headY - 1;
      }
      this.cells.push({ x: nextX, y: nextY });
    },
  };
  snake.createSnake();

  function keyPressed(e) {
    if (e.key == "ArrowRight") {
      snake.direction = "right";
    } else if (e.key == "ArrowLeft") {
      snake.direction = "left";
    } else if (e.key == "ArrowDown") {
      snake.direction = "down";
    } else {
      snake.direction = "up";
    }
    console.log(snake.direction);
  }

  document.addEventListener("keydown", keyPressed);
}

function draw() {
  pen.clearRect(0, 0, W, H);
  snake.drawSnake();
}

function update() {
  snake.updateSnake();
}

function gameloop() {
  draw();
  update();
}

init();
var f = setInterval(gameloop, 100);
