import secureRandomInRange from 'random-number-csprng';

/**
 * cryptographically-securely shuffles an array in place and returns it.
 * @param array The array to shuffle
 * @returns The shuffled array
 */
export async function secureIShuffle<T>(array: T[]): Promise<T[]> {
    const promises = [];

    for (let i = array.length - 1; i > 0; i--) {
        promises.push(secureRandomInRange(0, i));
    }

    const randomNumbers = await Promise.all(promises);

    for (let i = array.length - 1; i > 0; i--) {
        const j = randomNumbers[array.length - i - 1];
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

/**
 * Returns a cryptographically-secure shuffled clone of an array
 * @param array The original array
 * @returns The shuffled array
 */
export async function secureShuffle<T>(array: T[]): Promise<T[]> {
    const promises = [];
    const arr2 = [...array];

    for (let i = array.length - 1; i > 0; i--) {
        promises.push(secureRandomInRange(0, i));
    }

    const randomNumbers = await Promise.all(promises);

    for (let i = array.length - 1; i > 0; i--) {
        const j = randomNumbers[array.length - i - 1];
        const temp = arr2[i];
        arr2[i] = arr2[j];
        arr2[j] = temp;
    }

    return arr2;
}
