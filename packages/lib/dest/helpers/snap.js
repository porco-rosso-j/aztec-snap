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
    return result;
};
export const sendTxSnap = async ({ txRequest }) => {
    return snapRpcRequest({
        snapRpcMethod: 'sendTx',
        params: {
            txRequest,
        },
    });
};
/**
 * Invoke the "azte_getAddress" RPC method from the snap.
 */
export const getPxeAddress = async () => {
    return snapRpcRequest({
        snapRpcMethod: 'getAddress',
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL3NuYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbkQ7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBRyxLQUFLLElBQStCLEVBQUU7SUFDNUQsT0FBTyxDQUFDLE1BQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFDcEMsTUFBTSxFQUFFLGlCQUFpQjtLQUMxQixDQUFDLENBQWdDLENBQUM7QUFDckMsQ0FBQyxDQUFDO0FBRUY7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsS0FBSyxFQUM5QixTQUFpQixpQkFBaUIsRUFDbEMsU0FBOEMsRUFBRSxFQUNoRCxFQUFFO0lBQ0YsTUFBTSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUM1QixNQUFNLEVBQUUscUJBQXFCO1FBQzdCLE1BQU0sRUFBRTtZQUNOLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTTtTQUNqQjtLQUNGLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxLQUFLLEVBQUUsT0FBZ0IsRUFBNkIsRUFBRTtJQUMzRSxJQUFJO1FBQ0YsTUFBTSxLQUFLLEdBQUcsTUFBTSxRQUFRLEVBQUUsQ0FBQztRQUUvQixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUM5QixDQUFDLElBQUksRUFBRSxFQUFFLENBQ1AsSUFBSSxDQUFDLEVBQUUsS0FBSyxpQkFBaUIsSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLENBQzFFLENBQUM7S0FDSDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsRCxPQUFPLFNBQVMsQ0FBQztLQUNsQjtBQUNILENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBRyxDQUFDLE1BQWMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQU8zRSxNQUFNLGNBQWMsR0FBRyxLQUFLLEVBQzFCLElBQTZCLEVBQzdCLEVBQUU7SUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2pDLE1BQU0sTUFBTSxHQUFHLE1BQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFDM0MsTUFBTSxFQUFFLG1CQUFtQjtRQUMzQixNQUFNLEVBQUU7WUFDTixNQUFNLEVBQUUsaUJBQWlCO1lBQ3pCLE9BQU8sRUFBRTtnQkFDUCxNQUFNLEVBQUUsT0FBTyxJQUFJLENBQUMsYUFBdUIsRUFBRTtnQkFDN0MsTUFBTSxFQUFFLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVM7YUFDbkQ7U0FDRjtLQUNGLENBQUMsQ0FBQztJQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLE9BQU8sTUFBZ0QsQ0FBQztBQUMxRCxDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFnQixFQUFFLEVBQUU7SUFDOUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQixPQUFPLGNBQWMsQ0FBQztRQUNwQixhQUFhLEVBQUUsUUFBUTtRQUN2QixNQUFNLEVBQUU7WUFDTixTQUFTO1NBQ1Y7S0FDRixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFRjs7R0FFRztBQUVILDBDQUEwQztBQUMxQyxlQUFlO0FBQ2YsS0FBSztBQUNMLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxLQUFLLElBQUksRUFBRTtJQUN0QyxPQUFPLGNBQWMsQ0FBQztRQUNwQixhQUFhLEVBQUUsWUFBWTtLQUM1QixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==