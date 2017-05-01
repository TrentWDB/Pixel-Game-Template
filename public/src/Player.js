/**
 * Created by Trent on 4/17/2017.
 */

var Player = class Player {
    constructor() {
        this._id = Player._nextID++;

        this._stateInterpolator = new StateInterpolator();

        this._sprite = PIXI.Sprite.fromImage('assets/circle.png');
        this._sprite.scale.x = 2;
        this._sprite.scale.y = 2;
        this._sprite.anchor.x = 0.5;
        this._sprite.anchor.y = 0.5;

        this._position = [0, 0];
        this._velocity = [0, 0];

        this._up = false;
        this._left = false;
        this._down = false;
        this._right = false;
    }

    update(time, interval) {
        let direction = [0, 0];
        if (this._left) {
            direction[0] -= 1;
        }
        if (this._right) {
            direction[0] += 1;
        }
        if (this._up) {
            direction[1] -= 1;
        }
        if (this._down) {
            direction[1] += 1;
        }

        if (direction[0] !== 0 || direction[1] !== 0) {
            let accelerationLength = Math.sqrt(direction[0] * direction[0] + direction[1] * direction[1]);

            direction[0] /= accelerationLength;
            direction[1] /= accelerationLength;
        }

        // rough physics code
        this._velocity[0] = direction[0];
        this._velocity[1] = direction[1];

        let position = [
            this._position[0] + this._velocity[0] * interval,
            this._position[1] + this._velocity[1] * interval
        ];

        this.setPosition(time, position[0], position[1]);
    }

    updateRender(time) {
        let state = this._stateInterpolator.get(time);
        let position = state.position;

        this._sprite.position.x = position[0];
        this._sprite.position.y = position[1];
    }

    updateInputs(up, left, down, right) {
        this._up = up;
        this._left = left;
        this._down = down;
        this._right = right;
    }

    getSprite() {
        return this._sprite;
    }

    getPosition() {
        return this._position;
    }

    setPosition(time, x, y) {
        this._position[0] = x;
        this._position[1] = y;

        let state = {
            position: [x, y]
        };
        this._stateInterpolator.push(time, state);
    }

    getID() {
        return this._id;
    }
};

Player.FRICTION = 0.0025;
Player.ACCELERATION = Player.FRICTION + 0.0025 * 0.5;
Player.ACCELERATION = 0.00375;
Player.MAX_SPEED = 0.3;
Player.RADIUS = 12;
Player._nextID = 0;