'use client';
import { useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/Layout/Loader';
import request from '@/Utils/AxiosUtils';
import MadridHomeBanner from './MadridHomeBanner';
import { SettingAPI } from '@/Utils/AxiosUtils/API';
import HomeBanner from '../ParisTheme/HomeBanner';
import ShopCategory from './ShopCategory';
import ProductWrapper from './ProductWrapper';
import BankOfferBanner from './BankOfferBanner';
import OtherSection from './OtherSection';
import StickyCart from '@/Layout/StickyCart';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import ProductIdsContext from '@/Helper/ProductIdsContext';
import { madridFullSlider } from '../../../Data/SliderSettingsData';

const MadridTheme = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { setGetProductIds, isLoading: productLoader } = useContext(ProductIdsContext);
  const { data, isLoading, refetch, fetchStatus } = useQuery(
    [SettingAPI, 'home'],
    () => request({ url: `${SettingAPI}/home` }),
    {
      enabled: true,
      refetchOnWindowFocus: false,
      select: (res) => res?.data,
    },
  );

  useEffect(() => {
    if (!isLoading && fetchStatus == 'fetching') {
      document.body.classList.add('skeleton-body');
    } else {
      document.body.classList.remove('skeleton-body');
    }

    if (data?.content?.products_ids?.length > 0) {
      setGetProductIds({ ids: Array.from(new Set(data?.content?.products_ids))?.join(',') });
    }
  }, [fetchStatus == 'fetching', !isLoading]);
  if (isLoading) return <Loader />;
  return (
    <>
      <MadridHomeBanner dataAPI={data?.content?.home_banner?.main_banner} />

      {data?.content?.featured_banners?.banners?.length > 0 &&
        data?.content?.featured_banners?.banners?.length >= 4 && (
          <HomeBanner bannersData={data?.content?.featured_banners?.banners} />
        )}

      <ShopCategory dataAPI={data?.content?.categories_image_list} />

      {data?.content?.products_list_1?.status && (
        <ProductWrapper
          dataAPI={data?.content?.products_list_1}
          noCustomClass={false}
          titleClass="title"
          customSliderOption={madridFullSlider}
          classObj={{ productStyle: 'product-standard theme-plus', productBoxClass: 'product-box-bg' }}
        />
      )}

      {data?.content?.bank_wallet_offers?.offers?.length > 0 && data?.content?.bank_wallet_offers?.status && (
        <BankOfferBanner dataAPI={data?.content?.bank_wallet_offers} />
      )}

      <OtherSection dataAPI={data?.content} />
      {themeOption?.general?.sticky_cart_enable && themeOption?.general?.cart_style !== 'cart_sidebar' && (
        <StickyCart />
      )}
    </>
  );
};

export default MadridTheme;
