import SearchableSelectInput from '@/Components/Common/InputFields/SearchableSelectInput';
import SimpleInputField from '@/Components/Common/InputFields/SimpleInputField';
import { Form } from 'formik';
import { ModalFooter, Row } from 'reactstrap';
import { AllCountryCode } from '../../../../Data/AllCountryCode';
import Btn from '@/Elements/Buttons/Btn';
import { useContext } from 'react';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const SelectForm = ({ setModal }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <Form>
      <Row>
        <SimpleInputField
          nameList={[
            { name: 'title', placeholder: t('EnterTitle'), toplabel: 'Title', colprops: { xs: 12 } },
            {
              name: 'address',
              placeholder: t('EnterAddress'),
              toplabel: 'Address',
              colprops: { xs: 12 },
              require: 'true',
            },
          ]}
        />
        <SimpleInputField
          nameList={[
            {
              name: 'pincode',
              placeholder: t('EnterPincode'),
              toplabel: 'Pincode',
              colprops: { xxl: 6, lg: 12, sm: 6 },
              require: 'true',
            },
          ]}
        />
        <div className="country-input">
          <SimpleInputField
            nameList={[
              {
                name: 'phone',
                type: 'string',
                placeholder: t('EnterPhoneNumber'),
                require: 'true',
                toplabel: 'Phone',
                colprops: { xs: 12 },
              },
            ]}
          />
        </div>
        <ModalFooter className="ms-auto justify-content-end save-back-button">
          <Btn className="btn-md btn-theme-outline fw-bold" title="Cancel" onClick={() => setModal(false)} />
          <Btn className="btn-md fw-bold text-light theme-bg-color" type="submit" title="Submit" />
        </ModalFooter>
      </Row>
    </Form>
  );
};

export default SelectForm;
