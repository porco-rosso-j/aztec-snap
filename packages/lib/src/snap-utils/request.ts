import { Snap } from '@abstract-crypto/aztec-snap';
import type { RequestArguments } from '@metamask/providers';
import { defaultSnapOrigin } from '../constants';

export type Request = (params: RequestArguments) => Promise<any>;

export const request: Request = async ({ method, params }) => {
  try {
    const data =
      (await window.ethereum?.request({
        method,
        params,
      } as RequestArguments)) ?? null;
    console.log('data: ', data);
    return data;
  } catch (requestError: any) {
    return null;
  }
};

export const requestSnap = async (
  snapId = defaultSnapOrigin,
  version?: string,
) => {
  const snaps = (await request({
    method: 'wallet_requestSnaps',
    params: {
      [snapId]: { version },
    },
  })) as Record<string, Snap>;
  console.log('snaps in requestSnap: ', snaps);
};
