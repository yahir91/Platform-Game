import 'phaser';
 
export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }
 
preload () {
  this.load.image('logo', './src/assets/img/dog_logo.jpg');
}
 
create () {
  this.scene.start('Preloader');
}
};