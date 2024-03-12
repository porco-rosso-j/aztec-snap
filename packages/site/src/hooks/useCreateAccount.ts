import { useEffect, useState } from 'react';
import { useInvokeSnap } from './snap';
import { useAppContext } from '../contexts/useAppContext';

export const useCreateAccount = () => {
  const { saveAccountAddress } = useAppContext();
  const { invokeSnap } = useInvokeSnap();
  //   const [address, setAddress] = useState<string | undefined>();
  //   console.log('address: ', address);

  //   useEffect(() => {
  //     saveAccountAddress(
  //       '0x24e241af4dd2829acf6058a7ecdf4f659bece212c4ef61c0747a1a8a5b47bbf0',
  //     );
  //   });

  const createAccount = async () => {
    const response = await invokeSnap({
      method: 'aztec_createAccount',
      params: [],
    });
    if (response) {
      saveAccountAddress(response);
    }
  };

  return { createAccount };
};
