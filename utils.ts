import { Network } from "./types/index.enum.ts";

export const getEnvData = (key: string) => {
  const value = Deno.env.get(key);
  if (!value) {
    return "";
    // throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
};

export const getUserJWTForEnv = () => {
  const jwt = getEnvData("USER_JWT");
  if (!jwt) {
    throw new Error("Environment variable USER_JWT is not set");
  }
  return jwt;
};

export const regexValidString = (
  currentString: string,
  regex: RegExp,
): boolean => {
  return regex.test(currentString);
};

export function isValidAddress(
  address: string,
  chainType = Network.SOLANA,
): boolean {
  switch (chainType) {
    case Network.SOLANA:
      return (
        regexValidString(address, /^([A-Za-z0-9]{44})$/) ||
        regexValidString(address, /^([A-Za-z0-9]{43})$/)
      );
    case Network.ETH:
    case Network.BASE:
    case Network.BSC:
      return regexValidString(address, /^0x([A-Za-z0-9]{40})$/);
    default:
      return (
        regexValidString(address, /^([A-Za-z0-9]{44})$/) ||
        regexValidString(address, /^([A-Za-z0-9]{43})$/)
      );
  }
}

export function isValidSolWalletAddress(address: string): boolean {
  return regexValidString(address, /^([A-Za-z0-9]{58})$/);
}


export const tokenForLamportsToDecimals = (num: number, decimal: number): number => {
  return num / Math.pow(10, decimal)
}