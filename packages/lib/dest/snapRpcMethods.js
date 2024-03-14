export const snapRpcRequest = async (args) => {
    const result = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
            request: {
                method: `aztec_${args.snapRpcMethod}`,
                params: 'params' in args ? args.params : undefined,
            },
            snapId: args.snapId,
        },
    });
    return result;
};
/**
 * Invoke the "azte_sendTx" RPC method from the snap.
 */
export const sendTxSnap = async (sendTxParams, snapId) => {
    try {
        return await snapRpcRequest({
            snapRpcMethod: 'sendTx',
            params: sendTxParams,
            snapId: snapId,
        });
    }
    catch (e) {
        console.log('e: ', e);
        return '';
    }
};
/**
 * Invoke the "azt_getAddress" RPC method from the snap.
 */
export const getAddressSnap = async (snapId) => {
    try {
        const address = await snapRpcRequest({
            snapRpcMethod: 'accounts',
            snapId: snapId,
        });
        return address[0];
    }
    catch (e) {
        console.log('e: ', e);
        return '';
    }
};
export const createAuthWitnessSnap = async (createAuthWitnessParam, snapId) => {
    try {
        const wittness = await snapRpcRequest({
            snapRpcMethod: 'createAuthWitness',
            params: createAuthWitnessParam,
            snapId: snapId,
        });
        return wittness;
    }
    catch (e) {
        console.log('e: ', e);
        return '';
    }
};
export const createAccountSnap = async (snapId) => {
    try {
        const address = await snapRpcRequest({
            snapRpcMethod: 'createAccount',
            snapId: snapId,
        });
        return address;
    }
    catch (e) {
        console.log('e: ', e);
        return '';
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hcFJwY01ldGhvZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc25hcFJwY01ldGhvZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLEtBQUssRUFDakMsSUFBNkIsRUFDN0IsRUFBRTtJQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFDM0MsTUFBTSxFQUFFLG1CQUFtQjtRQUMzQixNQUFNLEVBQUU7WUFDTixPQUFPLEVBQUU7Z0JBQ1AsTUFBTSxFQUFFLFNBQVMsSUFBSSxDQUFDLGFBQXVCLEVBQUU7Z0JBQy9DLE1BQU0sRUFBRSxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTO2FBQ25EO1lBQ0QsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCO0tBQ0YsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxNQUFnRCxDQUFDO0FBQzFELENBQUMsQ0FBQztBQUVGOztHQUVHO0FBRUgsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLEtBQUssRUFDN0IsWUFBMEIsRUFDMUIsTUFBYyxFQUNHLEVBQUU7SUFDbkIsSUFBSTtRQUNGLE9BQU8sTUFBTSxjQUFjLENBQUM7WUFDMUIsYUFBYSxFQUFFLFFBQVE7WUFDdkIsTUFBTSxFQUFFLFlBQVk7WUFDcEIsTUFBTSxFQUFFLE1BQU07U0FDZixDQUFDLENBQUM7S0FDSjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEIsT0FBTyxFQUFFLENBQUM7S0FDWDtBQUNILENBQUMsQ0FBQztBQUVGOztHQUVHO0FBRUgsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLEtBQUssRUFBRSxNQUFjLEVBQW1CLEVBQUU7SUFDdEUsSUFBSTtRQUNGLE1BQU0sT0FBTyxHQUFHLE1BQU0sY0FBYyxDQUFDO1lBQ25DLGFBQWEsRUFBRSxVQUFVO1lBQ3pCLE1BQU0sRUFBRSxNQUFNO1NBQ2YsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbkI7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sRUFBRSxDQUFDO0tBQ1g7QUFDSCxDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBRyxLQUFLLEVBQ3hDLHNCQUE4QyxFQUM5QyxNQUFjLEVBQ0csRUFBRTtJQUNuQixJQUFJO1FBQ0YsTUFBTSxRQUFRLEdBQUcsTUFBTSxjQUFjLENBQUM7WUFDcEMsYUFBYSxFQUFFLG1CQUFtQjtZQUNsQyxNQUFNLEVBQUUsc0JBQXNCO1lBQzlCLE1BQU0sRUFBRSxNQUFNO1NBQ2YsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxRQUFRLENBQUM7S0FDakI7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sRUFBRSxDQUFDO0tBQ1g7QUFDSCxDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxLQUFLLEVBQUUsTUFBYyxFQUFtQixFQUFFO0lBQ3pFLElBQUk7UUFDRixNQUFNLE9BQU8sR0FBRyxNQUFNLGNBQWMsQ0FBQztZQUNuQyxhQUFhLEVBQUUsZUFBZTtZQUM5QixNQUFNLEVBQUUsTUFBTTtTQUNmLENBQUMsQ0FBQztRQUNILE9BQU8sT0FBTyxDQUFDO0tBQ2hCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0QixPQUFPLEVBQUUsQ0FBQztLQUNYO0FBQ0gsQ0FBQyxDQUFDIn0=