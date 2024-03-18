import {
  AztecAddress,
  ExtendedNote,
  Fr,
  Note,
  TxHash,
  createPXEClient,
} from '@aztec/aztec.js';
import { ApiParams } from 'src/types';
import { getPXE } from 'src/utils';

const storageSlot = new Fr(5);
const noteTypeId = new Fr(84114971101151129711410111011678111116101n);

type AddNoteParams = {
  from: string;
  token: string;
  amount: number;
  secretHash: string;
  txHash: string;
};

type PendingShieldsSecret = {
  owner: string;
  secret: string;
  txHash?: string;
};

export async function addPendingShieldNoteToPXE(apiParams: ApiParams) {
  const requestParams = apiParams.requestParams as AddNoteParams;

  const note = new Note([
    new apiParams.aztec.Fr(BigInt(requestParams.amount)),
    apiParams.aztec.Fr.fromString(requestParams.secretHash),
  ]);

  const extendedNote = new ExtendedNote(
    note,
    apiParams.aztec.AztecAddress.fromString(requestParams.from),
    apiParams.aztec.AztecAddress.fromString(requestParams.token),
    storageSlot,
    noteTypeId,
    apiParams.aztec.TxHash.fromString(requestParams.txHash),
  );

  //   console.log('new_note: ', note.note.items.values());
  console.log('note: ', note);
  const pxe = await getPXE();
  await pxe.addNote(extendedNote);

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
}
