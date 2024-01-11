import crypto from 'crypto';


export function hash(message) {
  return crypto.createHash('md5').update(message).digest('hex');
}
