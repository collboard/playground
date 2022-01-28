import { IRandom } from '../interfaces/IRandom';
import { randomInteger } from '../utils/randomInteger';

function* Coin(): IRandom {
    while (true) {
        yield randomInteger(2);
    }
}
