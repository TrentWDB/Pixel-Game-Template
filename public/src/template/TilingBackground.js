/**
 * Created by Trent on 4/17/2017.
 */

var TilingBackground = class TilingBackground {
    constructor() {
        this._stateInterpolator = new StateInterpolator();

        this._container = new PIXI.Container();

        this._sprite = new PIXI.extras.TilingSprite.fromImage('assets/tile.png', window.innerWidth, window.innerHeight);
        this._sprite.scale.x = 2;
        this._sprite.scale.y = 2;
        this._sprite.position.x = -48;
        this._sprite.position.y = -48;
        this._sprite.width = window.innerWidth / 2 + 96;
        this._sprite.height = window.innerHeight / 2 + 96;

        this._spriteParallax = new PIXI.extras.TilingSprite.fromImage('assets/tile-parallax.png', window.innerWidth, window.innerHeight);
        this._spriteParallax.scale.x = 2;
        this._spriteParallax.scale.y = 2;
        this._spriteParallax.position.x = -64;
        this._spriteParallax.position.y = -64;
        this._spriteParallax.width = window.innerWidth / 2 + 128;
        this._spriteParallax.height = window.innerHeight / 2 + 128;

        this._container.addChild(this._spriteParallax);
        this._container.addChild(this._sprite);
    }

    update(time, interval) {
        let cornerPosition = Camera.getCornerPosition();

        let state = {
            position: [cornerPosition[0], cornerPosition[1]]
        };
        this._stateInterpolator.push(time, state);
    }

    updateRender(time) {
        let state = this._stateInterpolator.get(time);
        let position = state.position;

        this._sprite.position.x = position[0] - 48;
        this._sprite.position.y = position[1] - 48;
        this._spriteParallax.position.x = position[0] - 64;
        this._spriteParallax.position.y = position[1] - 64;

        this._sprite.tilePosition.x = -position[0] / 2;
        this._sprite.tilePosition.y = -position[1] / 2;
        this._spriteParallax.tilePosition.x = -position[0] / 2 / 2;
        this._spriteParallax.tilePosition.y = -position[1] / 2 / 2;
    }

    getSprite() {
        return this._container;
    }
};