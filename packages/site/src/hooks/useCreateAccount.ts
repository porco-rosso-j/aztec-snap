import { useInvokeSnap } from './snap';

export const useCreateAccount = () => {
  const { invokeSnap } = useInvokeSnap();

  const createAccount = async () => {
    await invokeSnap({
      method: 'aztec_createAccount',
      params: [],
    });
  };

  return { createAccount };
};
