import { GetSnapsResponse, Snap } from '@abstract-crypto/aztec-snap';
import { defaultSnapOrigin } from '../constants';
import { request } from './request';

export const snapsDetected = () => {
  return window.ethereum != null;
};

/**
 * Detect if the version of MetaMask is Flask.
 */
export const detectFlask = async () => {
  const clientVersion = await request({
    method: 'web3_clientVersion',
  });

  return (clientVersion as string[])?.includes('flask');
};

/**
 * Get the Snap informations from MetaMask.
 */
export const getSnap = async () => {
  const snaps = (await request({
    method: 'wallet_getSnaps',
  })) as GetSnapsResponse;
  console.log('snaps: ', snaps);
  return snaps[defaultSnapOrigin] ?? null;
};

export const isLocalSnap = (snapId: string) => snapId.startsWith('local:');

export const isLocalSnapInstalled = (installedSnap: Snap | null) =>
  installedSnap && isLocalSnap(installedSnap?.id);
