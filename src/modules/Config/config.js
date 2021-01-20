/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
import 'phaser';

// object containing configuration options
export default {
  type: Phaser.AUTO,
  width: 960,
  height: 540,

  backgroundColor: 0x0c88c7,
  dom: {
    createContainer: true,
  },
  // physics settings
  physics: {
    default: 'arcade',
  },
};
