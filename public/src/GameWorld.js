/**
 * Created by Trent on 4/16/2017.
 */

var GameWorld = class GameWorld {
    static initialize() {
        GameWorld.renderingContainer = new PIXI.Container();
        GameWorld.backgroundContainer = new PIXI.Container();
        GameWorld.foregroundContainer = new PIXI.Container();
        GameWorld.staticContainer = new PIXI.Container();

        GameWorld.renderingContainer.addChild(GameWorld.backgroundContainer);
        GameWorld.renderingContainer.addChild(GameWorld.foregroundContainer);
        GameWorld.renderingContainer.addChild(GameWorld.staticContainer);

        GameWorld.backgroundObjects = [];
        GameWorld.foregroundObjects = [];
        GameWorld.staticObjects = [];
    }

    static update(time, interval) {
        GameWorld.backgroundObjects.forEach((object) => {
            object.update(time, interval);
        });

        GameWorld.foregroundObjects.forEach((object) => {
            object.update(time, interval);
        });

        GameWorld.staticObjects.forEach((object) => {
            object.update(time, interval);
        });
    }

    static updateRender(time) {
        GameWorld.backgroundObjects.forEach((object) => {
            object.updateRender(time);
        });

        GameWorld.foregroundObjects.forEach((object) => {
            object.updateRender(time);
        });

        GameWorld.staticObjects.forEach((object) => {
            object.updateRender(time);
        });
    }

    static addToBackground(object) {
        let sprite = object.getSprite();
        if (!sprite) {
            console.error(object);
            throw new Error('Background object does not have a sprite.');
        }

        GameWorld.backgroundObjects.push(object);
        GameWorld.backgroundContainer.addChild(sprite);
    }

    static addToForeground(object) {
        let sprite = object.getSprite();
        if (!sprite) {
            console.error(object);
            throw new Error('Foreground object does not have a sprite.');
        }

        GameWorld.foregroundObjects.push(object);
        GameWorld.foregroundContainer.addChild(sprite);
    }

    static addToStatic(object) {
        let sprite = object.getSprite();
        if (!sprite) {
            console.error(object);
            throw new Error('Static background object does not have a sprite.');
        }

        GameWorld.staticObjects.push(object);
        GameWorld.staticContainer.addChild(sprite);
    }
};