let guy, green, lime;
let characters = [];

function preload() {
  guy = loadImage("media/SpelunkyGuy.png");
  green = loadImage("media/Green.png");
  lime = loadImage("media/Lime.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);

  // Creating character instances and storing them in an array
  characters.push(new Character(random(80, width - 80), random(80, height - 80), guy));
  characters.push(new Character(random(80, width - 80), random(80, height - 80), green));
  characters.push(new Character(random(80, width - 80), random(80, height - 80), lime));
}

function draw() {
  background(220);

  // Draw each character
  for (let character of characters) {
    character.draw();
  }
}

function keyPressed() {
  for (let character of characters) {
    character.keyPressed();
  }
}

function keyReleased() {
  for (let character of characters) {
    character.keyReleased();
  }
}

class Character {
  constructor(x, y, spriteSheet) {
    this.x = x;
    this.y = y;
    this.currentAnimation = "stand";
    this.animations = {};
    this.spriteSheet = spriteSheet;

    this.addAnimation("down", new SpriteAnimation(spriteSheet, 6, 5, 6));
    this.addAnimation("up", new SpriteAnimation(spriteSheet, 0, 5, 6));
    this.addAnimation("stand", new SpriteAnimation(spriteSheet, 0, 0, 1));
    this.addAnimation("right", new SpriteAnimation(spriteSheet, 0, 9, 4));
    this.addAnimation("left", new SpriteAnimation(spriteSheet, 0, 9, 4));
  }

  addAnimation(key, animation) {
    this.animations[key] = animation;
  }

  draw() {
    let animation = this.animations[this.currentAnimation];
    if (animation) {
      switch (this.currentAnimation) {
        case "up":
          this.y -= 2;
          break;
        case "down":
          this.y += 2;
          break;
        case "right":
          this.x += 2;
          break;
        case "left":
          this.x -= 2;
          break;
      }
      push();
      translate(this.x, this.y);
      animation.draw();
      pop();
    }
  }

  keyPressed() {
    switch (keyCode) {
      case UP_ARROW:
        this.currentAnimation = "up";
        break;
      case DOWN_ARROW:
        this.currentAnimation = "down";
        break;
      case RIGHT_ARROW:
        this.currentAnimation = "right";
        break;
      case LEFT_ARROW:
        this.currentAnimation = "left";
        this.animations["left"].flipped = true;
        break;
    }
  }

  keyReleased() {
    if (keyCode === LEFT_ARROW) {
      this.currentAnimation = "stand";
      this.animations["stand"].flipped = true;
    } else {
      this.currentAnimation = "stand";
      this.animations["stand"].flipped = false;
    }
  }
}

class SpriteAnimation {
  constructor(spritesheet, startU, startV, duration) {
    this.spritesheet = spritesheet;
    this.u = startU;
    this.v = startV;
    this.duration = duration;
    this.startU = startU;
    this.frameCount = 0;
    this.flipped = false;
  }

  draw() {
    let s = this.flipped ? -1 : 1;
    scale(s, 1);
    image(this.spritesheet, 0, 0, 80, 80, this.u * 80, this.v * 80, 80, 80);

    this.frameCount++;
    if (this.frameCount % 10 === 0) this.u++;

    if (this.u === this.startU + this.duration) this.u = this.startU;
  }
}
