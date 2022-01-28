import { IRandom } from '../interfaces/IRandom';

export function* MultiDice(...from: IRandom[]): IRandom {
    while (true) {
        yield from
            .map((subdice) => subdice.next().value)
            .reduce(
                (accumulated, next) => ({
                    sides: accumulated.sides + next.sides - 1,
                    toss: accumulated.toss + next.toss,
                }),
                { sides: 1, toss: 0 },
            );
    }
}
