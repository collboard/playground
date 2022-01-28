import { declareModule } from '@collboard/modules-sdk';
import { Registration } from 'destroyable';
import { Vector } from 'xyzt';
import { contributors, description, license, repository, version } from '../../package.json';
import { CompositeCyclicGenerator } from './generators/CompositeCyclicGenerator';
import { Dice } from './generators/Dice';
import { FakeDice } from './generators/FakeDice';
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
        title: { en: 'Drawing of dotted and dashed lines', cs: 'Kreslení přerušovaných čar' },
        categories: ['Basic', 'Art', 'Experimental'],
        icon: '✒️',
        flags: {
            isTemplate: true,
        },
    },

    async setup(systems) {
        const { materialArtVersioningSystem, artSerializer } = await systems.request(
            'materialArtVersioningSystem',
            'artSerializer',
        );

        artSerializer.registerRule({
            name: 'Dice',
            class: Dice,
        });

        artSerializer.registerRule({
            name: 'RotateDice',
            class: RotateDice,
        });

        artSerializer.registerRule({
            name: 'CompositeCyclicGenerator',
            class: CompositeCyclicGenerator,
        });

        artSerializer.registerRule({
            name: 'FakeDice',
            class: FakeDice,
        });

        if (!materialArtVersioningSystem.arts.some((art) => art instanceof RandomnessChartArt)) {
            return materialArtVersioningSystem
                .createPrimaryOperation()
                .newArts(
                    new RandomnessChartArt({
                        random: Dice({ sides: 6 }),
                    }).setShift(new Vector(-100, 0)),

                    new RandomnessChartArt({
                        random: RotateDice({ sides: 6 }),
                    }).setShift(new Vector(100, 0)),

                    new RandomnessChartArt({
                        random: CompositeCyclicGenerator({
                            from: Dice({ sides: 5 }),
                            sides: 7,
                        }),
                    }).setShift(new Vector(300, 0)),
                )
                .persist();
        }

        return Registration.void();
    },
});
