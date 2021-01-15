import 'phaser';

  // object containing configuration options
  export default  {
    type: Phaser.AUTO,
    width: 1334,
    height: 750,
    
    backgroundColor: 0x0c88c7,
    dom: {
      createContainer: true,
    },
    // physics settings
    physics: {
        default: "arcade"
    }
      }
  

