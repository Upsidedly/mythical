/**
 * Chunks the input array of n size
 * If the array does not evenly divide by `size` the last array in the chunk will be smaller
 * @param input The array to chunk
 * @param size The size of each chunk
 * @returns The chunked array'
 */
export function chunk<T>(input: T[], size: number): T[][] {
    return Array.from({ length: Math.ceil(input.length / size) }, (_, i) => {
        return input.slice(i * size, i * size + size);
    });
}
