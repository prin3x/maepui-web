import Btn from '@/Elements/Buttons/Btn';
import { RiAddLine } from 'react-icons/ri';
import AddressData from './AddressData';
import { useContext, useEffect, useState } from 'react';
import AccountContext from '@/Helper/AccountContext';
import CustomModal from '@/Components/Common/CustomModal';
import AddAddressForm from '@/Components/Checkout/common/AddAddressForm';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import request from '@/Utils/AxiosUtils';
import { toast } from 'react-toastify';
import { AddressAPI, SelfAPI } from '@/Utils/AxiosUtils/API';

const AddressHeader = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [addressState, setAddressState] = useState([]);
  const [editAddress, setEditAddress] = useState();
  const [modal, setModal] = useState('');
  const { accountData } = useContext(AccountContext);
  const queryClient = useQueryClient();

  useEffect(() => {
    accountData?.addresses.length > 0 && setAddressState((prev) => [...accountData?.addresses]);
  }, [accountData]);

  const createMutate = useMutation({
    mutationFn: (values) => request({ url: `${AddressAPI}/${accountData?.id || 1}`, method: 'POST', data: values }),
    onSuccess: () => {
      toast.success('Create address success');
      setModal(false);
      setEditAddress(null);
      queryClient.invalidateQueries([SelfAPI]);
    },
  });

  const editMutate = useMutation({
    mutationFn: (values) => request({ url: `${AddressAPI}/address/${editAddress.id}`, method: 'PUT', data: values }),
    onSuccess: () => {
      toast.success('Edit address success');
      setModal(false);
      setEditAddress(null);
      queryClient.invalidateQueries([SelfAPI]);
    },
  });

  return (
    <>
      <div className="dashboard-address">
        <div className="title-header">
          <div className="d-flex align-items-center w-100 justify-content-between">
            <h5>{t('SavedAddress')}</h5>
            <Btn
              className="theme-bg-color text-white btn-sm fw-bold mt-lg-0 mt-3 ms-auto"
              onClick={() => setModal('add')}
              title={'Add Address'}
            >
              <RiAddLine />
            </Btn>
          </div>
        </div>
        <AddressData
          addressState={addressState}
          setAddressState={setAddressState}
          modal={modal}
          setModal={setModal}
          setEditAddress={setEditAddress}
        />
      </div>
      <div className="checkout-detail">
        <CustomModal
          modal={modal == 'add' || modal == 'edit' ? true : false}
          setModal={setModal}
          classes={{ modalClass: 'theme-modal view-modal address-modal modal-lg', modalHeaderClass: 'p-0' }}
        >
          <div className="right-sidebar-box">
            <AddAddressForm
              mutate={modal == 'add' ? createMutate : editMutate}
              setModal={setModal}
              setEditAddress={setEditAddress}
              editAddress={editAddress}
              modal={modal}
              setAddressState={setAddressState}
            />
          </div>
        </CustomModal>
      </div>
    </>
  );
};

export default AddressHeader;
