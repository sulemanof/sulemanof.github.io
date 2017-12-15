import Phaser from 'phaser';

export default class extends Phaser.Sprite {
  constructor(game, x, y, asset, state) {
    super(game, x, y, asset);

    this.game.physics.arcade.enable(this);
    this.game.add.existing(this);

    this.anchor.setTo(0.5, 0.5);
    this.collideWorldBounds = true;
    this.enableBody = true;
    this.animations.add('move');
    this.body.gravity.y = 80;
    this.body.immovable = true;
    this.layer = state.tileLayer;
    this.player = state.player;
    this.hurtSound = game.add.audio('hurt');
    this.clapSound = game.add.audio('clap');
  }

  update() {
    this.game.physics.arcade.collide(this, this.layer);
    this.game.physics.arcade.collide(this.player.weapon.bullets, this, this.killBullets, null, this);
    this.game.physics.arcade.overlap(this.player, this, this.hurt, null, this);
    this.animations.play('move', this.renderSprite);
  }

  hurt() {
    if (this.player.sheriffMode) {
      return;
    }

    if (this.plantSprite) {
      this.loadTexture('plant-attack', 0);
      this.animations.add('hurt');
      this.animations.play('hurt', 60, true);
    }

    this.game.camera.flash(0xff0020, 500);
    this.player.health -= this.damage;
    this.hurtSound.play();
    this.game.gameInfo.healthText.text = `x ${this.player.health}`;

    if (this.player.health > 0) {
      if (this.player.position.x < this.position.x) {
        this.player.position.x = this.player.position.x - 100;
      } else {
        this.player.position.x = this.player.position.x + 100;
      }
      this.player.position.y = this.player.position.y - 50;
    }
  }

  killBullets(bullet, bee) {
    this.clapSound.play();
    bee.kill();
    bullet.kill();
  }
}
