import { declareModule } from '@collboard/modules-sdk';
import { Vector } from 'xyzt';
import { contributors, description, license, repository, version } from '../../package.json';
import { Coin } from './generators/Coin';
import { CompositeCyclicGenerator } from './generators/CompositeCyclicGenerator';
import { Dice } from './generators/Dice';
import { MultiDice } from './generators/MultiDice';
import { RotateDice } from './generators/RotateDice';
import { RandomnessChartArt } from './randomness-chart-art';

declareModule({
    manifest: {
        name: '@playground/randomness-distribution',
        version,
        description,
        contributors,
        license,
        repository,
        title: { en: 'Showcase of randomness' },
        categories: ['Basic', 'Art', 'Experimental'],
        flags: {
            isDevelopment: true,
            isExperimental: true,
        },
    },

    async setup(systems) {
        const { virtualArtVersioningSystem } = await systems.request('virtualArtVersioningSystem');
        return virtualArtVersioningSystem
            .createPrimaryOperation()
            .newArts(
                new RandomnessChartArt({
                    random: Dice({ sides: 6 }),
                }).setShift(new Vector(-500, 0)),

                new RandomnessChartArt({
                    random: RotateDice({ sides: 6 }),
                }).setShift(new Vector(-300, 0)),

                new RandomnessChartArt({
                    random: CompositeCyclicGenerator({
                        from: Dice({ sides: 5 }),
                        sides: 7,
                    }),
                }).setShift(new Vector(-100, 0)),

                new RandomnessChartArt({
                    random: MultiDice(Dice({ sides: 6 }), Dice({ sides: 6 })),
                }).setShift(new Vector(100, 0)),

                new RandomnessChartArt({
                    random: MultiDice(Coin(), Coin(), Coin(), Coin(), Coin()),
                }).setShift(new Vector(300, 0)),
            )
            .persist();
    },
});
