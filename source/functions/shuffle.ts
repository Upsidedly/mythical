/**
 * Shuffles the array using the Durstenfeld shuffle in-place.
 * **This not cryptographically secure.** If you need a crypto-secure method, see secureIShuffle
 * @param array The array to shuffle
 * @returns the shuffled array
 */
export function ishuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Shuffles the array using the Durstenfeld shuffle.
 * **This not cryptographically secure.** If you need a crypto-secure method, see {@link secureShuffle}
 * @param array The original array to shuffle
 * @returns The clone shuffled array
 */
export function shuffle<T>(array: T[]): T[] {
  const a2 = [...array];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a2[i], a2[j]] = [a2[j], a2[i]];
  }
  return a2;
}
