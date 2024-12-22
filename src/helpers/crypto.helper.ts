import * as Crypto from 'expo-crypto';
import CryptoJS from 'react-native-crypto-js';

export const modExp = (base: bigint, exp: bigint, mod: bigint): bigint => {
  let result = 1n;
  let b = base % mod;
  let e = exp;

  while (e > 0n) {
    if (e % 2n === 1n) {
      result = (result * b) % mod;
    }
    b = (b * b) % mod;
    e = e / 2n;
  }

  return result;
};

const millerRabin = (n: bigint, k: number = 20): boolean => {
  if (n <= 1n) return false;
  if (n === 2n || n === 3n) return true;
  if (n % 2n === 0n) return false;

  let r = 0n;
  let d = n - 1n;
  while (d % 2n === 0n) {
    r += 1n;
    d /= 2n;
  }

  for (let i = 0; i < k; i++) {
    const a = BigInt(Math.floor(Math.random() * Number(n - 4n))) + 2n;
    let x = modExp(a, d, n);

    if (x === 1n || x === n - 1n) continue;

    for (let j = 0n; j < r - 1n; j++) {
      x = modExp(x, 2n, n);
      if (x === n - 1n) break;
    }

    if (x !== n - 1n) return false;
  }

  return true;
};

const generatePublicKey = (
  G: bigint,
  privateKey: bigint,
  P: bigint,
): bigint => {
  return modExp(G, privateKey, P);
};

const generateBaseG = (p: bigint) => {
  const min = 2n;
  const max = p - 1n;
  const randomInt =
    Math.floor(Math.random() * Number(max - min + 1n)) + Number(min);
  return BigInt(randomInt);
};

const generateRandom = async (bitLength: number, max?: bigint) => {
  const byteLength = Math.ceil(bitLength / 8);
  const randomBytes = await Crypto.getRandomBytesAsync(byteLength);

  let randomBigInt = BigInt(
    '0x' +
      Array.from(randomBytes)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join(''),
  );

  return max ? randomBigInt % max : randomBigInt;
};

const generateSafePrime = async (bitLength: number) => {
  let p;
  let P;

  do {
    p = await generateRandom(bitLength - 1);
    if (p % 2n === 0n) p += 1n;
  } while (!millerRabin(p));

  P = 2n * p + 1n;

  while (!millerRabin(P)) {
    p += 2n;
    P = 2n * p + 1n;
  }

  return P;
};

export const generateDHKeys = async (oldP?: bigint, oldG?: bigint) => {
  const bitLength = 128;
  const P = oldP ?? (await generateSafePrime(bitLength));
  const G = oldG ?? generateBaseG(P);
  const privateKey = await generateRandom(bitLength, P - BigInt(2));
  const publicKey = generatePublicKey(G, privateKey, P);

  return { privateKey, publicKey, P, G };
};

export const generateSharedKey = (
  publicKey: bigint,
  privateKey: bigint,
  P: bigint,
) => {
  return modExp(publicKey, privateKey, P);
};

export const encryptMessage = async (text: string, sharedKey: string) => {
  try {
    const ciphertext = CryptoJS.AES.encrypt(text, sharedKey).toString();

    return ciphertext;
  } catch (error) {
    console.error('AES Encryption/Decryption Error:', error);
  }
};

export const decryptMessage = async (ciphertext: string, sharedKey: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, sharedKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    return originalText;
  } catch (error) {
    console.error('AES Encryption/Decryption Error:', error);
  }
};
