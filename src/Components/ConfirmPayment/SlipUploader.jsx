import React, { useContext, useEffect, useState } from 'react';
import { Button, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { ErrorMessage } from 'formik';
import { useTranslation } from '@/app/i18n/client';
import { RiAddLine, RiCloseLine } from 'react-icons/ri';
import I18NextContext from '@/Helper/I18NextContext';

const SlipUploader = ({ values, setFieldValue, errors, loading, showImage, uploadType, bucket, ...props }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [modal, setModal] = useState(false);
  const storeImageObject = props.name.split('_id')[0];

  useEffect(() => {
    if (values && values[storeImageObject]) {
      setSelectedImage(values[storeImageObject]);
      setImageUrl(URL.createObjectURL(values[storeImageObject]));
    }
  }, [values, storeImageObject]);

  useEffect(() => {
    if (props?.uniquename) {
      setSelectedImage(props.uniquename);
      setImageUrl(URL.createObjectURL(props.uniquename));
      setFieldValue(props.name, props.uniquename.id);
    }
  }, [props?.uniquename, props.name, setFieldValue]);

  const removeImage = () => {
    if (props.name) {
      setFieldValue(props.name, null);
      setSelectedImage(null);
      setImageUrl(null);
      setFieldValue(storeImageObject, '');
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      // 10MB limit
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(file);
      setImageUrl(imageUrl);
      setFieldValue(props.name, file);
    } else {
      alert('File size exceeds 10MB limit');
    }
  };

  const toggleModal = () => setModal(!modal);

  return (
    <>
      <div className="image-upload-container">
        <Input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
        <Button onClick={() => document.getElementById('fileInput').click()} className="upload-button">
          <RiAddLine /> {t('Upload Image')}
        </Button>

        {imageUrl && (
          <div className="image-preview-container">
            <img src={imageUrl} className="img-fluid" width={100} height={100} alt="Selected Image" />
            <RiCloseLine className="remove-icon" onClick={removeImage} />
            <Button onClick={toggleModal} className="view-button">
              View Image
            </Button>
          </div>
        )}
      </div>
      <p className="help-text">{props?.helpertext}</p>
      {errors?.[props?.name] ? (
        <ErrorMessage
          name={props.name}
          render={(msg) => (
            <div className="">
              {t(storeImageObject.split(' ').join(''))} {t('IsRequired')}
            </div>
          )}
        />
      ) : null}

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>View Image</ModalHeader>
        <ModalBody>{imageUrl && <img src={imageUrl} className="img-fluid" alt="Selected Image" />}</ModalBody>
      </Modal>

      <style jsx>{`
        .image-upload-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 20px;
        }
        .upload-button {
          margin-bottom: 10px;
        }
        .image-preview-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .remove-icon {
          cursor: pointer;
          margin-top: 5px;
        }
        .view-button {
          margin-top: 10px;
        }
      `}</style>
    </>
  );
};

export default SlipUploader;
