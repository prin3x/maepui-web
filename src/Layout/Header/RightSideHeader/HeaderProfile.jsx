import React, { useContext, useState } from 'react';
import Link from 'next/link';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { useRouter } from 'next/navigation';
import { RiLogoutBoxRLine, RiUserLine } from 'react-icons/ri';
import { LogoutAPI } from '@/Utils/AxiosUtils/API';
import useCreate from '@/Utils/Hooks/useCreate';
import ConfirmationModal from '@/Components/Common/ConfirmationModal';
import AccountContext from '@/Helper/AccountContext';

const HeaderProfile = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { accountData, handleLogout } = useContext(AccountContext);
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const { t } = useTranslation(i18Lang, 'common');
  const { mutate, isLoading } = useCreate(LogoutAPI, false, false, 'Logout Successfully', () => {
    router.push(`/${i18Lang}/auth/login`);
    setModal(false);
  });

  // if no accountData then return link to login page
  if (!accountData) {
    return <Link href={`/${i18Lang}/auth/login`}>{t('Login')}</Link>;
  }

  return (
    <li className="right-side onhover-dropdown">
      <div className="delivery-login-box">
        <div className="delivery-icon">
          <h3>{accountData?.name?.charAt(0)?.toString()?.toUpperCase()}</h3>
        </div>
        {/* <div className="delivery-detail">
          <h5>{t('MyAccount')}</h5>
        </div> */}
      </div>

      <div className="onhover-div onhover-div-login">
        <ul className="user-box-name">
          <li className="product-box-contain">
            <Link href={`/${i18Lang}/account/dashboard`}>
              <RiUserLine className="me-2" /> {t('MyAccount')}
            </Link>
          </li>
          <li className="product-box-contain" onClick={() => setModal(true)}>
            <a>
              <RiLogoutBoxRLine className="me-2" /> {t('Logout')}
            </a>
          </li>
          <ConfirmationModal modal={modal} setModal={setModal} confirmFunction={() => handleLogout(router, mutate)} isLoading={isLoading} />
        </ul>
      </div>
    </li>
  );
};

export default HeaderProfile;
