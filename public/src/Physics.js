/**
 * Created by Trent on 4/16/2017.
 */

var Physics = class Physics {
    constructor() {
        this._tickCount = 0;
        this._lastTickTime = null;
        this._currentLoopTimeout = null;
    }

    update(time, interval) {
        ClientInputProcessor.update(time, interval);
        // CommandProcessor.update(interval, time);
        GameWorld.update(time, interval);
        Camera.update(time, interval);
    };

    loop() {
        let currentTime = Date.now();
        let interval = currentTime - this._lastTickTime;
        this._lastTickTime = currentTime;

        this.update(currentTime, interval / 1);
        this._tickCount++;

        let duration = Date.now() - currentTime;
        let delay = Physics.TICK - duration;
        let timeout = Math.max(delay, 1);

        this._currentLoopTimeout = setTimeout(this.loop.bind(this), timeout * 1);
    };
};

Physics.TICK = 17;