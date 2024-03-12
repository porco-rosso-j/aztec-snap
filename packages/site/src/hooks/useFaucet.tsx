import { AztecAddress, createPXEClient } from '@aztec/aztec.js';
import { PXE_URL } from '../utils';
import { getInitialTestAccountsWallets } from '@aztec/accounts/testing';
import { TokenContract } from '@aztec/noir-contracts.js';
import { notifications } from '@mantine/notifications';
import { useAppContext } from '../contexts/useAppContext';

export default function useFaucet() {
  const { gasToken, saveGasToken } = useAppContext();

  async function getFaucet(recipient: string): Promise<string> {
    notifications.show({
      title: 'Requesting Faucet',
      message: 'it may take more than 20 seconds...',
    });
    const pxe = createPXEClient(PXE_URL);
    const wallet = (await getInitialTestAccountsWallets(pxe))[0];

    let tokenContract;
    try {
      if (gasToken) {
        tokenContract = await TokenContract.at(
          AztecAddress.fromString(gasToken),
          wallet,
        );
      } else {
        notifications.show({
          title: 'Deploying Token',
          message: 'gas token being deployed...',
        });
        tokenContract = await TokenContract.deploy(
          wallet,
          wallet.getAddress(),
          'GAS Token',
          'GAS',
          18,
        )
          .send()
          .deployed();

        saveGasToken(tokenContract.address.toString());
      }

      console.log('tokenContract: ', tokenContract);
      console.log('tokenContract address: ', tokenContract.address.toString());

      const tx = await tokenContract.methods
        .mint_public(AztecAddress.fromString(recipient), 1000n)
        .send()
        .wait();

      console.log('ret: ', tx);
      notifications.show({
        title: 'Faucet Sent!',
        message: 'check your balance',
      });
      return tokenContract.address.toString();
    } catch (e) {
      console.log('e: ', e);
      notifications.show({
        title: 'Faucet Failed',
        message: 'something went wrong',
      });
      return '';
    }
  }

  return {
    getFaucet,
  };
}
