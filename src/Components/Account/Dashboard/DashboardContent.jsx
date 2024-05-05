import AccountHeading from '@/Components/Common/AccountHeading';
import AccountContext from '@/Helper/AccountContext';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import Image from 'next/image';
import { useContext } from 'react';
import { Col, Row } from 'reactstrap';
import coinSvg from '../../../../public/assets/images/svg/coin.svg';
import orderSvg from '../../../../public/assets/images/svg/order.svg';
import wallerSvg from '../../../../public/assets/images/svg/wallet.svg';
import ProfileInformation from './ProfileInformation';

const DashboardContent = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { accountData } = useContext(AccountContext);
  return (
    <div className='dashboard-home'>
      <AccountHeading title="MyDashboard" /> 
      <div className='dashboard-user-name'>
        <h6 className='text-content'>
          {t('Hello')}, <b className='text-title'>{accountData?.name ?? t('User')}</b>
        </h6>
        <p className='text-content'>{t("DashboardDescription")}</p>
      </div>

      <div className='total-box'>
        <Row className='g-sm-4 g-3'>
          <Col xxl={4} lg={6} md={4} sm={6}>
            <div className='total-contain'>
              <Image src={orderSvg} className='img-1 ' alt='orderSvg' height={90} width={90} />
              <Image src={orderSvg} className='' alt='orderSvg' height={60} width={60} />
              <div className='total-detail'>
                <h5>{t("TotalOrders")}</h5>
                <h3>{0}</h3>
              </div>
            </div>
          </Col>
          <ProfileInformation />
        </Row>
      </div>
    </div>
  );
};

export default DashboardContent;
