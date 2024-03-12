import { type Snap } from '@abstract-crypto/aztec-snap-lib';
// import { SnapsProvider } from '@metamask/snaps-sdk';

// export const isLocalSnap = (snapId: string) => snapId.startsWith('local:');
import { isLocalSnap } from '../utils/snap';

export const shouldDisplayReconnectButton = (installedSnap: Snap | null) =>
  installedSnap && isLocalSnap(installedSnap?.id);
