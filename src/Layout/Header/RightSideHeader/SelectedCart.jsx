import HandleQuantity from '@/Components/Cart/HandleQuantity';
import Avatar from '@/Components/Common/Avatar';
import Btn from '@/Elements/Buttons/Btn';
import CartContext from '@/Helper/CartContext';
import I18NextContext from '@/Helper/I18NextContext';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { placeHolderImage } from '../../../../Data/CommonPath';

const SelectedCart = ({ modal, setSelectedVariation, setModal }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { cartProducts, removeCart } = useContext(CartContext);
  const onEdit = (data) => {
    setSelectedVariation(() => data);
    setTimeout(() => {
      setModal(true);
    }, 0);
  };
  useEffect(() => {
    cartProducts?.filter((elem) => {
      if (elem?.variation) {
        elem.variation.selected_variation = elem?.variation?.attribute_values?.map((values) => values?.value).join('/');
      } else {
        elem;
      }
    });
  }, [modal]);
  return (
    <>
      <ul className="cart-list">
        {cartProducts.map((elem, i) => (
          <li className="product-box-contain" key={i}>
            <div className="drop-cart">
              <Link href={`/${i18Lang}/product/${elem?.product?.id}`} className="drop-image">
                <Avatar
                  data={elem?.product?.thumbnail?.url}
                  placeHolder={placeHolderImage}
                  name={elem?.product?.name}
                  height={72}
                  width={87}
                />
              </Link>

              <div className="drop-contain">
                <Link href={`/${i18Lang}/product/${elem?.product?.id}`}>
                  <h5>{elem?.variation?.name ?? elem?.product?.name}</h5>
                </Link>
                <ul>
                  <HandleQuantity
                    productObj={elem?.product}
                    elem={elem}
                    customIcon={<RiDeleteBinLine />}
                    cartProducts={cartProducts}
                  />
                </ul>
                <div>
                  <div className="header-button-group">
                    <Btn className="delete-button close_button" onClick={() => removeCart(elem?.product?.id, elem?.id)}>
                      <RiDeleteBinLine />
                    </Btn>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SelectedCart;
