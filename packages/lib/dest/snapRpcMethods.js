import { defaultSnapOrigin } from './constants';
export const snapRpcRequest = async (args) => {
    const result = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
            request: {
                method: `aztec_${args.snapRpcMethod}`,
                params: 'params' in args ? args.params : [],
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
            snapId: snapId ? snapId : defaultSnapOrigin,
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
            snapId: snapId ? snapId : defaultSnapOrigin,
        });
        return address;
    }
    catch (e) {
        console.log('e: ', e);
        return [];
    }
};
export const createAuthWitnessSnap = async (createAuthWitnessParam, snapId) => {
    try {
        const wittness = await snapRpcRequest({
            snapRpcMethod: 'createAuthWitness',
            params: createAuthWitnessParam,
            snapId: snapId ? snapId : defaultSnapOrigin,
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
            snapId: snapId ? snapId : defaultSnapOrigin,
        });
        return address;
    }
    catch (e) {
        console.log('e: ', e);
        return '';
    }
};
export const createSecretSnap = async (createSecretParams, snapId) => {
    try {
        const secret = await snapRpcRequest({
            snapRpcMethod: 'createSecretHash',
            params: createSecretParams,
            snapId: snapId ? snapId : defaultSnapOrigin,
        });
        return secret;
    }
    catch (e) {
        console.log('e: ', e);
        return '';
    }
};
export const getPendingShieldsSnap = async (getPendingShieldsParams, snapId) => {
    try {
        return await snapRpcRequest({
            snapRpcMethod: 'getPendingShields',
            params: getPendingShieldsParams,
            snapId: snapId ? snapId : defaultSnapOrigin,
        });
    }
    catch (e) {
        console.log('e: ', e);
        return undefined;
    }
};
export const redeemShieldSnap = async (redeemShieldParams, snapId) => {
    try {
        return await snapRpcRequest({
            snapRpcMethod: 'redeemShield',
            params: redeemShieldParams,
            snapId: snapId ? snapId : defaultSnapOrigin,
        });
    }
    catch (e) {
        console.log('e: ', e);
        return '';
    }
};
export const getBalanceSnap = async (getBalanceParams, snapId) => {
    try {
        return await snapRpcRequest({
            snapRpcMethod: 'getBalance',
            params: getBalanceParams,
            snapId: snapId ? snapId : defaultSnapOrigin,
        });
    }
    catch (e) {
        console.log('e: ', e);
        return [];
    }
};
export const updateBalancesSnap = async (getBalanceParams, snapId) => {
    try {
        return await snapRpcRequest({
            snapRpcMethod: 'updateBalances',
            params: getBalanceParams,
            snapId: snapId ? snapId : defaultSnapOrigin,
        });
    }
    catch (e) {
        console.log('e: ', e);
        return [];
    }
};
export const addTokenSnap = async (addTokenParams, snapId) => {
    try {
        await snapRpcRequest({
            snapRpcMethod: 'addToken',
            params: addTokenParams,
            snapId: snapId ? snapId : defaultSnapOrigin,
        });
    }
    catch (e) {
        console.log('e: ', e);
    }
};
export const getTokensSnap = async (getTokensParams, snapId) => {
    try {
        return await snapRpcRequest({
            snapRpcMethod: 'getTokens',
            params: getTokensParams,
            snapId: snapId ? snapId : defaultSnapOrigin,
        });
    }
    catch (e) {
        console.log('e: ', e);
        return [];
    }
};
export const getTransactionsSnap = async (getTransactionsParams, snapId) => {
    try {
        return await snapRpcRequest({
            snapRpcMethod: 'getTransactions',
            params: getTransactionsParams,
            snapId: snapId ? snapId : defaultSnapOrigin,
        });
    }
    catch (e) {
        console.log('e: ', e);
        return [];
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hcFJwY01ldGhvZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc25hcFJwY01ldGhvZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBbUJoRCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUNqQyxJQUE2QixFQUM3QixFQUFFO0lBQ0YsTUFBTSxNQUFNLEdBQUcsTUFBTSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUMzQyxNQUFNLEVBQUUsbUJBQW1CO1FBQzNCLE1BQU0sRUFBRTtZQUNOLE9BQU8sRUFBRTtnQkFDUCxNQUFNLEVBQUUsU0FBUyxJQUFJLENBQUMsYUFBdUIsRUFBRTtnQkFDL0MsTUFBTSxFQUFFLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7YUFDNUM7WUFDRCxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDcEI7S0FDRixDQUFDLENBQUM7SUFDSCxPQUFPLE1BQWdELENBQUM7QUFDMUQsQ0FBQyxDQUFDO0FBRUY7O0dBRUc7QUFFSCxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsS0FBSyxFQUM3QixZQUEwQixFQUMxQixNQUFlLEVBQ0UsRUFBRTtJQUNuQixJQUFJO1FBQ0YsT0FBTyxNQUFNLGNBQWMsQ0FBQztZQUMxQixhQUFhLEVBQUUsUUFBUTtZQUN2QixNQUFNLEVBQUUsWUFBWTtZQUNwQixNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGlCQUFpQjtTQUM1QyxDQUFDLENBQUM7S0FDSjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEIsT0FBTyxFQUFFLENBQUM7S0FDWDtBQUNILENBQUMsQ0FBQztB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