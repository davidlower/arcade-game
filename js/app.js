/* jshint esversion: 6 */


// GLOBAL VARS
let score = 0;
const fullHeart = '<i class="fas fa-heart"></i>';
const emptyHeart = '<i class="far fa-heart"></i>';
const liveID = document.getElementById("heart-container");
const scoreID = document.getElementById("score");

liveID.innerHTML = fullHeart + fullHeart + fullHeart; // LOADING 3 HEARTS FOR THE GAME START
scoreID.innerHTML = "Score: " + score; // LOADING SCORE FOR THE GAME START


// ***************
// PLAYER CREATION
const Player = function(x, y) { // PLAYER OBJECT
   this.x = x;
   this.y = y;
   this.lives = 3;
   this.gameOverFlag = false; // INDICATES IF GAME OVER IS PRESENT
   this.sprite = 'images/char-horn-girl.png';
};

const player = new Player(304, 466); // ONE PLAYER CREATED

Player.prototype.render = function() { // PUTTING PLAYER ON CANVAS
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() { // REFRESHES PLAYER FRAMERATE
   if (this.y < 0) {
      setTimeout(() => {
         this.x = 304;
         this.y = 466;
      }, 700);
      score += 100;
      scoreID.innerHTML = "Score: " + score;
   }
   if (score == 5000) {
      allEnemies.push(enemy5);
      key.x = 106;
      key.y = 45;
      randomNum = 3.5;
   }
   if (score == 10000) {
      allEnemies.push(enemy6);
   }
   if (score == 15000) {
      allEnemies.push(enemy7);
   }
   if (score == 20000) {
      allEnemies.push(enemy8);
   }
   if (score == 25000) {

   }
};

// **********************
// PLAY MOVEMENT CONTROLS
Player.prototype.handleInput = function(allowedKeys) {
   let tileHeight = 83; // HEIGHT OF EACH ROW
   let tileWidth = 101; // WIDTH OF EACH COLUMN
   if (player.gameOverFlag === false) { // CONDITION TO PREVENT KEYSTROKES DURING GAMEOVER
      if (allowedKeys === 'up' && this.y > 1) { // && USED TO PREVENT PLAYER LEAVING CANVAS
         this.y -= tileHeight;
      }
      if (allowedKeys === 'down' && this.y < 403) {
         this.y += tileHeight;
      }
      if (allowedKeys === 'left' && this.x > 1) {
         this.x -= tileWidth;
      }
      if (allowedKeys === 'right' && this.x < 580) {
         this.x += tileWidth;
      }
   }
};
document.addEventListener('keyup', function(e) {
   let allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
   };
   player.handleInput(allowedKeys[e.keyCode]);
});


// ***************
// ENEMY CREATION
const Enemy = function(x, y, speed) { // ENEMY OJBECT
   this.x = x;
   this.y = y;
   this.speed = speed;
   this.sprite = 'images/enemy-bug.png';
};

randomNum = 1.1;
const enemy1 = new Enemy(1, 55, (randomNum * 325)); // NEW ENEMIES
const enemy5 = new Enemy(1, 138, (randomNum * 350));
const enemy2 = new Enemy(101, 138, (randomNum * 300));
const enemy6 = new Enemy(101, 221, (randomNum * 375));
const enemy3 = new Enemy(150, 221, (randomNum * 200));
const enemy7 = new Enemy(150, 304, (randomNum * 400));
const enemy4 = new Enemy(150, 304, (randomNum * 100));
const enemy8 = new Enemy(150, 55, (randomNum * 425));
let allEnemies = [enemy1, enemy2, enemy3, enemy4];


Enemy.prototype.update = function(dt) {
   this.x += this.speed * dt; // USING dt VALUE KEEPS CONSISTENCY OF SPEED FOR ALL ENEMIES
   if (this.x > 740) {
      this.x = -150;
   }
   // COLLISION DECTECTION
   if (player.x < this.x + 70 && player.x + 60 > this.x && player.y < this.y + 40 && 40 + player.y > this.y) {
      player.x = 304; // STARTING LOCATION AFTER COLLISION OCCURS
      player.y = 466;
      player.lives--;
   }
   // WHEN KILLED YOU LOOSE A LIFE AND EVENTUALLY TRIGGER GAME OVER
   if (player.lives == 2) {
      liveID.innerHTML = fullHeart + fullHeart + emptyHeart;
   }
   if (player.lives == 1) {
      liveID.innerHTML = fullHeart + emptyHeart + emptyHeart;
   }
   if (player.lives == 0) {
      liveID.innerHTML = emptyHeart + emptyHeart + emptyHeart; // 3 EMPTY HEARTS - GAME OVER
      gameOver(); // CALLS THE GAME OVER POPUP MODAL
      liveID.innerHTML = fullHeart + fullHeart + fullHeart; // RESTORES 3 LIVES AGAIN
   }
};

Enemy.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y); // PUTS THE ENEMIES ON THE CANVAS
};

let modal = document.getElementById("gameOver");

function gameOver() {
   player.gameOverFlag = true; // THIS TOGGLES GAMEOVER SO PLAYER CAN'T MOVE
   modal.style.display = "block";
   player.lives = 3; // RESETS LIVES
   score = 0;
   scoreID.innerHTML = "Score: " + score; // RESETS SCORE
   allEnemies = [enemy1, enemy2, enemy3, enemy4]; // RESETS ENEMIES
}

document.getElementById("btn").addEventListener("click", closeModal);
document.getElementById("cross").addEventListener("click", closeModal);

function closeModal() {
   player.gameOverFlag = false;
   modal.style.display = "none";
}

const Key = function(x, y) {
   this.x = x;
   this.y = y;
   this.score = score;
   this.sprite = 'images/Key.png';
};

var key = new Key(); // 106 or 2 / 45 is the second value

Key.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Key.prototype.update = function() {
   if (player.x < this.x + 70 && player.x + 60 > this.x && player.y < this.y + 40 && 40 + player.y > this.y) {
      this.x = 4000; // STARTING LOCATION AFTER COLLISION OCCURS
      this.y = 4000;
      this.score++;
      console.log(this.score);
   }
};


// Collision Detection: Using .abs to get absolute number otherwise it won't work
//    if (Math.abs(this.x - player.x) < 75 &&
//       Math.abs(this.y - player.y) < 78) {
//       player.x = 202;
//       player.y = 405;
//       player.lives -= 1;
//    }