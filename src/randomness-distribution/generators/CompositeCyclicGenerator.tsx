import { IRandom } from '../interfaces/IRandom';
import { IDiceOptions } from './Dice';

export interface CompositeCyclicGenerator extends IDiceOptions {
    from: IRandom;
}

export function* CompositeCyclicGenerator({ from, sides }: CompositeCyclicGenerator): IRandom {
    let i = 0;
    let accumulatedToss = 0;
    for (const { sides: fromSides, toss: fromToss } of from) {
        accumulatedToss += fromToss;

        if (++i === sides) {
            yield { sides, toss: accumulatedToss % sides };
            i = 0;
            accumulatedToss = 0;
        }
    }
}
