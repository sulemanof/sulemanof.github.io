import Phaser from 'phaser';

export default class extends Phaser.State {
  preload() {
    this.load.image('bar', './assets/bar.png');
    this.load.image('logo', './assets/game-logo.png');
    this.load.audio('preload-theme', './assets/sounds/preload_theme.mp3');
  }

  create() {
    this.state.start('Preload');
  }
}
