import {
  AztecAddress,
  createPXEClient,
  SignerlessWallet,
} from '@aztec/aztec.js';
import { TokenContract } from '@aztec/noir-contracts.js';
import { PXE_URL } from '../utils/constants';
import { useEffect, useState } from 'react';
import { useAddress } from '.';
import { useAppContext } from '../contexts/useAppContext';

export default function useBalance() {
  const { gasToken } = useAppContext();
  const { address } = useAddress();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const checkBalance = async () => {
      if (address && gasToken) {
        console.log('getBalance: ', address, ' & ', gasToken);
        const balance = await getBalance(gasToken, address);
        setBalance(balance);
      }
    };

    checkBalance();
  }, [address, gasToken]);

  async function getBalance(token: string, address: string): Promise<number> {
    const pxe = createPXEClient(PXE_URL);

    // https://github.com/porco-rosso-j/aztec_lend/blob/34e70cbc335222413c2edba1bae0a424a33288f1/src/scripts/cross-chain.ts#L436
    const l2tokenContract = await TokenContract.at(
      AztecAddress.fromString(token),
      new SignerlessWallet(pxe),
    );

    const balance = await l2tokenContract.methods
      .balance_of_public(AztecAddress.fromString(address))
      .view();

    return Number(balance);
  }

  return {
    balance,
    setBalance,
    getBalance,
  };
}
