import { isProduction } from './utils.ts';

export const kv = await Deno.openKv(isProduction ? undefined : 'kv/db');
