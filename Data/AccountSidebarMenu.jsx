import { RiBankLine, RiCoinLine, RiFileTextLine, RiHomeLine, RiNotificationLine, RiWalletLine, RiMapPinLine } from 'react-icons/ri';

export const sidebarMenu = [
  {
    title: 'Dashboard',
    icon: <RiHomeLine />,
    id: 'dashboard',
    path: '/account/dashboard',
  },
  // {
  //   title: 'Notification',
  //   icon: <RiNotificationLine />,
  //   id: 'notification',
  //   path: '/account/notification',
  //   badge: <span className='notification-count'>1</span>,
  // },
  // {
  //   title: 'EarningPoints',
  //   icon: <RiCoinLine />,
  //   id: 'point',
  //   path: '/account/point',
  // },
  {
    title: 'MyOrders',
    icon: <RiFileTextLine />,
    id: 'order',
    path: '/account/order',
  },
  {
    title: 'SavedAddress',
    icon: <RiMapPinLine />,
    id: 'address',
    path: '/account/addresses',
  },
];
