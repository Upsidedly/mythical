import { randomInt as ri } from 'crypto';

const randomInteger = async (min: number, max: number): Promise<number> => {
    return new Promise((resolve, reject) => {
        ri(min, max, (err, value) => {
            if (err) return reject(err);
            resolve(value);
        });
    });
};

export interface RandomIntegerOptions {
    /**
     * Max value should be inclusive
     */
    maxInclusive?: boolean;
    /**
     * Should be synchronously cryptographically secure
     */
    forceCrypto?: boolean;
}

function handleMaxMin(min: number, max: number, maxInclusive: boolean) {
    const err = new Error('Integers provided must be safe!');

    if (Number.MIN_SAFE_INTEGER > min) throw err;
    if (Number.MAX_SAFE_INTEGER < min) throw err;
    if (Number.MAX_SAFE_INTEGER === min && maxInclusive)
        throw new Error('Min integer can only be maximum MAX_SAFE_INTEGER - 1');

    if (Number.MIN_SAFE_INTEGER > max) throw err;
    if (Number.MAX_SAFE_INTEGER < max) throw err;
    if (Number.MAX_SAFE_INTEGER === min && maxInclusive)
        throw new Error('Max integer can only maximum MAX_SAFE_INTEGER - 1');
}

export function randomIntSync(
    min: number,
    max: number,
    options?: RandomIntegerOptions
) {
    const crypto = options ? options.forceCrypto ?? false : false;
    const maxInclusive = options ? options.forceCrypto ?? true : true;
    const incNumber = maxInclusive ? 1 : 0;

    handleMaxMin(min, max, maxInclusive);

    if (crypto) {
        return ri(min, max + incNumber);
    } else {
        return Math.floor(Math.random() * (max - min + incNumber)) + min;
    }
}

export async function randomInt(
    min: number,
    max: number,
    maxInclusive?: boolean
) {
    return await randomInteger(min, maxInclusive ?? true ? max + 1 : max);
}
