import { isLocalSnap } from '@abstract-crypto/aztec-snap-lib';
import { type Snap } from '@abstract-crypto/aztec-snap-lib';

export const shouldDisplayReconnectButton = (installedSnap?: Snap) =>
  installedSnap && isLocalSnap(installedSnap?.id);
