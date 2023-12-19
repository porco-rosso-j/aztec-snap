export type SendTxParams = {
  txRequest: string;
};

/**
 * Throws if the value passed in isn't of type MakeTransactionParams.
 *
 * @param params - The value to be checked.
 */
export function assertIsSendTxParams(
  params: unknown,
): asserts params is SendTxParams {
  if (
    !(
      typeof params === 'object' &&
      params !== null &&
      'txRequest' in params &&
      typeof params.txRequest === 'string'
    )
  ) {
    throw new Error('params must be instance of `MakeTransactionParams`');
  }
}
