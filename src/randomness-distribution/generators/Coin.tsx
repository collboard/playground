import { IRandom } from '../interfaces/IRandom';
import { Dice } from './Dice';

export function Coin(): IRandom {
    return Dice({ sides: 2 });
}
