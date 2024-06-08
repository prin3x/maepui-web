import Link from 'next/link';
import { RiUserLine } from 'react-icons/ri';
import { optionListMinimal } from '../../../../Data/CustomData';
import { Fragment, useContext, useMemo } from 'react';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import CartContext from '@/Helper/CartContext';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import HeaderCartData from '../RightSideHeader/HeaderCartData';
import HeaderProfile from '../RightSideHeader/HeaderProfile';

const MinimalRightSidebar = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { cartProducts } = useContext(CartContext);
  const { themeOption, cartCanvas, setCartCanvas } = useContext(ThemeOptionContext);
  const cartStyle = useMemo(() => {
    return themeOption?.general?.cart_style ? themeOption?.general?.cart_style : 'cart_sidebar';
  });
  return (
    <div className="rightside-menu">
      <ul className="option-list-2">
        {optionListMinimal.map((elem) => (
          <Fragment key={elem.id}>
            <li
              className="onhover-dropdown"
              onClick={() => elem?.isBadge && cartStyle == 'cart_sidebar' && !cartCanvas && setCartCanvas(!cartCanvas)}
            >
              {elem?.path ? (
                <Link
                  href={`/${i18Lang}${elem?.path}`}
                  className={`header-icon ${elem?.customClass ? elem?.customClass : ''}`}
                >
                  {elem.icon}
                </Link>
              ) : (
                <a className={`header-icon ${elem?.customClass ? elem?.customClass : ''}`}>
                  {elem?.isBadge && cartProducts?.length > 0 && (
                    <small className="badge-number badge-light">{cartProducts?.length}</small>
                  )}
                  {elem.icon}
                </a>
              )}
              {elem.isBadge && <HeaderCartData cartStyle={'cart_sidebar'} />}
            </li>
          </Fragment>
        ))}
      </ul>

      <div className="user-box">
        <span className=''>
          <HeaderProfile />
        </span>
      </div>
    </div>
  );
};

export default MinimalRightSidebar;
