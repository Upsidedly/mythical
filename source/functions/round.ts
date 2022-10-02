/**
 * Round a value by a provided precision
 * @param value The value to round
 * @param precision The precision to round by
 * @returns The rounded value
 */
export function round(value: number, precision?: number) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
