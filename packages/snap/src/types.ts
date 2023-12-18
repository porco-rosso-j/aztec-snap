import { FunctionCall } from '@aztec/aztec.js';

export type MakeTransactionParams = {
  toAddress: string;
  amountInSatoshi: number;
};

export type SendTxParams = {
  funcCall: FunctionCall;
};

/**
 * Throws if the value passed in isn't of type MakeTransactionParams.
 *
 * @param params - The value to be checked.
 */
export function assertIsMakeTransactionParams(
  params: unknown,
): asserts params is MakeTransactionParams {
  if (
    !(
      typeof params === 'object' &&
      params !== null &&
      'toAddress' in params &&
      typeof params.toAddress === 'string' &&
      'amountInSatoshi' in params &&
      typeof params.amountInSatoshi === 'number'
    )
  ) {
    throw new Error('params must be instance of `MakeTransactionParams`');
  }
}

// eslint-disable-next-line jsdoc/require-jsdoc
export function assertIsSendTxParams(
  params: unknown,
): asserts params is SendTxParams {
  // type check should be here
  // if (
  //   !(
  //     typeof params === 'object' &&
  //     params !== null &&
  //     'toAddress' in params &&
  //     typeof params.toAddress === 'string' &&
  //     'amountInSatoshi' in params &&
  //     typeof params.amountInSatoshi === 'number'
  //   )
  // ) {
  //   throw new Error('params must be instance of `MakeTransactionParams`');
  // }
}
