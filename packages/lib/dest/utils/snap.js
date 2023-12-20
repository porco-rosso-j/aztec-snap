import { defaultSnapOrigin } from './constants.js';
/**
 * Get the installed snaps in MetaMask.
 *
 * @returns The snaps installed in MetaMask.
 */
export const getSnaps = async () => {
    return (await window.ethereum.request({
        method: 'wallet_getSnaps',
    }));
};
/**
 * Connect a snap to MetaMask.
 *
 * @param snapId - The ID of the snap.
 * @param params - The params to pass with the snap to connect.
 */
export const connectSnap = async (snapId = defaultSnapOrigin, params = {}) => {
    await window.ethereum.request({
        method: 'wallet_requestSnaps',
        params: {
            [snapId]: params,
        },
    });
};
export const getSnap = async (version) => {
    try {
        const snaps = await getSnaps();
        return Object.values(snaps).find((snap) => snap.id === defaultSnapOrigin && (!version || snap.version === version));
    }
    catch (e) {
        console.log('Failed to obtain installed snap', e);
        return undefined;
    }
};
export const isLocalSnap = (snapId) => snapId.startsWith('local:');
const snapRpcRequest = async (args) => {
    console.log('7');
    console.log('args.snapRpcMethod', args.snapRpcMethod);
    console.log('args.params', args);
    const result = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
            snapId: defaultSnapOrigin,
            request: {
                method: `azt_${args.snapRpcMethod}`,
                params: 'params' in args ? args.params : undefined,
            },
        },
    });
    console.log('result', result);
    return result;
};
/**
 * Invoke the "azte_sendTx" RPC method from the snap.
 */
export const sendTxSnap = async ({ txRequest }) => {
    return snapRpcRequest({
        snapRpcMethod: 'sendTx',
        params: {
            txRequest,
        },
    });
};
/**
 * Invoke the "doge_getAddress" RPC method from the snap.
 */
export const getPxeAddress = async () => {
    return snapRpcRequest({
        snapRpcMethod: 'getAddress',
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9zbmFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRW5EOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQUcsS0FBSyxJQUErQixFQUFFO0lBQzVELE9BQU8sQ0FBQyxNQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQ3BDLE1BQU0sRUFBRSxpQkFBaUI7S0FDMUIsQ0FBQyxDQUFnQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQztBQUVGOzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLEtBQUssRUFDOUIsU0FBaUIsaUJBQWlCLEVBQ2xDLFNBQThDLEVBQUUsRUFDaEQsRUFBRTtJQUNGLE1BQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFDNUIsTUFBTSxFQUFFLHFCQUFxQjtRQUM3QixNQUFNLEVBQUU7WUFDTixDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU07U0FDakI7S0FDRixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUcsS0FBSyxFQUFFLE9BQWdCLEVBQTZCLEVBQUU7SUFDM0UsSUFBSTtRQUNGLE1BQU0sS0FBSyxHQUFHLE1BQU0sUUFBUSxFQUFFLENBQUM7UUFFL0IsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FDOUIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUNQLElBQUksQ0FBQyxFQUFFLEtBQUssaUJBQWlCLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLE9BQU8sQ0FBQyxDQUMxRSxDQUFDO0tBQ0g7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEQsT0FBTyxTQUFTLENBQUM7S0FDbEI7QUFDSCxDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsQ0FBQyxNQUFjLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7QUFPM0UsTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUMxQixJQUE2QixFQUM3QixFQUFFO0lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNqQyxNQUFNLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQzNDLE1BQU0sRUFBRSxtQkFBbUI7UUFDM0IsTUFBTSxFQUFFO1lBQ04sTUFBTSxFQUFFLGlCQUFpQjtZQUN6QixPQUFPLEVBQUU7Z0JBQ1AsTUFBTSxFQUFFLE9BQU8sSUFBSSxDQUFDLGFBQXVCLEVBQUU7Z0JBQzdDLE1BQU0sRUFBRSxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTO2FBQ25EO1NBQ0Y7S0FDRixDQUFDLENBQUM7SUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM5QixPQUFPLE1BQWdELENBQUM7QUFDMUQsQ0FBQyxDQUFDO0FBRUY7O0dBRUc7QUFFSCxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFnQixFQUFFLEVBQUU7SUFDOUQsT0FBTyxjQUFjLENBQUM7UUFDcEIsYUFBYSxFQUFFLFFBQVE7UUFDdkIsTUFBTSxFQUFFO1lBQ04sU0FBUztTQUNWO0tBQ0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUY7O0dBRUc7QUFFSCxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFDdEMsT0FBTyxjQUFjLENBQUM7UUFDcEIsYUFBYSxFQUFFLFlBQVk7S0FDNUIsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=