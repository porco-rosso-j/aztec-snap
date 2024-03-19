export type TokenWithBalance = {
  address: string;
  name: string;
  symbol: string;
  decimal: number;
  pubBalance?: number;
  priBalance?: number;
};
