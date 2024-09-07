import NoDataFound from '@/Components/Common/NoDataFound';
import Btn from '@/Elements/Buttons/Btn';
import I18NextContext from '@/Helper/I18NextContext';
import request from '@/Utils/AxiosUtils';
import { ReviewAPI } from '@/Utils/AxiosUtils/API';
import { useTranslation } from '@/app/i18n/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useContext, useState } from 'react';
import { RiStarFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { Col, Progress, Row } from 'reactstrap';
import ReviewModal from './AllModal/ReviewModal';

const CustomerReview = ({ productState }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [modal, setModal] = useState('');
  const isLogin = Cookies.get('authToken');
  const { data, isLoading, refetch } = useQuery(
    [ReviewAPI],
    () => request({ url: `${ReviewAPI}/product/${productState?.product?.id}` }),
    {
      enabled: isLogin ? (productState?.product?.id ? true : false) : false,
      refetchOnWindowFocus: false,
      select: (res) => res?.data,
    },
  );
  const { mutate: mutateReview } = useMutation({
    mutationFn: (values) =>
      request({ url: `${ReviewAPI}/product/${productState?.product?.id}`, method: 'POST', data: values }),
    onSuccess: () => {
      toast.success('รีวิวสำเร็จ');
      setModal(false);
      refetch();
    },
  });

  const calculateRating = (ratings) => {
    const totalRating = ratings?.reduce((acc, curr) => acc + curr?.rating, 0);
    const averageRating = totalRating / ratings?.length;
    return averageRating.toFixed(2);
  };

  return (
    <>
      <Col xl={5}>
        <div className="product-rating-box">
          <Row>
            {data?.length ? (
              <Col xl={12}>
                <div className="product-main-rating">
                  <h2>
                    {calculateRating(data) || 0}
                    <RiStarFill />
                  </h2>
                  <h5>
                    {calculateRating(data) || 0} {t('Ratings')}
                  </h5>
                </div>
              </Col>
            ) : (
              <NoDataFound
                data={{
                  customClass: 'no-data-added',
                  title: 'NoReviewYet',
                  description: 'NoReviewYetDescription',
                }}
              />
            )}
            <Col xl={12}>
              {data?.length ? (
                <ul className="product-rating-list">
                  {[...new Set(data.map((rate) => rate.rating))]
                    .sort((a, b) => b - a)
                    .map((rating, i) => (
                      <li key={i}>
                        <div className="rating-product">
                          <h5>
                            {rating}
                            <RiStarFill />
                          </h5>
                          <Progress multi>
                            <Progress
                              value={((data.filter((r) => r.rating === rating).length / data.length) * 100).toFixed(0)}
                            />
                          </Progress>
                          <h5 className="total">{data.filter((r) => r.rating === rating).length}</h5>
                        </div>
                      </li>
                    ))}
                </ul>
              ) : null}
              <div className="review-title-2">
                <h4 className="fw-bold">{t('Reviewthisproduct')}</h4>
                <p>{t('Letothercustomersknowwhatyouthink')}.</p>
                <Btn
                  className="btn"
                  onClick={() => setModal(productState?.product?.id)}
                  title={productState?.product?.user_review ? t('EditReview') : t('Writeareview')}
                />
              </div>
              {data?.length
                ? data?.map((review, i) => (
                    <div className="review-title-2" key={i}>
                      <h4 className="fw-bold">{review?.description}</h4>
                      <ul className={`rating`}>
                        {review?.rating &&
                          Array(review?.rating)
                            .fill()
                            .map((elem) => (
                              <li key={elem}>
                                <RiStarFill />
                              </li>
                            ))}
                      </ul>
                    </div>
                  ))
                : null}
            </Col>
          </Row>
        </div>
      </Col>
      <ReviewModal
        mutateReview={mutateReview}
        modal={modal}
        setModal={setModal}
        productState={productState}
        refetch={refetch}
      />
      {/* {(productState?.product?.can_review || productState?.product?.reviews_count) && <CustomerQA data={data} />} */}
    </>
  );
};

export default CustomerReview;
