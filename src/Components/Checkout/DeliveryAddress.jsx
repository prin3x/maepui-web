import React, { useContext, useEffect } from 'react';
import { Row } from 'reactstrap';
import { RiAddLine, RiMapPinLine } from 'react-icons/ri';
import { useTranslation } from '@/app/i18n/client';
import CheckoutCard from './common/CheckoutCard';
import CustomModal from '../Common/CustomModal';
import AddAddressForm from './common/AddAddressForm';
import I18NextContext from '@/Helper/I18NextContext';
import ShowAddress from './ShowAddress';
import { toast } from 'react-toastify';

const DeliveryAddress = ({
  type,
  title,
  address,
  modal,
  mutate,
  setModal,
  setFieldValue,
  setAddressFromLocalStorage,
}) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');

  const storeAddressInLocalStorage = (address) => {
    setAddressFromLocalStorage([address]);
    localStorage.setItem('address', JSON.stringify([address]));
    toast.success('สร้างที่อยู่สำเร็จ');
    setModal(false);
  };

  useEffect(() => {
    address?.length > 0 && setFieldValue(`${type}_address_id`, address[0].id);
  }, [address]);
  return (
    <>
      <CheckoutCard icon={<RiMapPinLine />}>
        <div className="checkout-title">
          <h4>
            {t(title)} {t('Address')}
          </h4>
          <a className="d-flex align-items-center fw-bold" onClick={() => setModal(type)}>
            <RiAddLine className="me-1"></RiAddLine>
            {t('AddNew')}
          </a>
        </div>
        <div className="checkout-detail">
          {
            <>
              {address?.length > 0 ? (
                <Row className="g-4">
                  {address?.map((item, i) => (
                    <ShowAddress item={item} key={i} type={type} index={i} />
                  ))}
                </Row>
              ) : (
                <div className="empty-box">
                  <h2>{t('NoaddressFound')}</h2>
                </div>
              )}
            </>
          }
          <CustomModal
            modal={modal == type ? true : false}
            setModal={setModal}
            classes={{ modalClass: 'theme-modal view-modal modal-lg', modalHeaderClass: 'p-0' }}
          >
            <div className="right-sidebar-box">
              <AddAddressForm
                mutate={mutate}
                setModal={setModal}
                type={type}
                storeAddressInLocalStorage={storeAddressInLocalStorage}
              />
            </div>
          </CustomModal>
        </div>
      </CheckoutCard>
    </>
  );
};

export default DeliveryAddress;
