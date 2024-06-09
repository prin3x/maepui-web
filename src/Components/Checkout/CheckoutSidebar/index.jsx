import React, { useContext, useEffect, useState } from 'react';
import { Card, Col } from 'reactstrap';
import SettingContext from '../../../Helper/SettingContext';
import { useTranslation } from '@/app/i18n/client';
import SidebarProduct from './SidebarProduct';
import CartContext from '@/Helper/CartContext';
import PointWallet from './PointWallet';
import I18NextContext from '@/Helper/I18NextContext';
import ApplyCoupon from './ApplyCoupon';
import PlaceOrder from './PlaceOrder';

const CheckoutSidebar = ({ values, setFieldValue }) => {
  const { cartProducts } = useContext(CartContext);
  console.log(cartProducts)
  const [checkoutData, setCheckoutData] = useState({
    total: {
      shipping_total: 0,
      subtotal: 0,
      tax_total: 0,
      total: 0,
      wallet_balance: 0,
    },
  });
  const { convertCurrency } = useContext(SettingContext);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');

  useEffect(() => {
    let subtotal = 0;
    let shipping_total = 0;
  
    cartProducts.forEach(product => {
      subtotal += product.subtotal; // subtotal already includes tax
      if (!product.product.is_free_shipping && product.product.shipping_price) {
        shipping_total += product.product.shipping_price;
      }
    });
  
    const total = subtotal + shipping_total; 
  
    setCheckoutData({
      total: {
        shipping_total: shipping_total,
        subtotal: subtotal,
        tax_total: 0,
        total: total,
        wallet_balance: checkoutData.total.wallet_balance, 
      },
    });
  }, [cartProducts]);

  const createOrderParams = () => {
    return {
      shipping_address_id: values.shipping_address_id,
      billing_address_id: values.billing_address_id,
      total_amount: checkoutData.total.total,
      payment_method: values.payment_method,
      shipping_method: values.shipping_method,
      notes: values.notes,
      tracking_information: values.tracking_information,
      products: cartProducts.map(product => ({
        product_id: product.product.id,
        quantity: product.quantity,
        price: product.product.price,
        subtotal: product.subtotal,
        total: product.total
      }))
    };
  };

  return (
    <Col xxl="4" xl="5">
      <Card className="pos-detail-card">
        <SidebarProduct values={values} setFieldValue={setFieldValue} />
        <div className="pos-loader">
          <ul className={`summary-total position-relative`}>
            <li>
              <h4>{t('Subtotal')}</h4>
              <h4 className="price">
                {checkoutData?.total?.subtotal ? convertCurrency(checkoutData?.total?.subtotal) : t(`Notcalculatedyet`)}
              </h4>
            </li>
            <li>
              <h4>{t('Shipping')}</h4>
              <h4 className="price">
                {checkoutData?.total?.shipping_total >= 0
                  ? convertCurrency(checkoutData?.total?.shipping_total)
                  : t(`Notcalculatedyet`)}
              </h4>
            </li>
            <li className="list-total">
              <h4>{t('Total')}</h4>
              <h4 className="price">
                {checkoutData?.total?.total ? convertCurrency(checkoutData?.total?.total) : t(`Notcalculatedyet`)}
              </h4>
            </li>
          </ul>
        </div>
        <PlaceOrder values={values} createOrderParams={createOrderParams} />
      </Card>
    </Col>
  );
};

export default CheckoutSidebar;