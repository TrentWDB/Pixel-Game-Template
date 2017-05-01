/**
 * Created by Trent on 4/17/2017.
 */

var StateInterpolator = class StateInterpolator {
    constructor() {
        this._times = [];
        this._states = [];

        this.debug = false;
    }

    push(time, state) {
        if (!state) {
            throw new Error('Pushing an invalid state to the state interpolator.');
        }

        this._times.push(time);
        this._states.push(state);

        if (this._times.length > StateInterpolator.MAX_STATES) {
            this._times.shift();
            this._states.shift();
        }
    }

    get(time) {
        if (this._times.length === 0) {
            return null;
        }

        // calculate the bounds of the given time
        let lowerBoundIndex = 0;
        let upperBoundIndex = 0;

        for (let i = 0; i < this._times.length; i++) {
            let currentTime = this._times[i];

            if (currentTime >= time) {
                break;
            }

            if (currentTime < time) {
                lowerBoundIndex = i;
                upperBoundIndex = Math.min(this._times.length - 1, i + 1);
            }
        }

        // get the percent between the bounds
        let percent = 0;
        let timestampDelta = this._times[upperBoundIndex] - this._times[lowerBoundIndex];
        if (timestampDelta > 0) {
            let timeDelta = time - this._times[lowerBoundIndex];
            percent = Math.max(0, Math.min(1, timeDelta / timestampDelta));
        }

        if (this.debug && (percent === 0 || percent === 1)) {
            console.log('StateInterpolator percent ', percent);
        }

        let returnState = {};
        let lowerBoundState = this._states[lowerBoundIndex];
        let upperBoundState = this._states[upperBoundIndex];
        for (let key in lowerBoundState) {
            if (!lowerBoundState.hasOwnProperty(key) || !upperBoundState.hasOwnProperty(key)) {
                continue;
            }

            switch (key) {
                case 'position': {
                    let delta = [upperBoundState.position[0] - lowerBoundState.position[0], upperBoundState.position[1] - lowerBoundState.position[1]];
                    returnState.position = [lowerBoundState.position[0] + delta[0] * percent, lowerBoundState.position[1] + delta[1] * percent];

                    break;
                }

                case 'tilePosition': {
                    let delta = [upperBoundState.tilePosition[0] - lowerBoundState.tilePosition[0], upperBoundState.tilePosition[1] - lowerBoundState.tilePosition[1]];
                    returnState.tilePosition = [lowerBoundState.tilePosition[0] + delta[0] * percent, lowerBoundState.tilePosition[1] + delta[1] * percent];

                    break;
                }
            }
        }

        return returnState;
    }
};

StateInterpolator.MAX_STATES = 3;