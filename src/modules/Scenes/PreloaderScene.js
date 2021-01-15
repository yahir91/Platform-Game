import 'phaser';
 
export default class PreloaderScene extends Phaser.Scene {
  constructor () {
    super('Preloader');
  }

init () {
    this.readyCount = 0;
  }
   
ready () {
  this.scene.start('Title');
    this.readyCount++;
    if (this.readyCount === 5) {
      this.scene.start('Title');
    }
  }
preload () {

 
  // display progress bar
  var progressBar = this.add.graphics();
  var progressBox = this.add.graphics();
  // progressBox.fillStyle(0x222222, 0.8);
  // progressBox.fillRect(240, 270, 320, 50);
 
  var width = this.cameras.main.width;
  var height = this.cameras.main.height;
  var loadingText = this.make.text({
    x: width / 2,
    y: height / 2 - 50,
    text: 'Loading...',
    style: {
      font: '20px monospace',
      fill: '#ffffff'
    }
  });
  loadingText.setOrigin(0.5, 0.5);
 
  var percentText = this.make.text({
    x: width / 2,
    y: height / 2 - 5,
    text: '0%',
    style: {
      font: '18px monospace',
      fill: '#ffffff'
    }
  });
  percentText.setOrigin(0.5, 0.5);
 
  var assetText = this.make.text({
    x: width / 2,
    y: height / 2 + 50,
    text: '',
    style: {
      font: '18px monospace',
      fill: '#ffffff'
    }
  });
  assetText.setOrigin(0.5, 0.5);
 
  // update progress bar
  this.load.on('progress', function (value) {
    percentText.setText(parseInt(value * 100) + '%');
    // progressBar.clear();
    // progressBar.fillStyle(0xffffff, 1);
    // progressBar.fillRect(250, 280, 300 * value, 30);
  });
 
  // update file progress text
  this.load.on('fileprogress', function (file) {
    assetText.setText('Loading asset: ' + file.key);
  });
 
 // remove progress bar when complete
  this.load.on('complete', function () {
  // progressBar.destroy();
  // progressBox.destroy();
  loadingText.destroy();
  percentText.destroy();
  assetText.destroy();
  this.ready();
  }.bind(this));
 
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
  this.load.image("platform", "./src/assets/img/platform.png");
  this.load.image('background', './src/assets/img/background.png');
  this.load.image('character', 'src/assets/img/dog_logo.jpg');
  this.load.spritesheet('loadIcon', './src/assets/img/load.png', {
      frameWidth: 100,
      frameHeight: 110,
    });
  this.load.spritesheet("player", "./src/assets/img/Pixelart Dog Walk.png", {
      frameWidth: 50,
      frameHeight: 34
  });
  this.load.spritesheet("coin", "./src/assets/img/femur.png", {
      frameWidth: 41,
      frameHeight: 42,
  });
  this.load.spritesheet("fire", "./src/assets/img/monster.png", {
      frameWidth: 60,
      frameHeight: 50
  });
  this.load.spritesheet("mountain", "./src/assets/img/mountain.png", {
      frameWidth: 512,
      frameHeight: 512
  });
}
};