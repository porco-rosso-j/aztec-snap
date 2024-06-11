import { useAppContext } from '../contexts/useAppContext';
import { USDC_ADDRESS, getL1Balance } from '../utils';

export function useBalance() {
  const { snapWallet } = useAppContext();

  async function getL2Balance(
    token: string,
    address: string,
  ): Promise<number[]> {
    if (!snapWallet) return [0, 0];

    const balances = await snapWallet.getBalance(address, token);
    console.log('balances: ', balances);
    return [Number(balances[0]), Number(balances[1])];
  }

  async function getL1TokenBalance(
    token: string,
    address?: string,
  ): Promise<number> {
    const balance = await getL1Balance(token, address);
    if (token == USDC_ADDRESS) {
      return Number((Number(balance) / 1e6).toFixed(2));
    } else {
      return Number((Number(balance) / 1e18).toFixed(2));
    }
  }

  return {
    getL2Balance,
    getL1TokenBalance,
  };
}
