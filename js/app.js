/* jshint esversion: 6 */


// GLOBAL VARS
let lives = 3;
const fullHeart = '<i class="fas fa-heart"></i>';
const emptyHeart = '<i class="far fa-heart"></i>';
const live = document.getElementById("heart-container");
live.innerHTML = fullHeart + fullHeart + fullHeart; // LOADING 3 HEARTS FOR THE GAME START


// ***************
// PLAYER CREATION
const Player = function(x, y) { // PLAYER OBJECT
   this.x = x;
   this.y = y;
   this.sprite = 'images/char-horn-girl.png';
};

const player = new Player(304, 466); // ONE PLAYER CREATED

Player.prototype.render = function() { // PUTTING PLAYER ON CANVAS
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() { // REFRESHES PLAYER FRAMERATE

};

// **********************
// PLAY MOVEMENT CONTROLS
Player.prototype.handleInput = function(allowedKeys) {
   let tileHeight = 83; // HEIGHT OF EACH ROW
   let tileWidth = 101; // WIDTH OF EACH COLUMN
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

const enemy1 = new Enemy(1, 55, 400); // NEW ENEMIES
const enemy2 = new Enemy(101, 138, 300);
const enemy3 = new Enemy(150, 221, 200);
const enemy4 = new Enemy(150, 304, 100);
const allEnemies = [enemy1, enemy2, enemy3, enemy4];

Enemy.prototype.update = function(dt) {
   this.x += this.speed * dt; // USING dt VALUE KEEPS CONSISTENCY OF SPEED FOR ALL ENEMIES
   if (this.x > 740) {
      this.x = -150;
   }
   // COLLISION DECTECTION
   if (player.x < this.x + 70 && player.x + 60 > this.x && player.y < this.y + 40 && 40 + player.y > this.y) {
      player.x = 304; // STARTING LOCATION AFTER COLLISION OCCURS
      player.y = 466;
      lives--;
   }
   // WHEN KILLED YOU LOOSE A LIFE AND EVENTUALLY TRIGGER GAME OVER
   if (lives == 2) {
      live.innerHTML = fullHeart + fullHeart + emptyHeart;
   }
   if (lives == 1) {
      live.innerHTML = fullHeart + emptyHeart + emptyHeart;
   }
   if (lives == 0) {
      live.innerHTML = emptyHeart + emptyHeart + emptyHeart; // 3 EMPTY HEARTS - GAME OVER
      // gameOver();
   }

};

Enemy.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y); // PUTS THE ENEMY ON THE CANVAS
};

function gameOver() {

}

// Heart.prototype.update = function() {};
// *******************************************************************
// *******************************************************************
// *******************************************************************

// // Enemies our player must avoid. Passed x and y arguments
// var Enemy = function(x, y, velocity) {
//    // Variables applied to each of our instances go here,
//    // we've provided one for you to get started
//
//    // The image/sprite for our enemies, this uses
//    // a helper we've provided to easily load images
//    this.x = x;
//    this.y = y;
//    this.velocity = getRandomInt(80, 250);
//    this.sprite = 'images/enemy-bug.png';
// };
//
// // Update the enemy's position, required method for game
// // Parameter: dt, a time delta between ticks
// Enemy.prototype.update = function(dt) {
//    // You should multiply any movement by the dt parameter
//    // which will ensure the game runs at the same speed for
//    // all computers.
//    this.x += this.velocity * dt;
//    if (this.x > 550) {
//       this.x = -150;
//    }
//    // Collision Detection: Using .abs to get absolute number otherwise it won't work
//    if (Math.abs(this.x - player.x) < 75 &&
//       Math.abs(this.y - player.y) < 78) {
//       player.x = 202;
//       player.y = 405;
//       player.lives -= 1;
//    }
//
// };
//
// // Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
//    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };
//
// // Player class. Passed x and y arguments
// // This class requires an update(), render() and
// // a handleInput() method.
//
// const Player = function(x, y) {
//    this.score = 0;
//    this.lives = 3;
//    this.x = x;
//    this.y = y;
//    this.sprite = 'images/char-horn-girl.png';
//    this.gameOver = false;
//    this.pauseKey = false;
// };
//
// // Condition used to stop random key strokes
// Player.prototype.update = function() {
//    //Return the player back once they hit water: With delay
//    if (this.y < 0) {
//       this.pauseKey = true; //stop keyboard
//       //this makes sure player does not dance randomly
//       setTimeout(() => {
//          this.pauseKey = false;
//       }, 1000);
//       //this is the actual functionality
//       setTimeout(() => {
//          this.x = 202;
//          this.y = 405;
//          console.log("time!");
//       }, 500);
//    }
// };
//
// //Draw the player
// Player.prototype.render = function() {
//    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };
//
// Player.prototype.handleInput = function(key) {
//    //conditions to start/stop the keystroke
//    this.lives === 0 ? this.gameOver = true : this.gameOver = false;
//    if (player.gameOver || player.pauseKey) return;
//    switch (key) {
//       case 'up':
//          this.y -= 85;
//          break;
//       case 'down':
//          this.y += 85;
//          break;
//       case 'left':
//          this.x -= 100;
//          break;
//       case 'right':
//          this.x += 100;
//          break;
//    };
//    //These conditions are required so player stays in canvas
//    if (this.x <= 2) this.x = 2;
//    if (this.x >= 400) this.x = 400;
//    if (this.y >= 405 || this.y <= -85) this.y = 405;
//    if (this.y < 0) player.score += 1;
// }
//
// // Now instantiate your objects.
// // Place all enemy objects in an array called allEnemies
// const allEnemies = [
//    enemy1 = new Enemy(60, 60),
//    enemy2 = new Enemy(150, 145),
//    enemy3 = new Enemy(300, 230)
// ];


// // This returns a random integer between the specified values (from MDN)
// function getRandomInt(min, max) {
//    min = Math.ceil(min);
//    max = Math.floor(max);
//    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
// }