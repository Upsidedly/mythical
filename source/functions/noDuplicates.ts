/**
 * 
 * @param array The array to remove the duplicates
 * @returns The array without duplicates
 * @example ```ts
 * const array = ['fizz', 'fizz', 'buzz', 'buzz', 'buzz']
 * console.log(noDuplicates(array)) // ['fizz', 'buzz']
 * ```
 */
export function noDuplicates<T>(array: T[]): T[] {
    return [...new Set(array)]
}