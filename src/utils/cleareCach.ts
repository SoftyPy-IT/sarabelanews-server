import Redis from 'ioredis';

const redis = new Redis();

/**
 * Clear Redis cache for a specific key prefix
 * @param prefix Redis key prefix (e.g. 'news', 'photoNews', 'videoNews')
 */
export const clearCacheByPrefix = async (prefix: string): Promise<void> => {
  const keys = await redis.keys(`${prefix}:*`);
  if (keys.length) {
    await redis.del(...keys);
    console.log(`🔄 Cleared Redis cache for prefix: ${prefix}`);
  }
};
