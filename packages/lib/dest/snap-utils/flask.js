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
    return clientVersion?.includes('flask');
};
/**
 * Get the Snap informations from MetaMask.
 */
export const getSnap = async () => {
    const snaps = (await request({
        method: 'wallet_getSnaps',
    }));
    console.log('snaps: ', snaps);
    return snaps[defaultSnapOrigin] ?? null;
};
export const isLocalSnap = (snapId) => snapId.startsWith('local:');
export const isLocalSnapInstalled = (installedSnap) => installedSnap && isLocalSnap(installedSnap?.id);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhc2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc25hcC11dGlscy9mbGFzay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDakQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUVwQyxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsR0FBRyxFQUFFO0lBQ2hDLE9BQU8sTUFBTSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUM7QUFDakMsQ0FBQyxDQUFDO0FBRUY7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFDcEMsTUFBTSxhQUFhLEdBQUcsTUFBTSxPQUFPLENBQUM7UUFDbEMsTUFBTSxFQUFFLG9CQUFvQjtLQUM3QixDQUFDLENBQUM7SUFFSCxPQUFRLGFBQTBCLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3hELENBQUMsQ0FBQztBQUVGOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHLEtBQUssSUFBSSxFQUFFO0lBQ2hDLE1BQU0sS0FBSyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUM7UUFDM0IsTUFBTSxFQUFFLGlCQUFpQjtLQUMxQixDQUFDLENBQXFCLENBQUM7SUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDOUIsT0FBTyxLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxJQUFJLENBQUM7QUFDMUMsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLENBQUMsTUFBYyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRTNFLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLENBQUMsYUFBMEIsRUFBRSxFQUFFLENBQ2pFLGFBQWEsSUFBSSxXQUFXLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDIn0=