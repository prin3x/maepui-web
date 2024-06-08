import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AccountContext from '.';
import request from '../../Utils/AxiosUtils';
import { SelfAPI } from '@/Utils/AxiosUtils/API';
import Cookies from 'js-cookie';

const AccountProvider = (props) => {
  const [mobileSideBar, setMobileSideBar] = useState(false);
  const [accountData, setAccountData] = useState();
  const { data, refetch, isLoading } = useQuery([SelfAPI], () => request({ url: SelfAPI }), {
    enabled: true,
    select: (res) => {
      return res?.data;
    },
  });

  const handleLogout = (router, mutate) => {
    setAccountData(null);
    Cookies.remove('authToken', { path: '/' });
    Cookies.remove('account');
    mutate();

    // Clear cart items from localStorage
    localStorage.removeItem('cartItems');
  };

  useEffect(() => {
    if (data) {
      setAccountData(data);
    }
  }, [isLoading, data]);

  return (
    <AccountContext.Provider
      value={{ ...props, accountData, setAccountData, refetch, mobileSideBar, setMobileSideBar, handleLogout }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
