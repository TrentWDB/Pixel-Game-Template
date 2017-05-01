/**
 * Created by Trent on 4/16/2017.
 */

var TemplateGame = class TemplateGame {
    static initialize() {
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

        // construct the world
        let tilingBackground = new TilingBackground();
        GameWorld.addToBackground(tilingBackground);

        let player = new Player();
        let id = player.getID();
        CommandProcessor.addPlayer(player);
        GameWorld.addToForeground(player);
        ClientInputProcessor.setPlayerID(id);

        let fps = new FPS();
        GameWorld.addToStatic(fps);

        // create physics and renderer
        TemplateGame.physics = new Physics();
        TemplateGame.physics.loop();

        TemplateGame.renderer = new Renderer();
        TemplateGame.renderer.canvas = document.createElement('canvas');
        TemplateGame.renderer.canvas.style.width = '100%';
        TemplateGame.renderer.canvas.style.height = '100%';
        TemplateGame.renderer.loop();
    };
};