import AccountContext from '@/Helper/AccountContext';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

const LogoutHandle = (router, refetch, compareRefetch) => {
  Cookies.remove('authToken', { path: '/' });
  Cookies.remove('account');
  refetch();
  compareRefetch();
  router.push('/');
};

const useHandleLogout = () => {
  const { refetch } = useContext(AccountContext);
  const router = useRouter();
  return useMutation(
    () => Promise.resolve(), // No API call needed for logout
    {
      onSuccess: () => LogoutHandle(router, refetch),
    },
  );
};

export default useHandleLogout;
