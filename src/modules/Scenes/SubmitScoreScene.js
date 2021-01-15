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

    // Creating Loading Animation
    this.anims.create({
      key: 'loading',
      frames: this.anims.generateFrameNumbers('loadIcon', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });


    const submitInfo = e => {
      e.preventDefault();
      this.scene.start('Score');
      const test = document.createElement('h4');
      name = document.getElementById('name').value;
      setTimeout(() => {  console.log("World!"); }, 2000);
      if (name.length >= 5) {
        this.character.visible = false;
        this.loadIcon.visible = true;
        this.loadIcon.anims.play('loading');
        const result = submitScore(name, this.score);
        result.then(() => {
          this.scene.start('Game');
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
    };

    // this.add.image(400, 300, 'background');
    // this.character = this.add.image(400, 300, 'character');
    this.loadIcon = this.add.sprite(400, 300, 'loadIcon');
    this.loadIcon.visible = false;
    let body = document.querySelector('body')
    let form = document.createElement('form')
    form.action = ""
    body.appendChild(form)
    const inputText = document.createElement('input');
    console.log(12)
    inputText.type = 'text';
    inputText.id = 'name';
    inputText.class = 'input';
    form.appendChild(inputText)
    const submitText = document.createElement('button');
    submitText.innerText = 'Submit'
    form.appendChild(submitText)
    

    const text = document.createElement('h2');
    text.innerText = 'Provide your Username press Enter and Wait to Submit';
    text.id = 'text';
    text.class = 'text';
    body.appendChild(text)
    // inputText.addEventListener('submit', submitInfo(e))
    form.addEventListener('submit', e => {
      e.preventDefault();
      const test = document.createElement('h4');
      name = document.getElementById('name').value;
      setTimeout(() => {  console.log("World!"); }, 2000);
      if (name.length >= 5) {
        // this.character.visible = false;
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
    })
  }
}