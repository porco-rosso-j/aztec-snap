import {
  ApiParams,
  GetPendingShields,
  RedeemShieldParams,
  RedeemablePendingShield,
} from 'src/types';
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

export const getRedeemablePendingShields = async (apiParams: ApiParams) => {
  const requestParams = apiParams.requestParams as GetPendingShields;

  const filter = {
    contractAddress: apiParams.aztec.AztecAddress.fromString(
      requestParams.token,
    ),
    storageSlot: new apiParams.aztec.Fr(5),
    owner: apiParams.aztec.AztecAddress.fromString(requestParams.from),
    status: 1,
  };

  const pxe = await getPXE();
  const notes = await pxe.getNotes(filter);

  const secrets: string[] = apiParams.state?.secrets as string[];

  let redeemablePendingShields: RedeemablePendingShield[] = [];
  // if both secrets and notes exist
  if (secrets.length !== 0 && notes.length !== 0) {
    for (let i = 0; i < secrets.length; i++) {
      for (let j = 0; j < notes.length; j++) {
        const secretHashInNote = notes[j].note.items[1].toString();

        const secretHashFromState = apiParams.aztec.computeMessageSecretHash(
          apiParams.aztec.Fr.fromString(secrets[i]),
        );

        if (secretHashInNote == secretHashFromState.toString()) {
          redeemablePendingShields.push({
            from: notes[j].owner.toString(),
            token: notes[j].contractAddress.toString(),
            amount: parseInt(notes[j].note.items[0].toString(), 16),
            secretIndex: i,
          } as RedeemablePendingShield);
        }
      }
    }
  } else if (secrets.length !== 0 && notes.length === 0) {
    // use secrets
    // brute-force by by staticcalling / simulating redeem_shield()
  } else if (secrets.length === 0 && notes.length !== 0) {
    // compute secrets deterministically again with loop < notes.length
    // re-do getNotes() with the secrets
  } else {
    // compute secrets deterministically again
    // and brute force by staticcalling / simulating redeem_shield() ...?
    // store only successfull calls and returns
  }

  return redeemablePendingShields;
};
