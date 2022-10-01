import { randomInt } from 'crypto';

const ri: (args1: number) => Promise<number> = (await import('util')).promisify(randomInt)

export function choice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function secureChoiceSync<T>(array: T[]): T {
    return array[randomInt(array.length)]
}

export async function secureChoice<T>(array: T[]): Promise<T> {
    return array[await ri(array.length)]
}
