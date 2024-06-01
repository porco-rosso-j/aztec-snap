import type { FunctionCall, PackedValues } from '@aztec/aztec.js';
import { ApiParams, SendTxParams } from 'src/types';

type DeserializeFunctionCallReturn = {
  functionCall: FunctionCall;
  packedValues: PackedValues;
};

export const deserializeFunctionCall = async (
  apiParams: ApiParams,
): Promise<DeserializeFunctionCallReturn> => {
  const requestParams = apiParams.requestParams as SendTxParams;
  const funcCall = requestParams.calls[0];
  // TODO: funcCall.to == requestParams.from

  const { Fr, AztecAddress, PackedValues } = await import('@aztec/aztec.js');
  const { FunctionData } = await import('@aztec/circuits.js');

  const args = funcCall.args.map((argStr) => Fr.fromString(argStr));
  const packedValues = PackedValues.fromValues(args);

  const functionData = FunctionData.fromBuffer(
    Buffer.from(funcCall.functionData, 'hex'),
  );

  const functionCall: FunctionCall = {
    to: AztecAddress.fromString(funcCall.to),
    functionData: functionData,
    args: args,
    isStatic: false,
  };

  return { functionCall, packedValues };
};
