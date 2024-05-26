import { useContext } from 'react';
import { Col } from 'reactstrap';
import ProductDetails from '../Product4Image/ProductDetails';
import OfferTimer from './OfferTimer';
import ProductDetailAction from './ProductDetailAction';
import AddProductDetail from './AddProductDetail';
import ProductInformation from './ProductInformation';
import PaymentOtions from './PaymentOtions';
import ProductSocial from './ProductSocial';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import ProductBundle from './ProductBundle';
import ProductAttribute from './ProductAttribute/ProductAttribute';
import ProductDeliveryInformation from './ProductDeliveryInformation';

const MainProductContent = ({ productState, setProductState }) => {
  const { themeOption } = useContext(ThemeOptionContext);
  return (
    <>
      <Col xl={6}>
        <div className='right-box-contain p-sticky'>
          <ProductDetails productState={productState} />
          {productState?.product?.type == 'classified' && <ProductAttribute productState={productState} setProductState={setProductState} />}
          {productState?.product?.sale_starts_at && productState?.product?.sale_expired_at && <OfferTimer productState={productState} />}
          <ProductDetailAction productState={productState} setProductState={setProductState} extraOption={false} />
          <AddProductDetail productState={productState} />
          <ProductInformation productState={productState} />
          {productState?.product?.estimated_delivery_text || (productState?.product?.return_policy_text && productState?.product?.is_return) ? (
            <ProductDeliveryInformation productState={productState} />
          ) : null}
          {/* <PaymentOtions productState={productState} /> */}
        </div>
      </Col>
    </>
  );
};

export default MainProductContent;
