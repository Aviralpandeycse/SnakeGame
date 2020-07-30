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
      var X = headX + 1;
      var Y = headY;
      this.cells.push({ x: X, y: Y });
    },
  };
  snake.createSnake();
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
