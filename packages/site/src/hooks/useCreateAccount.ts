import { useInvokeSnap } from './snap';
import { createAccountSnap } from '@abstract-crypto/aztec-snap-lib/dest/index';

export const useCreateAccount = () => {
  const { invokeSnap } = useInvokeSnap();

  const createAccount = async () => {
    const response = await invokeSnap({
      method: 'aztec_createAccount',
      params: [],
    });
    console.log('response: ', response);
    // await createAccountSnap();
  };

  return { createAccount };
};
