/**
 * @private
 * Taken from @see https://stackoverflow.com/a/63918062/10647824
 */
type PrependNextNum<A extends unknown[]> = A['length'] extends infer T
    ? ((t: T, ...a: A) => void) extends (...x: infer X) => void
        ? X
        : never
    : never;

/**
 * @private
 * Taken from @see https://stackoverflow.com/a/63918062/10647824
 */
type EnumerateInternal<A extends unknown[], N extends number> = {
    0: A;
    1: EnumerateInternal<PrependNextNum<A>, N>;
}[N extends A['length'] ? 0 : 1];

/**
 * All integers from 0 to N
 *
 * @collboard-modules-sdk
 * Taken from @see https://stackoverflow.com/a/63918062/10647824
 */
export type Enumerate<N extends number> = EnumerateInternal<[], N> extends Array<infer E> ? E : never;

/**
 * All integers from FROM to TO - 1
 *
 *
 * @collboard-modules-sdk
 * When Range type helper in TypeScript use it instead @see https://github.com/microsoft/TypeScript/issues/15480
 * Taken from @see https://stackoverflow.com/a/63918062/10647824
 */
export type Range<FROM extends number, TO extends number> = Exclude<Enumerate<TO>, Enumerate<FROM>>;

//-------------------------------------------------
/**
 * TODO: If possible, use instead TypeFest library here @see https://github.com/sindresorhus/type-fest
 *       OR propose theese types into TypeScript / TypeFest
 */
