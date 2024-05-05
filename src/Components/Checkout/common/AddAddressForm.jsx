import { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Formik } from 'formik';
import I18NextContext from '@/Helper/I18NextContext';
import request from '@/Utils/AxiosUtils';
import { AddressAPI } from '@/Utils/AxiosUtils/API';
import { YupObject, nameSchema, phoneSchema } from '@/Utils/Validation/ValidationSchemas';
import { useTranslation } from '@/app/i18n/client';
import SelectForm from './SelectForm';

const AddAddressForm = ({ mutate, type, editAddress, setEditAddress, modal, setModal }) => {
  useEffect(() => {
    modal !== 'edit' && setEditAddress && setEditAddress({});
  }, [modal]);

  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <Formik
      initialValues={{
        title: editAddress ? editAddress?.title : '',
        address: editAddress ? editAddress?.address : '',
        pincode: editAddress ? editAddress?.pincode : '',
        phone: editAddress ? editAddress?.phone : '',
      }}
      validationSchema={YupObject({
        title: nameSchema,
        address: nameSchema,
        pincode: nameSchema,
        phone: phoneSchema,
      })}
      onSubmit={(values) => {
        if (modal) {
          values['_method'] = 'POST';
        }
        values['pincode'] = values['pincode'].toString();
        mutate.mutate(values);
      }}
    >
      {({ values, setFieldValue, handleChange }) => {
        return (
        <SelectForm
          values={values}
          setFieldValue={setFieldValue}
          setModal={setModal}
          handleChange={handleChange}
        />
      )}}
    </Formik>
  );
};

export default AddAddressForm;
