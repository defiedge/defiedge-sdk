type FunctionLike<K> = (() => K) | K;

const TEN_MINUTES = 10 * 60 * 1000;
const FIVE_MINUTES = 5 * 60 * 1000;

const DEFAULT_DURATION = FIVE_MINUTES;

class CacheStorage {
  private cache: Map<
    string,
    {
      promise: Promise<any>;
      timestamp: number;
      duration: number;
    }
  > = new Map();

  set(key: string, value: Promise<any>, duration: number) {
    this.cache.set(key, {
      promise: value,
      timestamp: Date.now(),
      duration,
    });
  }

  get(key: string) {
    const entry = this.cache.get(key);

    if (!entry) return undefined;

    if (Date.now() - entry.timestamp > entry.duration) {
      this.cache.delete(key);
      return undefined;
    }

    return entry.promise;
  }

  getOrSet<K extends Promise<any>>(key: string, value: FunctionLike<K>, duration: number = DEFAULT_DURATION): K {
    const cacheValue = this.get(key);

    if (cacheValue) return cacheValue as K;
    const newValue = typeof value === 'function' ? value() : value;

    this.set(key, newValue, duration);

    return newValue;
  }
}

const CACHE = new CacheStorage();

export { TEN_MINUTES, FIVE_MINUTES as TWO_MINUTES };
export default CACHE;
