'use server';
/**
 * This file acts as a centralized hub for all non-AI server-side functions (actions).
 *
 * AI-related server actions have been migrated to a client-facing API route
 * to support edge runtime, model failover, and improved performance.
 * Client components should now call the `/api/ai/proxy` endpoint directly.
 */
