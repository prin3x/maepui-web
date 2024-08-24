'use client';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import { useContext, useState } from 'react';
import SlipUploader from '@/Components/ConfirmPayment/SlipUploader';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { ConfirmPaymentAPI } from '@/Utils/AxiosUtils/API';
import request from '@/Utils/AxiosUtils';
import I18NextContext from '@/Helper/I18NextContext';

const ConfirmPayment = ({ orderId }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [values, setValues] = useState({ paymentSlip: null });
  const [errors, setErrors] = useState({});
  const { i18Lang } = useContext(I18NextContext);
  const router = useRouter();

  const handleFileChange = (file) => {
    setSelectedFile(file);
    setValues((prevValues) => ({ ...prevValues, paymentSlip: file }));
  };

  const createOrderParams = () => {
    const formData = new FormData();
    formData.append('orderId', orderId);
    formData.append('paymentSlip', selectedFile);
    return formData;
  };

  const handleSendProof = async () => {
    if (!selectedFile) {
      toast.error('กรุณาเลือกรูปภาพก่อนส่ง');
      return;
    }
    const response = await request({
      url: `${ConfirmPaymentAPI}/${orderId}`,
      method: 'POST',
      data: createOrderParams(),
    });
    if (response.status === 201) {
      toast.success(`หลักฐานการชำระเงินส่งแล้ว`);
      router.push(`/${i18Lang}/account/order`);
    } else {
      toast.error(`ขออภัย ส่งหลักฐานการชำระเงินไม่สำเร็จ กรุณาลองใหม่อีกครั้ง`);
    }
  };

  return (
    <>
      <Breadcrumb title={'Confirm Payment'} />
      <WrapperComponent classes={{ sectionClass: 'user-dashboard-section section-b-space' }} customCol={true}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            textAlign: 'center',
          }}
        >
          <h1>Receive Payment</h1>
          <p>Scan the QR code below to make a payment.</p>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/QR_Code_Example.svg/736px-QR_Code_Example.svg.png?20111025115625"
            alt="QR Code"
            style={{ width: '256px', height: '256px', marginTop: '20px' }}
          />
          <SlipUploader
            name="paymentSlip"
            values={values}
            setFieldValue={(name, value) => handleFileChange(value)}
            errors={errors}
            // Add other necessary props here
          />
          <button
            onClick={handleSendProof}
            style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
          >
            Send Proof of Payment
          </button>
        </div>
      </WrapperComponent>
    </>
  );
};

export default ConfirmPayment;
