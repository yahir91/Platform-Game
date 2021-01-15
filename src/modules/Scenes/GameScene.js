/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
import 'phaser';

const gameOptions = {

  // platform speed range, in pixels per second
  platformSpeedRange: [300, 300],

  // mountain speed, in pixels per second
  mountainSpeed: 80,

  // spawn range, how far should be the rightmost platform from the right edge
  // before next platform spawns, in pixels
  spawnRange: [80, 300],

  // platform width range, in pixels
  platformSizeRange: [200, 300],

  // a height range between rightmost platform and next platform to be spawned
  platformHeightRange: [-5, 5],

  // a scale to be multiplied by platformHeightRange
  platformHeighScale: 20,

  // platform max and min height, as screen height ratio
  platformVerticalLimit: [0.4, 0.8],

  // player gravity
  playerGravity: 900,

  // player jump force
  jumpForce: 400,

  // player starting X position
  playerStartPosition: 200,

  // consecutive jumps allowed
  jumps: 2,

  // % of probability a coin appears on the platform
  coinPercent: 100,

  // % of probability a fire appears on the platform
  firePercent: 25,
};

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // load images
    this.load.image('logo', './src/assets/img/logo.png');
  }

  create() {
    this.score = 0;

    const style = 'font: 10px Dragon; color: white';
    this.scoreText = this.add.text(120, 40, 'score: 0', `${style}`);
    // this.scoreText = add.text(16, 16, 'score: 0', {
    //     fontSize: '32px',
    //     fill: '#000',
    //   });
    // setting player animation
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player', {
        start: 0,
        end: 9,
      }),
      frameRate: 10,
      repeat: 0,
    });
    // setting coin animation

    //   this.anims.create({
    //       key: "rotate",
    //       frames: this.anims.generateFrameNumbers("coin", {
    //           start: 0,
    //           end: 5
    //       }),
    //       frameRate: 15,
    //       yoyo: true,
    //       repeat: -1
    //   });


    // setting fire animation
    this.anims.create({
      key: 'burn',
      frames: this.anims.generateFrameNumbers('fire', {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // group with all active mountains.
    this.mountainGroup = this.add.group();

    // group with all active platforms.
    this.platformGroup = this.add.group({

      // once a platform is removed, it's added to the pool
      removeCallback(platform) {
        platform.scene.platformPool.add(platform);
      },
    });

    // platform pool
    this.platformPool = this.add.group({

      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback(platform) {
        platform.scene.platformGroup.add(platform);
      },
    });

    // group with all active coins.
    this.coinGroup = this.add.group({

      // once a coin is removed, it's added to the pool
      removeCallback(coin) {
        coin.scene.coinPool.add(coin);
      },
    });

    // coin pool
    this.coinPool = this.add.group({

      // once a coin is removed from the pool, it's added to the active coins group
      removeCallback(coin) {
        coin.scene.coinGroup.add(coin);
      },
    });

    // group with all active firecamps.
    this.fireGroup = this.add.group({

      // once a firecamp is removed, it's added to the pool
      removeCallback(fire) {
        fire.scene.firePool.add(fire);
      },
    });

    // fire pool
    this.firePool = this.add.group({

      // once a fire is removed from the pool, it's added to the active fire group
      removeCallback(fire) {
        fire.scene.fireGroup.add(fire);
      },
    });

    // adding a mountain
    this.addMountains();

    // keeping track of added platforms
    this.addedPlatforms = 0;

    // number of consecutive jumps made by the player so far
    this.playerJumps = 0;

    // adding a platform to the game, the arguments are platform width, x position and y position
    this.addPlatform(game.config.width, game.config.width / 2, game.config.height * gameOptions.platformVerticalLimit[1]); // eslint-disable-line 

    // adding the player;
    this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height * 0.7, 'player');
    this.player.setGravityY(gameOptions.playerGravity);
    this.player.setDepth(2);

    // the player is not dying
    this.dying = false;

    // setting collisions between the player and the platform group
    this.platformCollider = this.physics.add.collider(this.player, this.platformGroup, function () { // eslint-disable-line 
      // play "run" animation if the player is on a platform
      if (!this.player.anims.isPlaying) {
        this.player.anims.play('run');
      }
    }, null, this);

    // setting collisions between the player and the coin group
    this.physics.add.overlap(this.player, this.coinGroup, function (player, coin) { // eslint-disable-line 
      this.tweens.add({
        targets: coin,
        y: coin.y - 100,
        alpha: 0,
        duration: 800,
        ease: 'Cubic.easeOut',
        callbackScope: this,
        onComplete() {
          this.coinGroup.killAndHide(coin);
          this.coinGroup.remove(coin);
          this.score += 10;
          this.scoreText.setText(`Score: ${this.score}`);
        },
      });
    }, null, this);

    // setting collisions between the player and the fire group
    this.physics.add.overlap(this.player, this.fireGroup, function (player, fire) { // eslint-disable-line 
      this.dying = true;
      this.player.anims.stop();
      this.player.setFrame(2);
      this.player.body.setVelocityY(-200);
      this.physics.world.removeCollider(this.platformCollider);
    }, null, this);

    // checking for input
    this.input.on('pointerdown', this.jump, this);
  }

  // adding mountains
  addMountains() {
    const rightmostMountain = this.getRightmostMountain();
    if (rightmostMountain < game.config.width * 2) {
      const mountain = this.physics.add.sprite(rightmostMountain + Phaser.Math.Between(100, 350), game.config.height + Phaser.Math.Between(0, 100), 'mountain');
      mountain.setOrigin(0.5, 1);
      mountain.body.setVelocityX(gameOptions.mountainSpeed * -1);
      this.mountainGroup.add(mountain);
      if (Phaser.Math.Between(0, 1)) {
        mountain.setDepth(1);
      }
      mountain.setFrame(Phaser.Math.Between(0, 3));
      this.addMountains();
    }
  }

  // getting rightmost mountain x position
  getRightmostMountain() {
    let rightmostMountain = -200;
    this.mountainGroup.getChildren().forEach((mountain) => {
      rightmostMountain = Math.max(rightmostMountain, mountain.x);
    });
    return rightmostMountain;
  }

  // the core of the script: platform are added from the pool or created on the fly
  addPlatform(platformWidth, posX, posY) { // eslint-disable-line 
    this.addedPlatforms++; // eslint-disable-line 
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.y = posY;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
      const newRatio = platformWidth / platform.displayWidth;
      platform.displayWidth = platformWidth;
      platform.tileScaleX = 1 / platform.scaleX;
    } else {
      platform = this.add.tileSprite(posX, posY, platformWidth, 32, 'platform');
      this.physics.add.existing(platform);
      platform.body.setImmovable(true);
      platform.body.setVelocityX(Phaser.Math.Between(gameOptions.platformSpeedRange[0], gameOptions.platformSpeedRange[1]) * -1); // eslint-disable-line 
      platform.setDepth(2);
      this.platformGroup.add(platform);
    }
    this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]); // eslint-disable-line 

    // if this is not the starting platform...
    if (this.addedPlatforms > 1) {
      // is there a coin over the platform?
      if (Phaser.Math.Between(1, 100) <= gameOptions.coinPercent) {
        if (this.coinPool.getLength()) {
          const coin = this.coinPool.getFirst();
          coin.x = posX;
          coin.y = posY - 96;
          coin.alpha = 1;
          coin.active = true;
          coin.visible = true;
          this.coinPool.remove(coin);
        } else {
          const coin = this.physics.add.sprite(posX, posY - 96, 'coin');
          coin.setImmovable(true);
          coin.setVelocityX(platform.body.velocity.x);
          coin.anims.play('rotate');
          coin.setDepth(2);
          this.coinGroup.add(coin);
        }
      }

      // is there a fire over the platform?
      if (Phaser.Math.Between(1, 100) <= gameOptions.firePercent) {
        if (this.firePool.getLength()) {
          const fire = this.firePool.getFirst();
          fire.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth);
          fire.y = posY - 46;
          fire.alpha = 1;
          fire.active = true;
          fire.visible = true;
          this.firePool.remove(fire);
        } else {
          const fire = this.physics.add.sprite(posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth), posY - 46, 'fire');
          fire.setImmovable(true);
          fire.setVelocityX(platform.body.velocity.x);
          fire.setSize(8, 2, true);
          fire.anims.play('burn');
          fire.setDepth(2);
          this.fireGroup.add(fire);
        }
      }
    }
  }

  // and obviously if the player is not dying
  jump() {
    if ((!this.dying) && (this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps))) { // eslint-disable-line 
      if (this.player.body.touching.down) {
        this.playerJumps = 0;
      }
      this.player.setVelocityY(gameOptions.jumpForce * -1);
      this.playerJumps++; // eslint-disable-line 

      // stops animation
      this.player.anims.stop();
    }
  }

  update() {
    // game over
    if (this.player.y > game.config.height) {
      this.scene.start('Submit', this.score);
    }

    this.player.x = gameOptions.playerStartPosition;

    // recycling platforms
    let minDistance = game.config.width;
    let rightmostPlatformHeight = 0;
    this.platformGroup.getChildren().forEach(function (platform) { // eslint-disable-line 
      const platformDistance = game.config.width - platform.x - platform.displayWidth / 2;
      if (platformDistance < minDistance) {
        minDistance = platformDistance;
        rightmostPlatformHeight = platform.y;
      }
      if (platform.x < -platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);

    // recycling coins
    this.coinGroup.getChildren().forEach(function (coin) { // eslint-disable-line 
      if (coin.x < -coin.displayWidth / 2) {
        this.coinGroup.killAndHide(coin);
        this.coinGroup.remove(coin);
      }
    }, this);

    // recycling fire
    this.fireGroup.getChildren().forEach(function (fire) { // eslint-disable-line 
      if (fire.x < -fire.displayWidth / 2) {
        this.fireGroup.killAndHide(fire);
        this.fireGroup.remove(fire);
      }
    }, this);

    // recycling mountains
    this.mountainGroup.getChildren().forEach(function (mountain) { // eslint-disable-line 
      if (mountain.x < -mountain.displayWidth) {
        const rightmostMountain = this.getRightmostMountain();
        mountain.x = rightmostMountain + Phaser.Math.Between(100, 350);
        mountain.y = game.config.height + Phaser.Math.Between(0, 100);
        mountain.setFrame(Phaser.Math.Between(0, 3));
        if (Phaser.Math.Between(0, 1)) {
          mountain.setDepth(1);
        }
      }
    }, this);

    // adding new platforms
    if (minDistance > this.nextPlatformDistance) {
      const nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]); // eslint-disable-line 
      const platformRandomHeight = gameOptions.platformHeighScale * Phaser.Math.Between(gameOptions.platformHeightRange[0], gameOptions.platformHeightRange[1]); // eslint-disable-line 
      const nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
      const minPlatformHeight = game.config.height * gameOptions.platformVerticalLimit[0];
      const maxPlatformHeight = game.config.height * gameOptions.platformVerticalLimit[1];
      const nextPlatformHeight = Phaser.Math.Clamp(nextPlatformGap, minPlatformHeight, maxPlatformHeight); // eslint-disable-line  
      this.addPlatform(nextPlatformWidth, game.config.width + nextPlatformWidth / 2, nextPlatformHeight); // eslint-disable-line 
    }
  }
}