import { useContext } from 'react';
import { Form, Formik } from 'formik';
import CustomModal from '@/Components/Common/CustomModal';
import AccountContext from '@/Helper/AccountContext';
import { YupObject, nameSchema } from '@/Utils/Validation/ValidationSchemas';
import EmailPasswordForm from './EmailPasswordForm';
import UpdatePasswordForm from './UpdatePasswordForm';
import { useMutation } from '@tanstack/react-query';
import request from '@/Utils/AxiosUtils';
import { toast } from 'react-toastify';
import { UpdatePasswordAPI, UpdateProfileAPI } from '@/Utils/AxiosUtils/API';

const EmailPasswordModal = ({ modal, setModal }) => {
  const { accountData, setAccountData } = useContext(AccountContext);

  const { mutate: updateProfile } = useMutation({
    mutationFn: (values) => request({ url: `${UpdateProfileAPI}`, method: 'PATCH', data: values }),
    onSuccess: () => {
      toast.success('Profile updated successfully');
      setModal('');
    },
  });

  const { mutate: updatePassword } = useMutation({
    mutationFn: (values) => request({ url: `${UpdatePasswordAPI}`, method: 'PATCH', data: values }),
    onSuccess: () => {
      toast.success('Password updated successfully');
      setModal('');
    },
  });
  return (
    <>
      <CustomModal
        modal={modal == 'email' || modal == 'password' ? true : false}
        setModal={setModal}
        classes={{
          modalClass: 'theme-modal',
          modalBodyClass: 'address-form',
          title: `${modal == 'email' ? 'Edit Profile' : 'ChangePassword'}`,
        }}
      >
        <Formik
          initialValues={{
            name: accountData?.name || '',
            email: accountData?.email,
            country_code: accountData?.country_code || '66',
            phone: accountData?.phone || '',
            current_password: '',
            password: '',
            password_confirmation: '',
          }}
          validationSchema={YupObject({
            name: nameSchema,
            country_code: nameSchema,
            phone: nameSchema,
            current_password: modal == 'password' && nameSchema,
            password: modal == 'password' && nameSchema,
            password_confirmation: modal == 'password' && nameSchema,
          })}
          onSubmit={(values) => {
            let passwordObj = {
              current_password: values['current_password'],
              password: values['password'],
              password_confirmation: values['password_confirmation'],
              _method: 'PATCH',
            };
            let emailObj = {
              name: values['name'],
              email: values['email'],
              country_code: values['country_code'],
              phone: values['phone'],
              _method: 'PATCH',
            };
            if (modal == 'password') {
              // Add Update password here
              updatePassword(passwordObj);
            } else {
              // Add Update password here
              updateProfile(emailObj);
            }
          }}
        >
          <Form>
            {modal == 'email' && <EmailPasswordForm setModal={setModal} />}
            {modal == 'password' && <UpdatePasswordForm setModal={setModal} />}
          </Form>
        </Formik>
      </CustomModal>
    </>
  );
};

export default EmailPasswordModal;
