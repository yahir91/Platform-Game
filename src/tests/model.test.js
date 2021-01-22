import Model from '../Model';

const newModel = new Model();


describe('Test Model creation', () => {
  test('Testing if model returns an object', () => {
    expect(typeof newModel).toBe('object');
  });
  test('Testing if that object have the right attributes', () => {
    expect(newModel).toHaveProperty('soundOn');
  });
  test('Testing if that object have the right attributes', () => {
    expect(newModel).toHaveProperty('musicOn');
  });
  test('Testing if that object have the right attributes', () => {
    expect(newModel).toHaveProperty('bgMusicPlaying');
  });
});

describe('Test right values of model properties', () => {
  test('Testing if that object have the right attributes', () => {
    expect(newModel.soundOn).toBe(true);
  });
  test('Testing if that object have the right attributes', () => {
    expect(newModel.musicOn).toBe(true);
  });
  test('Testing if that object have the right attributes', () => {
    expect(newModel.bgMusicPlaying).toBe(false);
  });
});