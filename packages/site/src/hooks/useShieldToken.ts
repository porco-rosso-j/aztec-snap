import { AztecAddress, Fr } from '@aztec/aztec.js';
import { TokenContract } from '@aztec/noir-contracts.js';
import { useState } from 'react';
import { useBalance } from './useBalance';
import { useAppContext } from '../contexts/useAppContext';
import { addPendingShieldNoteToPXE } from '../utils';

export const useShieldToken = () => {
  const [shieldTxHash, setTxHash] = useState<string | undefined>();
  const { snapWallet } = useAppContext();
  const { getL2Balance } = useBalance();
  const [isLoading, setIsLoading] = useState(false);
  const [shieldLoadingId, setShieldLoadingId] = useState(0);
  const [error, setError] = useState<string | undefined>();

  const shieldToken = async (
    token: string,
    from: string,
    amount: number,
    shield: boolean,
  ) => {
    if (isLoading || !snapWallet) {
      return;
    }

    try {
      setError(undefined);
      setTxHash(undefined);
      setIsLoading(true);
      setShieldLoadingId(shield ? 1 : 2);

      const tokenContract = await TokenContract.at(
        AztecAddress.fromString(token),
        snapWallet,
      );

      let sentTx;
      if (shield) {
        const secretHash = await snapWallet.createSecretHash(token);
        console.log('secretHash: ', secretHash);

        console.log('sending: ');
        sentTx = tokenContract.methods
          .shield(
            AztecAddress.fromString(from),
            BigInt(amount),
            Fr.fromString(secretHash),
            0,
          )
          .send();

        console.log('sentTx: ', sentTx);

        await sentTx.wait();

        await addPendingShieldNoteToPXE(
          AztecAddress.fromString(from),
          AztecAddress.fromString(token),
          BigInt(amount),
          Fr.fromString(secretHash),
          await sentTx.getTxHash(),
        );
      } else {
        sentTx = tokenContract.methods
          .unshield(
            AztecAddress.fromString(from),
            AztecAddress.fromString(from),
            BigInt(amount),
            0,
          )
          .send();
        await sentTx.wait();
      }

      console.log('sent?: ');
      const txHash = await sentTx.getTxHash();
      console.log('txHash: ', txHash);
      setTxHash(txHash.toString());

      const balance = await getL2Balance(token, from);
      console.log('balance: ', balance);
    } catch (err: unknown) {
      console.log('err: ', err);
    }
    setIsLoading(false);
  };

  return { shieldTxHash, isLoading, shieldLoadingId, error, shieldToken };
};
