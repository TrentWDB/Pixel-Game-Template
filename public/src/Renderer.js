/**
 * Created by Trent on 4/15/2017.
 */

var Renderer = class Renderer {
    constructor() {
        this.fps = 60;
        this.renderer = null;

        this._tickCount = 0;
        this._startTickTime = null;
        this._currentLoopTimeout = null;

        this.renderer = PIXI.autoDetectRenderer(
            window.innerWidth,
            window.innerWidth,
            {'antialias': true, 'transparent': false, 'resolution': 1}
        );

        this.renderer.view.style.width = '100%';
        this.renderer.view.style.height = '100%';

        document.body.appendChild(this.renderer.view);
    }

    render(time) {
        GameWorld.updateRender(time);
        Camera.updateRender(time);

        this.renderer.render(GameWorld.renderingContainer);
    }

    loop() {
        let currentTime = Date.now();
        let renderTime = currentTime - Physics.TICK;
        this.render(renderTime);

        window.requestAnimationFrame(this.loop.bind(this));
    }
};