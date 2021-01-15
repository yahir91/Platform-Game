/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', './src/assets/img/dog_logo.jpg');
  }

  create() {
    this.scene.start('Preloader');
  }
}