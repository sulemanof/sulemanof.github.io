import Enemy from './Enemy';

export default class Bee extends Enemy {
  constructor(game, x, y, asset, state) {
    super(game, x, y, asset, state);

    this.damage = 35;
    this.renderSprite = 10;
    this.tween = this.game.add.tween(this).to({ y: this.position.y - 100 }, 2000, 'Linear', true, 0, -1, true);
  }
}
