/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
import 'phaser';
import { submitScore } from '../../scores';


export default class SubmitScore extends Phaser.Scene {
  init(data) {
    this.score = data;
  }

  constructor() {
    super('Submit');
  }

  create() {
    let name = '';

    this.anims.create({
      key: 'loading',
      frames: this.anims.generateFrameNumbers('loadIcon', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });

    this.loadIcon = this.add.sprite(400, 300, 'loadIcon');
    this.loadIcon.visible = false;
    const body = document.querySelector('body');
    const form = document.createElement('form');
    form.action = '';
    body.appendChild(form);
    const inputText = document.createElement('input');
    inputText.type = 'text';
    inputText.id = 'name';
    inputText.class = 'input';
    form.appendChild(inputText);
    const submitText = document.createElement('button');
    submitText.innerText = 'Submit';
    form.appendChild(submitText);


    const text = document.createElement('h2');
    text.innerText = 'Provide your Username press Enter and Wait to Submit';
    text.id = 'text';
    text.class = 'text';
    body.appendChild(text);

    form.addEventListener('submit', e => {
      e.preventDefault();
      const test = document.createElement('h4');
      name = document.getElementById('name').value;
      if (name.length >= 5) {
        this.loadIcon.visible = true;
        this.loadIcon.anims.play('loading');
        const result = submitScore(name, this.score);
        result.then(() => {
          this.scene.start('Score');
        }).catch(() => {
          this.loadIcon.visible = false;
          this.add.text(250, 200, 'Sorry! Something went wrong :( ', {
            fontSize: '20px',
            fill: '#000',
          });
        });
      } else {
        test.innerText = 'Name is too short';
        this.add.dom(400, 110, test);
      }
    });
  }
}