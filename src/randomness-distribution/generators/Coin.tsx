import { IRandom } from '../interfaces/IRandom';
import { Dice } from './Dice';

function Coin(): IRandom {
    return Dice({ sides: 2 });
}
