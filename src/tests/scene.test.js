import GameScene from '../modules/Scenes/GameScene';
import BootScene from '../modules/Scenes/BootScene';
import PreloaderScene from '../modules/Scenes/PreloaderScene';
import TitleScene from '../modules/Scenes/TitleScene';
import OptionsScene from '../modules/Scenes/OptionsScene';
import CreditsScene from '../modules/Scenes/CreditsScene';
import SubmitScoreScene from '../modules/Scenes/SubmitScoreScene';
import ScoresScene from '../modules/Scenes/ScoreScene';


describe('Testing Scenes Constructors', () => {
    test(' Game scene is a function', () => {
      expect(typeof GameScene).toBe('function');
    });
  
    test('if  ScoresScene is a function', () => {
      expect(typeof ScoresScene).toBe('function');
    });
  
    test('if  OptionsScene is a function', () => {
      expect(typeof OptionsScene).toBe('function');
    });
  
    test('if  BootScene is a function', () => {
      expect(typeof BootScene).toBe('function');
    });
  
    test('if  TitleScene is a function', () => {
      expect(typeof TitleScene).toBe('function');
    });
  
    test('if  PreloaderScene is a function', () => {
      expect(typeof PreloaderScene).toBe('function');
    });
  
    test('if CreditScene is a function', () => {
      expect(typeof CreditsScene).toBe('function');
    });
  
    test('if  SubmitScoreScene is a function', () => {
      expect(typeof SubmitScoreScene).toBe('function');
    });
  });