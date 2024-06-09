import React, { useContext } from 'react';
import Btn from '@/Elements/Buttons/Btn';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { useRouter } from 'next/navigation';
import request from '@/Utils/AxiosUtils';
import { toast } from 'react-toastify';
import { OrderAPI } from '@/Utils/AxiosUtils/API';

const PlaceOrder = ({ values, createOrderParams }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const router = useRouter();

  const placeOrder = async (orderData) => {
    const response = await request({ url: `${OrderAPI}/myorders`, method: 'POST', data: createOrderParams() });
    if (response.status === 201) {
      toast.success(`สั่งซื้อสำเร็จแล้ว`);
      router.push(`/${i18Lang}/account/order`);
    } else {
      toast.error(`สั่งซื้อไม่สำเร็จ`);
    }
  };

  const handleClick = () => {
    placeOrder(values);
  };
  return (
    <Btn className="btn-md fw-bold mt-4 text-white theme-bg-color w-100" onClick={handleClick}>
      {t('PlaceOrder')}
    </Btn>
  );
};

export default PlaceOrder;
