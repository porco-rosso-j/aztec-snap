import {
  AztecAddress,
  ExtendedNote,
  Fr,
  Note,
  TxHash,
  createPXEClient,
} from '@aztec/aztec.js';
import { PXE_URL } from '@abstract-crypto/aztec-snap-lib';

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
  console.log('note: ', note);
  const pxe = createPXEClient(PXE_URL);
  await pxe.addNote(note);
}
