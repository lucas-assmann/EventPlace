import * as argon2 from '@node-rs/argon2';

export async function hashPassword(password: string): Promise<string> {
  const hash = await argon2.hash(password);
  return hash;
}

export async function verifyPassword(password: string, hash: string) {
  return argon2.verify(hash, password);
}
