import Btn from '@/Elements/Buttons/Btn';
import I18NextContext from '@/Helper/I18NextContext';
import SettingContext from '@/Helper/SettingContext';
import Link from 'next/link';
import { useContext } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { placeHolderImage } from '../../../../../Data/CommonPath';
import Avatar from '../../Avatar';
import ProductBagde from './ProductBagde';

const ProductBox1 = ({ imgUrl, productDetail, isClose, addAction = true, classObj, setWishlistState }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { convertCurrency } = useContext(SettingContext);
  const handelDelete = (currObj) => {
    setWishlistState((prev) => prev.filter((elem) => elem.id !== currObj?.id));
  };
  return (
    <div className={`product-box ${classObj?.productBoxClass}`}>
      <ProductBagde productDetail={productDetail} />
      {isClose && (
        <div className="product-header-top" onClick={() => handelDelete(productDetail)}>
          <Btn className="wishlist-button close_button">
            <RiCloseLine />
          </Btn>
        </div>
      )}
      <div className="product-image">
        <Link href={`/${i18Lang}/product/${productDetail?.id}`}>
          <Avatar
            data={imgUrl}
            placeHolder={placeHolderImage}
            customeClass={'img-fluid'}
            name={productDetail.title}
            height={500}
            width={500}
          />
        </Link>
        {/* <ProductBoxAction productObj={productDetail} listClass="product-option" /> */}
      </div>
      <div className="product-detail">
        <Link href={`/${i18Lang}/product/${productDetail?.id}`}>
          <h6 className="name">{productDetail.name}</h6>
          <p dangerouslySetInnerHTML={{ __html: productDetail?.description }} />
        </Link>
        {productDetail?.unit && <h6 className="unit mt-1">{productDetail?.unit}</h6>}
        <h5 className="sold text-content">
          <span className="theme-color price">{convertCurrency(productDetail?.price)}</span>
          {/* <del>{convertCurrency(productDetail?.price)}</del> */}
        </h5>

        {/* <div className="product-rating mt-sm-2 mt-1">
          <ProductBox1Rating totalRating={productDetail?.rating_count || 0} />
          <h6 className="theme-color">
            {ModifyString(productDetail.stock_quantity > 0 ? 'in-stock' : 'out-of-stack', false, '_')}
          </h6>
        </div>
        {addAction && <ProductBox1Cart productObj={productDetail} />} */}
      </div>
    </div>
  );
};

export default ProductBox1;
