import Enemy from './Enemy';

export default class Plant extends Enemy {
  constructor(game, x, y, asset, state) {
    super(game, x, y, asset, state);

    this.renderSprite = 5;
    this.plantSprite = true;
    this.damage = 50;
  }
}
