import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AccountContext from '.';
import request from '../../Utils/AxiosUtils';
import { SelfAPI } from '@/Utils/AxiosUtils/API';
import Cookies from 'js-cookie';

const AccountProvider = (props) => {
  const [mobileSideBar, setMobileSideBar] = useState(false);
  const [accountData, setAccountData] = useState();
  const { data, refetch, isLoading, error } = useQuery([SelfAPI], () => request({ url: SelfAPI }), {
    enabled: true,
    refetchOnWindowFocus: false,
    select: (res) => {
      return res?.data || null;
    },
  });

  const handleLogout = (mutate) => {
    setAccountData(null);
    Cookies.remove('authToken', { path: '/' });
    Cookies.remove('account');
    // Clear cart items from localStorage
    localStorage.removeItem('cart');
    refetch();
  };
  useEffect(() => {
    if (error) {
      setAccountData(null);
    } else if (data) {
      setAccountData(data);
    }
  }, [isLoading, data, error]);

  return (
    <AccountContext.Provider
      value={{ ...props, accountData, setAccountData, refetch, mobileSideBar, setMobileSideBar, handleLogout }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
