/**
 * Created by Trent on 4/24/2017.
 */

var MathHelper = class MathHelper {
    static EPSILON = 0.000001;

    static radiansBetweenAngles(angleFrom, angleTo) {
        if (angleTo < angleFrom) {
            if (angleFrom - angleTo > Math.PI) {
                return Math.PI * 2 - (angleFrom - angleTo);
            } else {
                return -(angleFrom - angleTo);
            }
        } else {
            if (angleTo - angleFrom > Math.PI) {
                return -(Math.PI * 2 - (angleTo - angleFrom));
            } else {
                return angleTo - angleFrom;
            }
        }
    }
};
