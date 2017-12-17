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

  hurt(player, enemy) {
    if (player.sheriffMode) {
      return;
    }

    if (this.plantSprite) {
      this.loadTexture('plant-attack', 0);
      this.animations.add('hurt');
      this.animations.play('hurt', 60, true);
    }

    if (player.health > 0 && !player.immune) {
      this.player.immune = true;
      this.player.alpha = 0.5;
      this.player.damage(this.damage);
      this.game.gameInfo.healthText.text = `x ${this.player.health}`;
      this.game.camera.flash(0xff0020, 500);
      this.hurtSound.play();

      if (this.player.body.position.x < enemy.body.position.x) {
        this.player.body.velocity.x = -350;
      } else {
        this.player.body.velocity.x = 350;
      }

      this.game.time.events.add(500, () => {
        this.player.immune = false;
        this.player.alpha = 1;
      }, this);
    }
  }

  killBullets(enemy, bullet) {
    this.clapSound.play();
    bullet.kill();
    enemy.kill();
    const blood = this.game.add.sprite(enemy.position.x, enemy.position.y, 'blood');
    blood.anchor.setTo(0.5, 0.5);
    blood.animations.add('play');
    blood.animations.play('play', 10, false, true);
  }
}
