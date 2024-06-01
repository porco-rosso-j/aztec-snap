import { AddNoteParams, ApiParams } from 'src/types';
import { getPXE } from '../utils';

export async function addPendingShieldNoteToPXE(apiParams: ApiParams) {
  const requestParams = apiParams.requestParams as AddNoteParams;

  const { ExtendedNote, Note, Fr, AztecAddress, TxHash } = await import(
    '@aztec/aztec.js'
  );
  const { TokenContract } = await import('@aztec/noir-contracts.js/Token');

  const note = new Note([
    new Fr(BigInt(requestParams.amount)),
    Fr.fromString(requestParams.secretHash),
  ]);

  const extendedNote = new ExtendedNote(
    note,
    AztecAddress.fromString(requestParams.from),
    AztecAddress.fromString(requestParams.token),
    TokenContract.storage.pending_shields.slot,
    TokenContract.notes.TransparentNote.id,
    TxHash.fromString(requestParams.txHash),
  );

  // const note = new Note([
  //   new apiParams.aztec.Fr(BigInt(requestParams.amount)),
  //   apiParams.aztec.Fr.fromString(requestParams.secretHash),
  // ]);

  // const extendedNote = new ExtendedNote(
  //   note,
  //   apiParams.aztec.AztecAddress.fromString(requestParams.from),
  //   apiParams.aztec.AztecAddress.fromString(requestParams.token),
  //   tokenContract.TokenContract.storage.pending_shields.slot,
  //   tokenContract.TokenContract.notes.TransparentNote.id,
  //   apiParams.aztec.TxHash.fromString(requestParams.txHash),
  // );

  console.log('note: ', note);
  const pxe = await getPXE();
  await pxe.addNote(extendedNote);
}

// type PendingShieldsSecret = {
//   owner: string;
//   secret: string;
//   txHash?: string;
// };

//   let psSecrets: string[] = apiParams.state
//     ?.secrets as string[];

//   psSecrets[psSecrets.length] = psSecret;

//   if (apiParams.state) {
//     apiParams.state.secrets = psSecrets;

//     await snap.request({
//       method: 'snap_manageState',
//       params: {
//         operation: 'update',
//         newState: apiParams.state,
//       },
//     });
//   }

//   const filter = {
//     txHash: txHash,
//     contractAddress: tokenAddress,
//     storageSlot: storageSlot,
//     owner: ownerAddress,
//     status: 1,
//   };

//   const new_notes = await pxe.getNotes(filter);
//   console.log('new_note: ', new_notes[new_notes.length - 1]);

//   const new_note = new_notes[new_notes.length - 1];
//   const amount_ = parseInt(new_note.note.items[0].toString(), 16);
//   console.log('amount_: ', amount_);
//   const secretHash_ = new_note.note.items[1].toString();
//   console.log('secretHash_: ', secretHash_);
