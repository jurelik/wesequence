import { encode, decode } from 'base64-arraybuffer';

export const arraybufferToString = (buffer: ArrayBuffer) => {
  return encode(buffer);
}

export const stringToArraybuffer = (string: string) => {
  return decode(string);
}
