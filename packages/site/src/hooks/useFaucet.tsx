import {
  AztecAddress,
  ExtendedNote,
  Fr,
  Note,
  TxHash,
  computeMessageSecretHash,
  createPXEClient,
} from '@aztec/aztec.js';
import { PXE_URL } from '../utils';
import { getInitialTestAccountsWallets } from '@aztec/accounts/testing';
import { TokenContract } from '@aztec/noir-contracts.js';
import { notifications } from '@mantine/notifications';
import { useAppContext } from '../contexts/useAppContext';

export default function useFaucet() {
  const { gasToken, saveGasToken } = useAppContext();

  async function getFaucet(recipient: string, pub: boolean): Promise<string> {
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

      if (pub) {
        const tx = await tokenContract.methods
          .mint_public(AztecAddress.fromString(recipient), 1000n)
          .send()
          .wait();

        console.log('ret: ', tx);
        notifications.show({
          title: 'Faucet Sent!',
          message: 'check your public balance',
        });
      } else {
        const secret = Fr.random();
        const secretHash = computeMessageSecretHash(secret);

        const tx = await tokenContract.methods
          .mint_private(1000n, secretHash)
          .send()
          .wait();

        console.log('wallet.getAddress(): ', wallet.getAddress());
        console.log(
          'AztecAddress.fromString(recipient): ',
          AztecAddress.fromString(recipient),
        );

        await addPendingShieldNoteToPXE(
          wallet.getAddress(),
          AztecAddress.fromString(gasToken),
          1000n,
          secretHash,
          tx.txHash,
        );

        const redeemTx = await tokenContract.methods
          .redeem_shield(wallet.getAddress(), 1000n, secret)
          .send()
          .wait();

        console.log('redeemTx: ', redeemTx);

        const sendTx = await tokenContract.methods
          .transfer(
            wallet.getAddress(),
            AztecAddress.fromString(recipient),
            1000n,
            0,
          )
          .send()
          .wait();

        console.log('ret: ', tx);
        console.log('sendTx: ', sendTx);
        notifications.show({
          title: 'Faucet Sent!',
          message: 'check your private balance',
        });
      }

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

  async function addPendingShieldNoteToPXE(
    ownerAddress: AztecAddress,
    tokenAddress: AztecAddress,
    shieldAmount: bigint,
    secretHash: Fr,
    txHash: TxHash,
  ) {
    const storageSlot = new Fr(5);
    const noteTypeId = new Fr(84114971101151129711410111011678111116101n);

    const note = new ExtendedNote(
      new Note([new Fr(shieldAmount), secretHash]),
      ownerAddress,
      tokenAddress,
      storageSlot,
      noteTypeId,
      txHash,
    );
    const pxe = createPXEClient(PXE_URL);
    await pxe.addNote(note);
  }
  return {
    getFaucet,
  };
}
