import { IRandom } from '../interfaces/IRandom';
import { IDiceOptions } from './Dice';

export function* RotateDice({ sides }: IDiceOptions): IRandom {
    let i = 0;
    while (true) {
        yield { sides, toss: i++ % sides };
    }
}
