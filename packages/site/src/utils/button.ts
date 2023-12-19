// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/ban-ts-comment
// @ts-ignore
import { isLocalSnap } from '@abstract-crypto/aztec-snap-lib/helpers';
import { Snap } from '../types';

export const shouldDisplayReconnectButton = (installedSnap?: Snap) =>
  installedSnap && isLocalSnap(installedSnap?.id);
