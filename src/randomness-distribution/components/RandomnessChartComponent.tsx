import { React, styled } from '@collboard/modules-sdk';
import { Registration } from 'destroyable';
import { forTimeSynced } from 'waitasecond';
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
                    const { sides, toss } = random.next().value;
                    const newStats = { ...stats };
                    for (let side = 0; side < sides; side++) {
                        newStats[side] = newStats[side] || 0;
                    }
                    newStats[toss]++;
                    setStats(newStats);
                }
            },
            async waiter() {
                await forTimeSynced(10);
                // await forAnimationFrame();
            },
        });

        return () => {
            loop.destroy();
        };
    }, [isPlaying, stats, random]);

    const total = Object.values(stats).reduce((a, b) => a + b, 0);
    const max = Math.max(...Object.values(stats));
    return (
        <RandomnessChartDiv>
            <button {...{ onClick: () => setPlaying(!isPlaying) }}>{isPlaying ? `⏸` : `⏵`}</button>

            <div>
                <b>Total:</b> {total}
            </div>

            {Object.entries(stats).map(([key, value]) => (
                <div {...{ key }}>
                    <label>
                        {parseInt(key, 10) + 1} ({value})<progress {...{ max, value }}>{value}</progress>
                    </label>
                </div>
            ))}
        </RandomnessChartDiv>
    );
}

const RandomnessChartDiv = styled.div`
    background-color: rgba(0, 0, 0, 0.1);
    padding: 10px;
    width: 150px;
    border-radius: 5px;
`;
