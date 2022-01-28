import { IRandom } from '../interfaces/IRandom';
import { IDiceOptions } from './Dice';

interface IFakeDiceOptions extends IDiceOptions {
    fakedValue: number;
}

export function* FakeDice({ sides, fakedValue }: IFakeDiceOptions): IRandom {
    while (true) {
        yield fakedValue;
    }
}
