function init() {
  var canvas = document.getElementById("mycanvas");
  W = H = canvas.width = canvas.height = 1000;
  pen = canvas.getContext("2d");
  cs = 66;
  gameover = false;

  food_img = new Image();
  food_img.src = "Assets/apple.png";

  trophy_img = new Image();
  trophy_img.src = "Assets/trophy.png";

  food = getRandomFood();
  score = 1;
  snake = {
    init_len: 1,
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
      var headX = this.cells[this.cells.length - 1].x;
      var headY = this.cells[this.cells.length - 1].y;
      if (headX === food.x && headY === food.y) {
        food = getRandomFood();
        score++;
      } else {
        this.cells.shift();
      }
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

      var lastX = Math.round(W / cs);
      var lastY = Math.round(H / cs);

      if (headX > lastX - 1 || headX < 0 || headY > lastY - 1 || headY < 0) {
        gameover = true;
      }
      for (var i = 0; i < this.cells.length - 2; i++) {
        if (headX === this.cells[i].x && headY === this.cells[i].y) {
          gameover = true;
        }
      }
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

function getRandomFood() {
  var foodX = Math.round((Math.random() * (W - cs)) / cs);
  var foodY = Math.round((Math.random() * (H - cs)) / cs);
  var food = {
    x: foodX,
    y: foodY,
    color: "red",
  };
  return food;
}

function draw() {
  pen.clearRect(0, 0, W, H);
  snake.drawSnake();
  pen.fillStyle = food.color;
  pen.drawImage(food_img, food.x * cs, food.y * cs, cs, cs);
  pen.drawImage(trophy_img, 0, 0, cs, cs);
  pen.fillStyle = "blue";
  pen.font = "20px Roboto";
  pen.fillText(score, 25, 25);
}

function update() {
  snake.updateSnake();
}

function gameloop() {
  if (gameover == true) {
    clearInterval(f);
    alert("Game Over");
  } else {
    draw();
    update();
  }
}

init();
var f = setInterval(gameloop, 100);
