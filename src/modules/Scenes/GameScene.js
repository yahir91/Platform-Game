import Phaser from 'phaser';

const gameOptions = {
  platformStartSpeed: 350,
  spawnRange: [0, 200],
  platformSizeRange: [300, 400],
  playerGravity: 900,
  jumpForce: 400,
  playerStartPosition: 200,
  jumps: 2,
};


export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }


  create() {
    const { anims, physics, add } = this;

    add.image(480, 270, 'background');
    this.score = 0;

    this.addedPlatforms = 0;

    anims.create({
      key: 'run',
      frames: anims.generateFrameNumbers('player', { start: 0, end: 8 }),
      frameRate: 8,
      repeat: -1,
    });

    anims.create({
      key: 'jump',
      frames: [{ key: 'player-jump', frame: 0 }],
      frameRate: 12,
    });

    anims.create({
      key: 'attack',
      frames: anims.generateFrameNumbers('player-attack', { start: 0, end: 6 }),
      frameRate: 24,
    });

    anims.create({
      key: 'idle',
      frames: anims.generateFrameNumbers('coin', { start: 0, end: 4 }),
      frameRate: 8,
      repeat: -1,
    });

    this.platformGroup = add.group({
      removeCallback(platform) {
        platform.scene.platformPool.add(platform);
      },
    });

    this.platformPool = add.group({
      removeCallback(platform) {
        platform.scene.platformGroup.add(platform);
      },
    });

    this.coinGroup = add.group({
      removeCallback(coin) {
        coin.scene.coinPool.add(coin);
      },
    });

    this.coinPool = add.group({
      removeCallback(coin) {
        coin.scene.coinGroup.add(coin);
      },
    });


    this.playerJumps = 0;


    this.addPlatform(800, 800 / 2);

    this.player = physics.add.sprite(gameOptions.playerStartPosition, 600 / 2, 'player');
    this.player.setGravityY(gameOptions.playerGravity);


    this.platformCollider = this.physics.add.collider(this.player, this.platformGroup, () => {
      if (!this.player.anims.isPlaying) {
        this.player.anims.play('run');
      }
    });

    physics.add.overlap(this.player, this.coinGroup, this.killOverlapEnemy, null, this);


    this.input.on('pointerdown', this.attack, this);
    this.input.keyboard.on('keydown-SPACE', this.jump, this);

    this.scoreText = add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#000',
    });
  }

  killOverlapEnemy(player, coin) {
    if (this.player.anims.isPlaying && player.anims.currentAnim.key === 'attack') {
      this.coinGroup.killAndHide(coin);
      this.coinGroup.remove(coin);
      this.score += 10;
      this.scoreText.setText(`Score: ${this.score}`);
    } else {
      this.dying = true;
      this.player.anims.stop();
      this.player.setFrame(2);
      this.player.body.setVelocityY(-200);
      this.physics.world.removeCollider(this.platformCollider);
    }
  }


  addCoin(posX) {
    let coin;
    if (this.coinPool.getLength()) {
      coin = this.coinPool.getFirst();
      coin.x = posX;
      coin.active = true;
      coin.visible = true;
      this.coinPool.remove(coin);
    } else {
      coin = this.physics.add.sprite(posX, 600 * 0.7, 'coin');

      coin.setVelocityX(gameOptions.platformStartSpeed * -1);
      coin.anims.play('idle');

      this.coinGroup.add(coin);
    }
  }

  addPlatform(platformWidth, posX) {
    let platform;
    this.addedPlatforms += 1;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
    } else {
      platform = this.physics.add.sprite(posX, 600 * 0.8, 'platform');
      platform.setImmovable(true);
      platform.setVelocityX(gameOptions.platformStartSpeed * -1);
      this.platformGroup.add(platform);
    }
    platform.displayWidth = platformWidth;
    this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0],
      gameOptions.spawnRange[1]);
    const coinAppear = Phaser.Math.Between(0, 10);
    if (coinAppear > 5 && this.addedPlatforms > 1) {
      this.addCoin(posX);
    }
  }

  jump() {
    if (this.player.body.touching.down || (this.playerJumps > 0
       && this.playerJumps < gameOptions.jumps)) {
      if (this.player.body.touching.down) {
        this.playerJumps = 0;
      }
      this.player.anims.play('jump');
      this.player.setVelocityY(gameOptions.jumpForce * -1);
      this.playerJumps += 1;
    }
  }

  attack() {
    this.player.anims.play('attack');
  }


  update() {
    if (this.player.y > 600) {
      this.scene.start('Submit', this.score);
    }
    this.player.x = gameOptions.playerStartPosition;

    let minDistance = 800;
    this.platformGroup.getChildren().forEach((platform) => {
      const platformDistance = 800 - platform.x - platform.displayWidth / 2;
      minDistance = Math.min(minDistance, platformDistance);
      if (platform.x < -platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);


    this.coinGroup.getChildren().forEach((coin) => {
      if (coin.x < -20) {
        this.coinGroup.killAndHide(coin);
        this.coinGroup.remove(coin);
      }
    }, this);

    if (minDistance > this.nextPlatformDistance) {
      const nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0],
        gameOptions.platformSizeRange[1]);
      this.addPlatform(nextPlatformWidth, 800 + nextPlatformWidth / 2);
    }
  }
}