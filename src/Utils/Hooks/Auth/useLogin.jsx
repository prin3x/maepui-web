import AccountContext from '@/Helper/AccountContext';
import I18NextContext from '@/Helper/I18NextContext';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import request from '../../AxiosUtils';
import { LoginAPI } from '../../AxiosUtils/API';
import { emailSchema, passwordSchema, YupObject } from '../../Validation/ValidationSchemas';
import { toast } from 'react-toastify';

export const LogInSchema = YupObject({
  email: emailSchema,
  password: passwordSchema,
});

const LoginHandle = async (responseData, router, i18Lang, refetch) => {
  if (responseData.status === 200 || responseData.status === 201) {
    Cookies.set('authToken', responseData.data?.accessToken, {
      path: '/',
      expires: new Date(Date.now() + 24 * 60 * 6000),
    });
    await refetch();
    router.push(`/${i18Lang}/`);
  }
};

const useHandleLogin = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { refetch } = useContext(AccountContext);
  const router = useRouter();
  return useMutation(
    (data) =>
      request({
        url: LoginAPI,
        method: 'post',
        data,
      }),
    {
      onSuccess: (responseData) => LoginHandle(responseData, router, i18Lang, refetch),
      onError: (error) => {
        toast.error('ลงชื่อเข้าใช้ไม่สำเร็จ');
      },
    },
  );
};

export default useHandleLogin;
