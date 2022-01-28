import { IRandom } from '../interfaces/IRandom';
import { randomInteger } from '../utils/randomInteger';

export interface IDiceOptions {
    sides: number;
}

export function* Dice({ sides }: IDiceOptions): IRandom {
    while (true) {
        yield { sides, toss: randomInteger(sides) };
    }
}
