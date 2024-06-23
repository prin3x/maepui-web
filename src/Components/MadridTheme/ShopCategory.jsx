import React, { useContext, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Slider from 'react-slick';
import { Col, Row } from 'reactstrap';
import WrapperComponent from '../Common/WrapperComponent';
import CustomHeading from '../Common/CustomHeading';
import Btn from '@/Elements/Buttons/Btn';
import { madridCategorySlider } from '../../../Data/SliderSettingsData';
import { placeHolderImage } from '../../../Data/CommonPath';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import CategoryContext from '@/Helper/CategoryContext';
import { RiArrowRightSLine } from 'react-icons/ri';

const ShopCategory = ({ dataAPI }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { filterCategory } = useContext(CategoryContext);

  // Ensure that the filterCategory function is called correctly
  const categoryData = useMemo(() => {
    return filterCategory('PRODUCT');
  }, [filterCategory]);

  // Log the categoryData to check for duplicates
  console.log('Category Data:', categoryData);

  // Check if categoryData contains duplicates
  const uniqueCategoryData = Array.from(new Set(categoryData.map(item => item.id)))
    .map(id => {
      return categoryData.find(item => item.id === id);
    });

  // Log the uniqueCategoryData to check for duplicates
  console.log('Unique Category Data:', uniqueCategoryData);

  return (
    <WrapperComponent classes={{ sectionClass: 'category-section-3' }} noRowCol={true}>
      <CustomHeading title={dataAPI?.title} customClass={'title'} />
      <Row>
        <Col xs={12}>
          <div className='category-slider-1 arrow-slider'>
            <Slider {...madridCategorySlider}>
              {uniqueCategoryData?.map((elem) => (
                <div key={elem.id}>
                  <div className='category-box-list'>
                    <Link href={`/${i18Lang}/collections?category=${elem?.id}`} className='category-name'>
                      <h4>{elem?.name}</h4>
                      <h6>
                        {elem?.products_count} {t('items')}
                      </h6>
                    </Link>
                    <div className='category-box-view'>
                      <Link href={`/${i18Lang}/collections?category=${elem?.id}`}>
                        <Image src={elem?.thumbnail?.url || placeHolderImage} className='img-fluid' alt='Shop Category' height={133} width={133} />
                      </Link>
                      <Btn className='btn shop-button'>
                        <span>รายละเอียด</span>
                        <RiArrowRightSLine />
                      </Btn>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </Col>
      </Row>
    </WrapperComponent>
  );
};

export default ShopCategory;