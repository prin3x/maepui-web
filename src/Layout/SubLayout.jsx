import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import TabFocusChecker from '@/Utils/CustomFunctions/TabFocus';
import { useContext, useEffect } from 'react';
import CookiesComponent from './Cookies';
import MainFooter from './Footer';
import MainHeader from './Header';
import MobileMenu from './MobileMenu';
import RecentPurchase from './RecentPurchase';
import TapTop from './TapTop';

const SubLayout = ({ children }) => {
  const isTabActive = TabFocusChecker();
  const { themeOption } = useContext(ThemeOptionContext);
  useEffect(() => {
    let value = 'แม่ปุ๋ย'
    document.title = value;
  }, [isTabActive, themeOption]);
  return (
    <>
      <MainHeader />
      <MobileMenu />
      {children}
      <TapTop />
      <MainFooter />
      <CookiesComponent />
      <RecentPurchase />
      {/* <NewsLetterModal /> */}
      {/* <ExitModal /> */}
    </>
  );
};

export default SubLayout;
