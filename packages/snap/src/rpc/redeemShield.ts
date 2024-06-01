import { ApiParams, RedeemShieldParams } from 'src/types';
import {
  confirmRedeemShield,
  getSnapECDSAWallet,
  getPrivateKeys,
  validateSender,
} from '../utils';

export const redeemShield = async (apiParams: ApiParams) => {
  const requestParams = apiParams.requestParams as RedeemShieldParams;
  if (!validateSender(apiParams, requestParams.from)) {
    throw 'selected account does not match "from"';
  }

  const { signingPrivateKey } = await getPrivateKeys(apiParams);

  const account = await getSnapECDSAWallet(apiParams, signingPrivateKey, 0);

  const { AztecAddress, Fr } = await import('@aztec/aztec.js');
  const { TokenContract } = await import('@aztec/noir-contracts.js/Token');

  const tokenContract = await TokenContract.at(
    AztecAddress.fromString(requestParams.token),
    account,
  );

  const secrets: string[] = apiParams.state?.secrets as string[];
  const secret = Fr.fromString(secrets[requestParams.secretIndex]);

  const sentTx = tokenContract.methods
    .redeem_shield(
      AztecAddress.fromString(requestParams.from),
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
