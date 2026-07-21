import { randomBytes } from 'crypto';

const entryCode = randomBytes(6).toString('hex').toUpperCase();

export { entryCode };
