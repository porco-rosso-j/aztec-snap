import { FunctionCall } from '@aztec/aztec.js';
import { FunctionData } from '@aztec/circuits.js';
import { ApiParams, SendTxParams } from 'src/types';

export const deserializeFunctionCall = async (
  apiParams: ApiParams,
): Promise<FunctionCall> => {
  const requestParams = apiParams.requestParams as SendTxParams;
  const funcCall = requestParams.calls[0];

  const circuitjs = await import('@aztec/circuits.js');
  const functionData = circuitjs.FunctionData.fromBuffer(
    Buffer.from(funcCall.functionData, 'hex'),
  ) as FunctionData;

  const functionCall: FunctionCall = {
    to: apiParams.aztec.AztecAddress.fromString(funcCall.to),
    functionData: functionData,
    args: funcCall.args.map((argStr) => apiParams.aztec.Fr.fromString(argStr)),
  };

  return functionCall;
};
