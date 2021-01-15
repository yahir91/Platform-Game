/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */

export default class Model {
  constructor() {
    this._soundOn = true;// eslint-disable-line 
    this._musicOn = true;// eslint-disable-line 
    this._bgMusicPlaying = false;// eslint-disable-line 
  }

  set musicOn(value) {
    this._musicOn = value;// eslint-disable-line 
  }

  get musicOn() {
    return this._musicOn;// eslint-disable-line 
  }

  set soundOn(value) {
    this._soundOn = value;// eslint-disable-line 
  }

  get soundOn() {
    return this._soundOn;// eslint-disable-line 
  }

  set bgMusicPlaying(value) {
    this._bgMusicPlaying = value;// eslint-disable-line 
  }

  get bgMusicPlaying() {
    return this._bgMusicPlaying;// eslint-disable-line 
  }
}
