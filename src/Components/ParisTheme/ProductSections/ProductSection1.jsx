import { useMemo } from 'react';
import { Col, Row } from 'reactstrap';
import Slider from 'react-slick';
import CustomHeading from '@/Components/Common/CustomHeading';
import { productSliderOption } from '../../../../Data/SliderSettingsData';
import ProductBox1 from '@/Components/Common/ProductBox/ProductBox1/ProductBox1';

const ProductSection1 = ({
  dataAPI,
  ProductData,
  svgUrl,
  noCustomClass = false,
  customClass,
  classObj,
  customSliderOption,
  isHeadingVisible = true,
}) => {
  const filterProduct = useMemo(() => {
    return ProductData?.data?.filter((el) => (dataAPI?.product_ids ? dataAPI?.product_ids?.includes(el.id) : el));
    // return ProductData?.data?.data;
  }, [ProductData, dataAPI]);
  return (
    <>
      {isHeadingVisible ? (
        <CustomHeading
          title={dataAPI?.title}
          svgUrl={svgUrl}
          subTitle={dataAPI?.description}
          customClass={customClass ? customClass : noCustomClass ? '' : 'section-t-space title'}
        />
      ) : null}
      <div className={`${classObj?.productStyle} overflow-hidden`}>
        <div className="no-arrow">
          <Slider {...customSliderOption}>
            {filterProduct?.map((elem) => (
              <div key={elem?.id}>
                <Row className="m-0">
                  <Col xs={12} className="px-0">
                    <ProductBox1 imgUrl={elem?.thumbnail?.url} productDetail={{ ...elem }} classObj={classObj} />
                  </Col>
                </Row>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default ProductSection1;
