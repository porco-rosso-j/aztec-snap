import { defaultSnapOrigin } from './constants';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hcFJwY01ldGhvZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc25hcFJwY01ldGhvZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBYWhELE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxLQUFLLEVBQ2pDLElBQTZCLEVBQzdCLEVBQUU7SUFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQzNDLE1BQU0sRUFBRSxtQkFBbUI7UUFDM0IsTUFBTSxFQUFFO1lBQ04sT0FBTyxFQUFFO2dCQUNQLE1BQU0sRUFBRSxTQUFTLElBQUksQ0FBQyxhQUF1QixFQUFFO2dCQUMvQyxNQUFNLEVBQUUsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUzthQUNuRDtZQUNELE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNwQjtLQUNGLENBQUMsQ0FBQztJQUNILE9BQU8sTUFBZ0QsQ0FBQztBQUMxRCxDQUFDLENBQUM7QUFFRjs7R0FFRztBQUVILE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxLQUFLLEVBQzdCLFlBQTBCLEVBQzFCLE1BQWUsRUFDRSxFQUFFO0lBQ25CLElBQUk7UUFDRixPQUFPLE1BQU0sY0FBYyxDQUFDO1lBQzFCLGFBQWEsRUFBRSxRQUFRO1lBQ3ZCLE1BQU0sRUFBRSxZQUFZO1lBQ3BCLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsaUJBQWlCO1NBQzVDLENBQUMsQ0FBQztLQUNKO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0QixPQUFPLEVBQUUsQ0FBQztLQUNYO0FBQ0gsQ0FBQyxDQUFDO0FB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