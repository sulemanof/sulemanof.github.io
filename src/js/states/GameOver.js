import Phaser from 'phaser';
import filter from '../filters/filter';

export default class extends Phaser.State {
  create() {
    this.add.sprite(0, 0, 'logo');
    this.preloadSound = this.add.audio('preload-theme', 1, true);
    this.preloadSound.volume = 0.2;
    this.preloadSound.play();
    const background = this.add.sprite(0, 0);
    background.width = 800;
    background.height = 600;

    this.filter = new Phaser.Filter(this.game, null, filter);
    this.filter.setResolution(800, 600);
    this.filter.alpha = 0.3;
    background.filters = [this.filter];

    this.button = this.add.button(this.camera.width / 2, this.camera.height - 140, 'restart_btn', this.actionOnClick.bind(this));
    this.button.anchor.setTo(0.5, 0.5);
    this.button.scale.setTo(0.5, 0.5);
    this.button.onInputOver.add(this.over, this);
    this.button.onInputOut.add(this.out, this);

    const bar = this.add.graphics();
    bar.beginFill(0x000000, 0.2);
    bar.drawRect(0, 100, 800, 200);
    this.scoreText = this.add.text(
      this.camera.width / 2, (this.camera.height / 4) + 90, `Your score: ${this.game.gameInfo.score}`,
      { font: '70px riogrande', fill: '#fff' },
    );
    this.scoreText.anchor.setTo(0.5, 0.5);

    this.missionText = this.add.text(
      0, 0, `Mission ${this.game.gameInfo.mission}`,
      { font: '70px riogrande', fill: '#fff' },
    );
    this.missionText.anchor.setTo(0.5, 0.5);
    this.missionText.alignTo(this.scoreText, Phaser.TOP_CENTER);
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
