import AccountContext from '@/Helper/AccountContext';
import request from '@/Utils/AxiosUtils';
import { AddressAPI, SelfAPI } from '@/Utils/AxiosUtils/API';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import CheckoutSidebar from './CheckoutSidebar';
import DeliveryAddress from './DeliveryAddress';
import DeliveryOptions from './DeliveryOptions';
import PaymentOptions from './PaymentOptions';
import { toast } from 'react-toastify';

const CheckoutForm = () => {
  const { accountData, refetch } = useContext(AccountContext);
  const [address, setAddress] = useState([]);
  const [modal, setModal] = useState('');
  const queryClient = useQueryClient();

  const mutateAddress = useMutation({
    mutationFn: (values) => request({ url: `${AddressAPI}/`, method: 'POST', data: values }),
    onSuccess: () => {
      console.log('Create address success');
      toast.success('Create address success');
      setModal('');
      queryClient.invalidateQueries([SelfAPI]);
    },
  });

  useEffect(() => {
    accountData?.addresses.length > 0 && setAddress((prev) => [...accountData?.addresses]);
  }, [accountData]);

  return (
    <Formik initialValues={{}}>
      {({ values, setFieldValue }) => (
        <Form>
          <div className="pb-4 checkout-section-2">
            <Row className="g-sm-4 g-3">
              <Col xxl="8" xl="7">
                <div className="left-sidebar-checkout">
                  <div className="checkout-detail-box">
                    <ul>
                      <DeliveryAddress
                        key="shipping"
                        type="shipping"
                        title={'Shipping'}
                        values={values}
                        updateId={values['consumer_id']}
                        setFieldValue={setFieldValue}
                        address={address}
                        modal={modal}
                        mutate={mutateAddress}
                        setModal={setModal}
                      />
                      <DeliveryAddress
                        key="billing"
                        type="billing"
                        title={'Billing'}
                        values={values}
                        updateId={values['consumer_id']}
                        setFieldValue={setFieldValue}
                        address={address}
                        modal={modal}
                        mutate={mutateAddress}
                        setModal={setModal}
                      />
                      {/* <DeliveryOptions values={values} setFieldValue={setFieldValue} /> */}
                      <PaymentOptions values={values} setFieldValue={setFieldValue} />
                    </ul>
                  </div>
                </div>
              </Col>
              <CheckoutSidebar values={values} setFieldValue={setFieldValue} />
            </Row>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CheckoutForm;
