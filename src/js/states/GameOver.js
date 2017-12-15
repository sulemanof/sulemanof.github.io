import Phaser from 'phaser';

export default class extends Phaser.State {
  create() {
    this.add.sprite(0, 0, 'logo');
    this.preloadSound = this.add.audio('preload-theme', 1, true);
    this.preloadSound.volume = 0.2;
    this.preloadSound.play();
    const background = this.add.sprite(0, 0);
    background.width = 800;
    background.height = 600;

    this.filter = this.add.filter('Fire', 800, 600);
    this.filter.alpha = 0.0;
    background.filters = [this.filter];

    this.button = this.add.button(this.camera.width / 2, this.camera.height - 140, 'restart_btn', this.actionOnClick.bind(this));
    this.button.anchor.setTo(0.5, 0.5);
    this.button.scale.setTo(0.5, 0.5);
    this.button.onInputOver.add(this.over, this);
    this.button.onInputOut.add(this.out, this);
  }

  update() {
    this.filter.update();
  }

  actionOnClick() {
    this.preloadSound.destroy();
    this.game.state.start('Main');
  }

  over() {
    this.button.angle += 20;
  }

  out() {
    this.button.angle -= 20;
  }
}
