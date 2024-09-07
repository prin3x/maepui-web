import { Col } from 'reactstrap';
import ProductDetails from '../Product4Image/ProductDetails';
import AddProductDetail from './AddProductDetail';
import ProductDetailAction from './ProductDetailAction';
import ProductInformation from './ProductInformation';

const MainProductContent = ({ productState, setProductState }) => {
  return (
    <>
      <Col xl={6}>
        <div className="right-box-contain p-sticky">
          <ProductDetails productState={productState} />
          <ProductDetailAction productState={productState} setProductState={setProductState} extraOption={false} />
          <AddProductDetail productState={productState} />
          <ProductInformation productState={productState} />
        </div>
      </Col>
    </>
  );
};

export default MainProductContent;
