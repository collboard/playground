import { declareModule } from '@collboard/modules-sdk';
import { Vector } from 'xyzt';
import { contributors, description, license, repository, version } from '../../package.json';
import { RandomnessChartArt } from './randomness-chart-art';
import { RotateDice } from "./generators/RotateDice";
import { Dice } from "./generators/Dice";

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
        const { virtualArtVersioningSystem } = await systems.request('virtualArtVersioningSystem');
        return virtualArtVersioningSystem
            .createPrimaryOperation()
            .newArts(
                new RandomnessChartArt({
                    random: Dice({ sides: 6 }),
                }).setShift(new Vector(-100, 0)),

                new RandomnessChartArt({
                    random: RotateDice({ sides: 6 }),
                }).setShift(new Vector(100, 0)),
            )
            .persist();
    },
});
