'use client';
import { useContext, useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import { useQuery } from '@tanstack/react-query';
import request from '@/Utils/AxiosUtils';
import { HomePageAPI } from '@/Utils/AxiosUtils/API';
import HomeBannerOsaka from './HomeBannerOsaka';
import BannerSection from './BannerSection';
import ProductSection2 from '../ParisTheme/ProductSections/ProductSection2';
import TopSelling from '../TokyoTheme/TopSelling';
import FeatureBlog from '../ParisTheme/FeatureBlog';
import CustomHeading from '../Common/CustomHeading';
import { osakaCategoryOption, osakaFeatureBlogOption } from '../../../Data/SliderSettingsData';
import MiddleContent from './MiddleContent';
import WrapperComponent from '../Common/WrapperComponent';
import { LeafSVG } from '../Common/CommonSVG';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import StickyCart from '@/Layout/StickyCart';
import ProductIdsContext from '@/Helper/ProductIdsContext';
import Loader from '@/Layout/Loader';

const OsakaTheme = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { setGetProductIds, isLoading: productLoader } = useContext(ProductIdsContext);
  const { isLoading, refetch, fetchStatus } = useQuery(['osaka'], () => request({ url: `${HomePageAPI}/osaka` }), {
    enabled: false,
    refetchOnWindowFocus: false,
    select: (res) => res?.data,
  });

  const data = {
    id: 3,
    content: {
      home_banner: {
        status: true,
        main_banner: {
          image_url: 'https://react.pixelstrap.net/fastkart/assets/themes/osaka/1.jpg',
          redirect_link: {
            link: 'vegetables-fruits',
            link_type: 'collection',
          },
        },
        sub_banner_1: {
          image_url: 'https://react.pixelstrap.net/fastkart/assets/themes/osaka/2.jpg',
          redirect_link: {
            link: 'vegetables-fruits',
            link_type: 'collection',
            product_ids: 'collection',
          },
        },
      },
      categories_icon_list: {
        title: 'Browse By Categories',
        description: 'Top Categories Of The Week',
        image_url: 'https://react.pixelstrap.net/fastkart/assets/themes/osaka/3.png',
        category_ids: [1, 2, 3, 4, 5, 6, 7, 8, 10],
        status: true,
      },
      coupons: {
        image_url: 'https://react.pixelstrap.net/fastkart/assets/themes/osaka/4.jpg',
        redirect_link: {
          link: 'vegetables-fruits',
          link_type: 'collection',
        },
        status: true,
      },
      products_list_1: {
        title: 'Fruits and Vegetables',
        description: 'Farm-Fresh Goodness: A Variety of Fruits and Vegetables Awaits',
        status: true,
        product_ids: [19, 15, 8, 5, 6, 7],
      },
      offer_banner: {
        image_url: 'https://react.pixelstrap.net/fastkart/assets/themes/osaka/5.jpg',
        redirect_link: {
          link: 'vegetables-fruits',
          link_type: 'collection',
        },
        status: true,
      },
      products_list_2: {
        title: 'Breakfast and Dairy',
        description: 'Morning Delights: Breakfast and Dairy Choices to Start Your Day',
        status: true,
        product_ids: [45, 30, 21, 19, 8, 44, 41, 38, 36],
      },
      product_bundles: {
        status: true,
        bundles: [
          {
            title: 'Hot Deals on New Items',
            sub_title: 'Daily Essentials Eggs & Dairy',
            image_url: 'https://react.pixelstrap.net/fastkart/assets/themes/osaka/6.jpg',
            redirect_link: {
              link: 'http://localhost:4200/theme/osaka',
              link_type: 'external_url',
              product_ids: null,
            },
            status: true,
          },
          {
            title: 'Organic Meat Prepared',
            sub_title: 'Delivered to Your Home',
            image_url: 'https://react.pixelstrap.net/fastkart/assets/themes/osaka/6.jpg',
            redirect_link: {
              link: null,
              link_type: null,
              product_ids: null,
            },
            status: true,
          },
          {
            title: 'Buy More & Save More',
            sub_title: 'Fresh Vegetables & Fruits',
            image_url: 'https://react.pixelstrap.net/fastkart/assets/themes/osaka/6.jpg',
            redirect_link: {
              link: null,
              link_type: null,
              product_ids: null,
            },
            status: true,
          },
          {
            title: 'Fresh Fruits on Go',
            sub_title: 'Fresh Vegetables & Fruits',
            image_url: 'https://react.pixelstrap.net/fastkart/assets/themes/osaka/6.jpg',
            redirect_link: {
              link: null,
              link_type: null,
              product_ids: null,
            },
            status: true,
          },
        ],
      },
      slider_products: {
        status: true,
        product_slider_1: {
          title: 'Top Selling',
          status: true,
          product_ids: [36, 35, 34],
        },
        product_slider_2: {
          title: 'Trending Products',
          status: true,
          product_ids: [32, 33, 38],
        },
        product_slider_3: {
          title: 'Recently added',
          status: true,
          product_ids: [44, 43, 42],
        },
        product_slider_4: {
          title: 'Top Rated',
          status: true,
          product_ids: [30, 21, 45],
        },
      },
      featured_blogs: {
        title: 'Featured Blog',
        description: 'Uncover Intriguing Highlights in Our Featured Blog',
        status: true,
        blog_ids: [24, 23, 22, 21, 20, 19],
      },
      news_letter: {
        title: 'Join Our Newsletter And Get...',
        sub_title: '$20 discount for your first order',
        image_url: 'https://react.pixelstrap.net/fastkart/assets/newsletter.jpg',
        status: true,
      },
      products_ids: ['collection', 19, 15, 8, 5, 6, 7, 45, 30, 21, 44, 41, 38, 36, 35, 34, 32, 33, 43, 42],
    },
    slug: 'osaka',
  };
  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (!isLoading && fetchStatus == 'fetching') {
      document.body.classList.add('skeleton-body');
    } else {
      document.body.classList.remove('skeleton-body');
    }

    if (data?.content?.products_ids?.length > 0) {
      setGetProductIds({ ids: Array.from(new Set(data?.content?.products_ids))?.join(',') });
    }
  }, [fetchStatus == 'fetching', !isLoading]);
  if (isLoading) return <Loader />;
  return (
    <>
      <HomeBannerOsaka dataAPI={data?.content?.home_banner} />

      <WrapperComponent noRowCol={true}>
        <ProductSection2
          isHeadingVisible={true}
          dataAPI={data?.content?.categories_icon_list}
          svgUrl={<LeafSVG className="icon-width" />}
          classes={{ sliderOption: osakaCategoryOption, noCustomClass: true }}
        />
      </WrapperComponent>

      <BannerSection dataAPI={data?.content?.coupons} />

      <MiddleContent dataAPI={data?.content} />

      <TopSelling
        dataAPI={data?.content?.slider_products}
        classes={{ boxClass: 'category-menu', colClass: { sm: 6, xl: 4, xxl: 3 } }}
      />

      <WrapperComponent noRowCol={true}>
        <CustomHeading
          title={data?.content?.featured_blogs?.title}
          subTitle={data?.content?.featured_blogs?.description}
          svgUrl={<LeafSVG className="icon-width" />}
        />
        <Row>
          <Col xs={12}>
            <FeatureBlog
              dataAPI={data?.content?.featured_blogs}
              classes={{
                sliderClass: 'slider-5 ratio_87',
                sliderOption: osakaFeatureBlogOption,
                height: 238,
                width: 417,
              }}
            />
          </Col>
        </Row>
      </WrapperComponent>

      {/* {data?.content?.news_letter?.status && <NewsLetter dataAPI={data?.content?.news_letter} />} */}
      {themeOption?.general?.sticky_cart_enable && themeOption?.general?.cart_style !== 'cart_sidebar' && (
        <StickyCart />
      )}
    </>
  );
};

export default OsakaTheme;
