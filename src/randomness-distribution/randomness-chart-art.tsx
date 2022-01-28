import { Abstract2dBoxArt, declareModule, ISystemsExtended, makeArtModule, React } from '@collboard/modules-sdk';
import { contributors, description, license, repository, version } from '../../package.json';
import { RandomnessChartComponent } from './components/RandomnessChartComponent';
import { IRandom } from './interfaces/IRandom';

export interface IRandomnessChartOptions {
    random: IRandom;
}

export class RandomnessChartArt extends Abstract2dBoxArt {
    public static serializeName = 'RandomnessChartArt';
    public static manifest = {
        // Note+TODO: All modules should be in format @collboard/module-name but we started with art modules
        name: '@playground/randomness-chart-art',
        contributors,
        description,
        license,
        repository,
        version,
        flags: {
            isDevelopment: true,
            isExperimental: true,
        },
    };

    public constructor(private readonly options: IRandomnessChartOptions) {
        super();
    }

    public renderBox(systems: ISystemsExtended): JSX.Element {
        return <RandomnessChartComponent isPlayingInitially={true} {...this.options} />;
    }
}

declareModule(makeArtModule(RandomnessChartArt));
