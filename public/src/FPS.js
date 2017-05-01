/**
 * Created by Trent on 4/17/2017.
 */

var FPS = class FPS {
    constructor() {
        this._lastSecondTime = null;
        this._ticksSinceLastSecondTime = 0;
        this._fps = 0;

        this._sprite = new PIXI.Text('FPS: 0', {fontFamily : 'Arial', fontSize: 24, fill : 0x181818, align : 'left'});
    }

    update(time, interval) {
    }

    updateRender(time) {
        let now = Date.now();

        if (!this._lastSecondTime) {
            this._lastSecondTime = now;
        }

        if (now - this._lastSecondTime >= 1000) {
            this._lastSecondTime = now - (now - this._lastSecondTime - 1000);
            this._fps = this._ticksSinceLastSecondTime;
            this._ticksSinceLastSecondTime = 0;

            this._sprite.text = 'FPS: ' + this._fps;
        }

        this._ticksSinceLastSecondTime++;
    }

    getSprite() {
        return this._sprite;
    }
};