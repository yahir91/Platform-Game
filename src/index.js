import 'phaser';
import config from './modules/Config/config';
import GameScene from './modules/scenes/gamescenes';
 
class Game extends Phaser.Game {
  constructor () {
    super(config);
    this.scene.add('Game', GameScene);
    this.scene.start('Game');
  }
}
 
window.game = new Game();