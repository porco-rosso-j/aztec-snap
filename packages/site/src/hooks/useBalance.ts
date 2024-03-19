import { useAppContext } from '../contexts/useAppContext';

export function useBalance() {
  const { snapWallet } = useAppContext();

  async function getBalance(token: string, address: string): Promise<number[]> {
    if (!snapWallet) {
      return [];
    }
    const balances = await snapWallet.getBalance(address, address, token);
    console.log('balances: ', balances);
    return [Number(balances[0]), Number(balances[1])];
  }

  return {
    getBalance,
  };
}
