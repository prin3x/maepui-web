'use client';
import AccountProvider from '@/Helper/AccountContext/AccountProvider';
import BlogProvider from '@/Helper/BlogContext/BlogProvider';
import CartProvider from '@/Helper/CartContext/CartProvider';
import CategoryProvider from '@/Helper/CategoryContext/CategoryProvider';
import CurrencyProvider from '@/Helper/CurrencyContext/CurrencyProvider';
import I18NextContext from '@/Helper/I18NextContext';
import ProductProvider from '@/Helper/ProductContext/ProductProvider';
import ProductIdsProvider from '@/Helper/ProductIdsContext/ProductIdsProvider';
import SettingProvider from '@/Helper/SettingContext/SettingProvider';
import ThemeOptionProvider from '@/Helper/ThemeOptionsContext/ThemeOptionProvider';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import SubLayout from './SubLayout';


const MainLayout = ({ children, lng  }) => {
  const { i18Lang, setI18Lang } = useContext(I18NextContext);
  const [queryClient] = useState(() => new QueryClient());
  useEffect(() => {
    if (i18Lang == '') {
      setI18Lang(lng);
    }
  }, [lng]);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={children.dehydratedState}>
          <ThemeOptionProvider>
            <AccountProvider>
              <BlogProvider>
                <ProductIdsProvider>
                    <CartProvider>
                      <CategoryProvider>
                        <ProductProvider>
                          <SettingProvider>
                            <CurrencyProvider>
                              <SubLayout children={children}  />
                            </CurrencyProvider>
                          </SettingProvider>
                        </ProductProvider>
                      </CategoryProvider>
                    </CartProvider>
                </ProductIdsProvider>
              </BlogProvider>
            </AccountProvider>
          </ThemeOptionProvider>
        </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <ToastContainer theme='colored' />
    </>
  );
};

export default MainLayout;
