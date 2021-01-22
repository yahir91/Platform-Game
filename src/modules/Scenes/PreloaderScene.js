/* eslint-disable radix */
import Phaser from 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.scene.start('Title');
    this.readyCount += 1;
    if (this.readyCount === 5) {
      this.scene.start('Title');
    }
  }

  preload() {
    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);


    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100)}%`);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });


    this.load.on('complete', () => {
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    this.load.image('logo', './src/assets/img/logo.png');
    this.load.image('playButton', './src/assets/img/ui/Button.png');
    this.load.image('playButton2', './src/assets/img/ui/ButtonPressed.png');
    this.load.image('blueButton1', './src/assets/img/ui/blue_button02.png');
    this.load.image('blueButton2', './src/assets/img/ui/blue_button03.png');
    this.load.image('phaserLogo', '/src/assets/img/logo.png');
    this.load.image('box', './src/assets/img/ui/grey_box.png');
    this.load.image('checkedBox', './src/assets/img/ui/blue_boxCheckmark.png');
    this.load.audio('bgMusic', ['./src/assets/TownTheme.mp3']);
    this.load.image('platform', './src/assets/img/platform.png');
    this.load.image('background', './src/assets/img/rsz_game_background_2.png');
    this.load.image('character', 'src/assets/img/dog_logo.jpg');
    this.load.spritesheet('loadIcon', './src/assets/img/load.png', {
      frameWidth: 100,
      frameHeight: 110,
    });
    this.load.spritesheet('player', './src/assets/mage_walk.png', {
      frameWidth: 50,
      frameHeight: 60,
    });
    this.load.spritesheet('player-jump', './src/assets/jump2.png', {
      frameWidth: 53,
      frameHeight: 60,
    });
    this.load.spritesheet('player-attack', './src/assets/attack.png', {
      frameWidth: 83,
      frameHeight: 60,
    });
    this.load.spritesheet('coin', './src/assets/assasin_idle.png', {
      frameWidth: 62,
      frameHeight: 60,
    });
    this.load.spritesheet('fire', './src/assets/img/monster.png', {
      frameWidth: 60,
      frameHeight: 50,
    });
    this.load.spritesheet('mountain', './src/assets/img/mountain.png', {
      frameWidth: 512,
      frameHeight: 512,
    });
  }
}