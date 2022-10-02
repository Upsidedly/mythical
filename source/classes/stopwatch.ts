export type StopwatchElapsedData<T> = T extends bigint
  ? {
      ns: bigint;
      us: bigint;
      ms: bigint;
      s: bigint;
    }
  : {
      ns: number;
      us: number;
      ms: number;
      s: number;
    };

class Stampwatch<T extends number | bigint> {
  protected start: bigint;
  protected end?: bigint;
  protected bigint: boolean;

  get elapsed(): StopwatchElapsedData<T> {
    const now = this.end ?? process.hrtime.bigint();
    const micros = this.bigint ? now - this.start : Number(now - this.start);
    return (
      this.bigint
        ? {
            ns: now - this.start,
            us: (now - this.start) / 1000n,
            ms: (now - this.start) / 1000_000n,
            s: (now - this.start) / 1000_000_000n
          }
        : {
            ns: Number(now - this.start),
            us: Number(now - this.start) / 1000,
            ms: Number(now - this.start) / 1000_000,
            s: Number(now - this.start) / 1000_000_000
          }
    ) as StopwatchElapsedData<T>;
  }

  constructor(stamp: bigint, bigint: boolean) {
    this.start = stamp;
    this.bigint = bigint;
  }
}

export class Stopwatch<T extends number | bigint> {
  private readonly start: bigint;
  private end?: bigint;
  private bigint: boolean;
  private stamps: bigint[] = [];

  get elapsed(): StopwatchElapsedData<T> {
    const now = this.end ?? process.hrtime.bigint();
    const micros = this.bigint ? now - this.start : Number(now - this.start);
    return (
      this.bigint
        ? {
            ns: now - this.start,
            us: (now - this.start) / 1000n,
            ms: (now - this.start) / 1000_000n,
            s: (now - this.start) / 1000_000_000n
          }
        : {
            ns: Number(now - this.start),
            us: Number(now - this.start) / 1000,
            ms: Number(now - this.start) / 1000_000,
            s: Number(now - this.start) / 1000_000_000
          }
    ) as StopwatchElapsedData<T>;
  }

  /**
   *
   * @param bigint Return values as a bigint
   */
  constructor(bigint?: boolean) {
    this.start = process.hrtime.bigint();
    this.bigint = bigint ?? false;
  }

  stop() {
    this.end = this.end ?? process.hrtime.bigint();
    return this;
  }

  stamp() {
    this.stamps.push(process.hrtime.bigint());
    return this;
  }

  getStamp<Y extends boolean>(
    num: number,
    required?: Y
  ): Y extends true ? Stampwatch<T> : Stampwatch<T> | null {
    if (!this.stamps[num - 1])
      return null as Y extends true ? Stampwatch<T> : Stampwatch<T> | null;
    return new Stampwatch<T>(
      this.stamps[num - 1],
      this.bigint
    ) as Y extends true ? Stampwatch<T> : Stampwatch<T> | null;
  }

  static async time(func: Awaited<Function>) {
    const watch = new this<bigint>(true);
    await func();
    return watch.elapsed;
  }
}
