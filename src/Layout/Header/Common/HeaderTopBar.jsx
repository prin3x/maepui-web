import React, { useContext, useEffect, useRef } from 'react';
import { Col, Row } from 'reactstrap';
import TopbarLeft from './TopbarLeft';
import TopbarSlider from './TopbarSlider';
import TopLanguage from './TopLanguage';
import HeaderCurrency from './HeaderCurrency';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';

const HeaderTopBar = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const addClass = useRef(null);
  
  return (
    <div className={`header-top${themeOption?.header?.page_top_bar_dark ? ' bg-dark' : ''}`} ref={addClass}>
      <div className='container-fluid-lg'>
        <Row>
          <TopbarLeft />
          <TopbarSlider />
          <Col lg={3}>
            <ul className='about-list right-nav-about'>
              <li className='right-nav-list'>
                <TopLanguage />
              </li>
              <li className='right-nav-list'>
                <HeaderCurrency />
              </li>
            </ul>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default HeaderTopBar;
