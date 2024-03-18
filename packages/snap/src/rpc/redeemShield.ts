import { ApiParams, RedeemShieldParams } from 'src/types';
import {
  confirmRedeemShield,
  getECDSAWallet,
  getPXE,
  getPrivateKeys,
  getStateAccount,
  validateSender,
} from 'src/utils';

export const redeemShield = async (apiParams: ApiParams) => {
  const requestParams = apiParams.requestParams as RedeemShieldParams;
  if (!validateSender(apiParams, requestParams.from)) {
    throw 'selected account does not match "from"';
  }

  const { signingPrivateKey } = await getPrivateKeys(apiParams);

  const pxe = await getPXE();
  const account = await getECDSAWallet(
    pxe,
    await getStateAccount(apiParams, 0),
    signingPrivateKey,
  );

  const noirContracts = await import('@aztec/noir-contracts.js');
  const tokenContract = await noirContracts.TokenContract.at(
    apiParams.aztec.AztecAddress.fromString(requestParams.token),
    account,
  );

  const secrets: string[] = apiParams.state?.secrets as string[];
  const secret = apiParams.aztec.Fr.fromString(
    secrets[requestParams.secretIndex],
  );

  const sentTx = tokenContract.methods
    .redeem_shield(
      apiParams.aztec.AztecAddress.fromString(requestParams.from),
      BigInt(requestParams.amount),
      secret,
    )
    .send();

  if (
    !(await confirmRedeemShield(
      requestParams.from,
      requestParams.token,
      requestParams.amount.toString(),
    ))
  ) {
    throw new Error('Token Redemption must be approved by user');
  }

  const tx = await sentTx.wait();
  console.log('tx: ', tx);
  return tx.txHash.toString();
};
