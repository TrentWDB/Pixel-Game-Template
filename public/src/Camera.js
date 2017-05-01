/**
 * Created by Trent on 4/17/2017.
 */

var Camera = class Camera {
    static initialize() {
        Camera._position = [0, 0];

        Camera._stateInterpolator = new StateInterpolator();
    }

    static update(time, interval) {
        let player = ClientInputProcessor.getPlayer();
        if (!player) {
            return;
        }

        let playerPosition = player.getPosition();
        Camera._position[0] = playerPosition[0];
        Camera._position[1] = playerPosition[1];
        let state = {
            position: [playerPosition[0], playerPosition[1]]
        };
        Camera._stateInterpolator.push(time, state);
    }

    static updateRender(time) {
        let state = Camera._stateInterpolator.get(time);
        if (!state) {
            return;
        }

        let position = state.position;
        let corner = [position[0] - window.innerWidth / 2, position[1] - window.innerHeight / 2];

        GameWorld.renderingContainer.position.x = -corner[0];
        GameWorld.renderingContainer.position.y = -corner[1];

        GameWorld.staticContainer.position.x = corner[0];
        GameWorld.staticContainer.position.y = corner[1];
    }

    static getPosition() {
        return Camera._position;
    }

    static getCornerPosition() {
        return [Camera._position[0] - window.innerWidth / 2, Camera._position[1] - window.innerHeight / 2];
    }
};