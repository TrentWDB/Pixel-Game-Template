/**
 * Created by Trent on 4/16/2017.
 */

var CommandProcessor = class CommandProcessor {
    static initialize() {
        CommandProcessor._playersByID = {};
    }

    static update(tick) {
        for (let key in CommandProcessor._playersByID) {
            if (!CommandProcessor._playersByID.hasOwnProperty(key)) {
                continue;
            }

            let player = CommandProcessor._playersByID[key];
            player.update(tick);
        }
    }

    static updateInputs(id, up, left, down, right) {
        if (!CommandProcessor._playersByID[id]) {
            return;
        }

        CommandProcessor._playersByID[id].updateInputs(up, left, down, right);
    }

    static addPlayer(player) {
        CommandProcessor._playersByID[player.getID()] = player;
    }

    static getPlayer(id) {
        return CommandProcessor._playersByID[id];
    }
};