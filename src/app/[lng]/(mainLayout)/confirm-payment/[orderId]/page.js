import ConfirmPayment from '@/Components/ConfirmPayment';

const ConfirmPaymentPage = ({ params }) => {
  return <ConfirmPayment orderId={params.orderId} />;
};

export default ConfirmPaymentPage;
