import { React } from '@collboard/modules-sdk';
import { Registration } from 'destroyable';
import { forAnimationFrame, forTimeSynced } from 'waitasecond';
import { IRandomnessChartOptions } from '../randomness-chart-art';

export interface IRandomnessChartComponentProps extends IRandomnessChartOptions {
    isPlayingInitially: boolean;
}
export function RandomnessChartComponent({ random, isPlayingInitially }: IRandomnessChartComponentProps) {
    const [isPlaying, setPlaying] = React.useState(isPlayingInitially);
    const [stats, setStats] = React.useState<Record<number, number>>({});

    React.useEffect(() => {
        const loop = Registration.loop({
            async tick() {
                if (isPlaying) {
                    const value = random.next().value;
                    const newStats = { ...stats };
                    newStats[value] = (newStats[value] || 0) + 1;
                    setStats(newStats);
                }
            },
            async waiter() {
                await forTimeSynced(10);
                await forAnimationFrame();
            },
        });

        return () => {
            loop.destroy();
        };
    }, [isPlaying, stats, random]);

    return (
        <>
            <button {...{ onClick: () => setPlaying(!isPlaying) }}>{isPlaying ? `⏸` : `⏵`}</button>

            {Object.entries(stats).map(([key, value]) => (
                <div {...{ key }}>
                    <b>{key}:</b> {value}
                </div>
            ))}
        </>
    );
}
