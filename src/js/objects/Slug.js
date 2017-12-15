import Enemy from './Enemy';

export default class Slug extends Enemy {
  constructor(game, x, y, asset, state) {
    super(game, x, y, asset, state);

    this.tween = this.game.add.tween(this).to({ x: this.position.x - 100 }, 2000, 'Linear', true, 0, -1, true);
    this.tween.onLoop.add(this.reverse, this);
    this.renderSprite = 10;
    this.damage = 20;
    this.body.gravity.y = 280;
  }

  reverse() {
    this.scale.x *= -1;
  }
}
