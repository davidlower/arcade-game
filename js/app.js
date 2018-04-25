/* jshint esversion: 6 */

// GLOBAL VARS
let score = 0;
let modal = document.getElementById("gameOver");
let modal1 = document.getElementById("gameComplete");
const fullHeart = '<i class="fas fa-heart"></i>';
const emptyHeart = '<i class="far fa-heart"></i>';
const liveID = document.getElementById("heart-container");
const scoreID = document.getElementById("score");
const keyID = document.getElementById("key-container");
const startModal = document.getElementById("startModal");
startModal.style.display = "block"; // OPENS THE INTRODUCTION MODAL ON BROWSER REFRESH

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
   if (this.y < 0 && key.score == 1 && score > 30000) {
      gameComplete();
   }
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
      key.x = 106; // KEY APPEARS ON THE CANVAS
      key.y = 45;
   }
};

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
document.addEventListener('keyup', (e) => {
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

randomNum = 1.1; // RANDOM NUMBER CONTROL. GIVES ME OPTION TO QUICKLY CHANGE SPEED OF ENEMIES
const enemy1 = new Enemy(1, 55, (randomNum * 325)); // NEW ENEMIES
const enemy2 = new Enemy(101, 138, (randomNum * 300));
const enemy3 = new Enemy(150, 221, (randomNum * 200));
const enemy4 = new Enemy(150, 304, (randomNum * 100));
const enemy5 = new Enemy(1, 138, (randomNum * 350));
const enemy6 = new Enemy(101, 221, (randomNum * 375));
const enemy7 = new Enemy(150, 304, (randomNum * 400));
const enemy8 = new Enemy(150, 55, (randomNum * 425));

Enemy.prototype.update = function(dt) {
   this.x += this.speed * dt; // USING dt VALUE KEEPS CONSISTENCY OF SPEED FOR ALL ENEMIES
   if (this.x > 740) {
      this.x = -150;
   }
   // COLLISION DECTECTION
   if ((player.x < this.x + 70 && player.x + 60 > this.x) && (player.y < this.y + 40 && player.y + 40 > this.y)) {
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
   }
};

Enemy.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y); // PUTS THE ENEMIES ON THE CANVAS
};


function gameOver() {
   player.gameOverFlag = true; // THIS TOGGLES GAMEOVER SO PLAYER CAN'T MOVE
   modal.style.display = "block";
   reset();
}

function gameComplete() {
   player.gameOverFlag = true; // THIS TOGGLES GAMEOVER SO PLAYER CAN'T MOVE
   modal1.style.display = "block";
   reset();
}

function reset() {
   player.lives = 3; // RESETS LIVES
   liveID.innerHTML = fullHeart + fullHeart + fullHeart; // RESTORES 3 LIVES TO INVENTORY
   score = 0; // RESETS SCORE COUNTER
   scoreID.innerHTML = "Score: " + 0; // RESETS SCORE
   key.score = 0; // TAKES AWAY RECOGNITION PLAYER IS CARRYING THE KEY
   keyID.innerHTML = ""; // REMOVES KEY FROM INVENTORY
   key.x = 1000;
   key.y = 1000;
   allEnemies = [enemy1, enemy2, enemy3, enemy4, key]; // RESETS ENEMIES
}

document.getElementById("btn1").addEventListener("click", closeModal);
document.getElementById("btn2").addEventListener("click", closeModal);
document.getElementById("cross1").addEventListener("click", closeModal);
document.getElementById("cross2").addEventListener("click", closeModal);
document.getElementById("cross3").addEventListener("click", closeModal);

function closeModal() {
   player.gameOverFlag = false;
   modal.style.display = "none";
   modal1.style.display = "none";
   startModal.style.display = "none";
}


// ***************
// KEY CREATION
const Key = function(x, y) { // KEY OBJECT CREATION
   this.x = x;
   this.y = y;
   this.score = score;
   this.sprite = 'images/Key.png';
};

let key = new Key(); // KEY CREATION

Key.prototype.render = function() { // PUTTING KEY ONTO CANVAS
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Key.prototype.update = function() {
   if (dist(this.x, this.y, player.x, player.y) <= 40) { // CALLING DIST FX
      this.x = 1000; // TAKING KEY OFF CANVAS
      this.y = 1000;
      this.score = 1; // ADDING TO KEYSCORE INDICATING PLAYER HAS THE KEY
      keyID.innerHTML = '<i class="fas fa-key"></i>'; // ADDING KEY TO INVENTORY
   }
};
// FIND THE LENGTH BETWEEN THE KEY AND PLAYER for COLLISION
function dist(x1, y1, x2, y2) {
   let lengthOfX = x2 - x1;
   let lengthOfY = y2 - y1;
   return Math.sqrt(Math.pow(lengthOfX, 2) + Math.pow(lengthOfY, 2)); // PYTHAGORAS THEOREM
}

let allEnemies = [enemy1, enemy2, enemy3, enemy4, key];