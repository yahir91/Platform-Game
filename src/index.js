import 'phaser';
import config from './modules/Config/config';
import GameScene from './modules/Scenes/GameScene';
import BootScene from './modules/Scenes/BootScene';
import PreloaderScene from './modules/Scenes/PreloaderScene';
import TitleScene from './modules/Scenes/TitleScene';
import OptionsScene from './modules/Scenes/OptionsScene';
import CreditsScene from './modules/Scenes/CreditsScene';
 
class Game extends Phaser.Game {
  constructor () {
    super(config);
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.start('Preloader');
  }
}
 
window.game = new Game();