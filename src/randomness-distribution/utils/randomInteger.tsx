export function randomInteger<TMax extends number>(max: TMax): number /*Range<0, TMax>*/ {
    return Math.floor(Math.random() * max);
}
