
// Simple in-memory rate limiter for serverless functions (persists as long as the instance is warm)
// For a production site with multiple instances, Redis (Upstash) would be better, 
// but this is a great free/simple start.

interface RateLimitStore {
    [key: string]: {
        count: number;
        resetTime: number;
    }
}

const stores: Record<string, RateLimitStore> = {};

export function rateLimit(identifier: string, limit: number, windowMs: number, storeName: string = 'default') {
    if (!stores[storeName]) {
        stores[storeName] = {};
    }

    const store = stores[storeName];
    const now = Date.now();

    if (!store[identifier]) {
        store[identifier] = {
            count: 1,
            resetTime: now + windowMs,
        };
        return { success: true, remaining: limit - 1 };
    }

    const entry = store[identifier];

    if (now > entry.resetTime) {
        entry.count = 1;
        entry.resetTime = now + windowMs;
        return { success: true, remaining: limit - 1 };
    }

    if (entry.count >= limit) {
        return { success: false, remaining: 0 };
    }

    entry.count += 1;
    return { success: true, remaining: limit - entry.count };
}
