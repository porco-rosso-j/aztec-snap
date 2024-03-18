import {
  AztecAddress,
  ExtendedNote,
  Fr,
  Note,
  TxHash,
  createPXEClient,
} from '@aztec/aztec.js';
import { PXE_URL } from './constants';
import { delay } from '.';

const storageSlot = new Fr(5);
const noteTypeId = new Fr(84114971101151129711410111011678111116101n);

export async function addPendingShieldNoteToPXE(
  ownerAddress: AztecAddress,
  tokenAddress: AztecAddress,
  shieldAmount: bigint,
  secretHash: Fr,
  txHash: TxHash,
) {
  console.log('shieldAmount: ', shieldAmount.toString());
  console.log('secretHash: ', secretHash.toString());
  const note = new ExtendedNote(
    new Note([new Fr(shieldAmount), secretHash]),
    ownerAddress,
    tokenAddress,
    storageSlot,
    noteTypeId,
    txHash,
  );

  //   console.log('new_note: ', note.note.items.values());
  console.log('note: ', note);
  const pxe = createPXEClient(PXE_URL);
  await pxe.addNote(note);

  //   export type NoteFilter = {
  //     /** Hash of a transaction from which to fetch the notes. */
  //     txHash?: TxHash;
  //     /** The contract address the note belongs to. */
  //     contractAddress?: AztecAddress;
  //     /** The specific storage location of the note on the contract. */
  //     storageSlot?: Fr;
  //     /** The owner of the note (whose public key was used to encrypt the note). */
  //     owner?: AztecAddress;
  //     /** The status of the note. Defaults to 'ACTIVE'. */
  //     status?: NoteStatus;
  //   };

  //   console.log('time: ', Date.now() / 1000);
  //   await delay(30000);
  //   console.log('time after: ', Date.now() / 1000);

  const new_notes = await pxe.getNotes({});
  console.log('new_notes: ', new_notes);

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
