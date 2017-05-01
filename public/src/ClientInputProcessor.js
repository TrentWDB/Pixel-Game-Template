/**
 * Created by Trent on 4/16/2017.
 */

var ClientInputProcessor = class ClientInputProcessor {
    static initialize() {
        this._player = null;
        this._playerID = null;
    }

    static update(time, interval) {
        if (this._playerID === null) {
            return;
        }

        let up = ClientInput.KEYS_DOWN[InputConstants.KEY_W];
        let left = ClientInput.KEYS_DOWN[InputConstants.KEY_A];
        let down = ClientInput.KEYS_DOWN[InputConstants.KEY_S];
        let right = ClientInput.KEYS_DOWN[InputConstants.KEY_D];

        CommandProcessor.updateInputs(this._playerID, up, left, down, right);
    };

    static getPlayerID() {
        return this._playerID;
    }

    static setPlayerID(playerID) {
        this._playerID = playerID;
    }

    static getPlayer() {
        if (this._playerID === null) {
            return null;
        }

        return CommandProcessor.getPlayer(this._playerID);
    }
};