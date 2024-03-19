import { ApiParams, Transaction } from 'src/types';

export const getTransactions = async (
  apiParams: ApiParams,
): Promise<Transaction[]> => {
  // const requestParams = apiParams.requestParams as GetTransactionParams;
  const transactions: Transaction[] = apiParams.state
    ?.transactions as Transaction[];
  if (transactions.length != 0) {
    return transactions;
  } else {
    return [];
  }
};

// https://docs.aztec.network/apis/pxe/interfaces/pxe#viewtx
// pxe.viewTx(functionName, args, to, from?)
// need unconstrained balance fetch func?
