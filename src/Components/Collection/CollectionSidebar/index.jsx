import I18NextContext from '@/Helper/I18NextContext';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { useTranslation } from '@/app/i18n/client';
import { useContext, useState } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import { AccordionHeader, AccordionItem, UncontrolledAccordion } from 'reactstrap';
import CollectionCategory from './CollectionCategory';
import CollectionFilter from './CollectionFilter';
import CollectionRating from './CollectionRating';

const CollectionSidebar = ({
  filter,
  setFilter,
  isOffcanvas,
  basicStoreCard,
  rightSideClass,
  sellerClass,
  isAttributes = true,
}) => {
  const { i18Lang } = useContext(I18NextContext);
  const { collectionMobile, setCollectionMobile } = useContext(ThemeOptionContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [open, setOpen] = useState('1');
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const defaultOpenList = Array.from({ length: 3 }, (_, index) => (index + 1).toString());
  return (
    <>
      {collectionMobile && <div className="bg-overlay show" onClick={() => setCollectionMobile(false)} />}
      <div className={`${sellerClass ? sellerClass : `col-custome-${isOffcanvas ? '12' : '3'}`} `}>
        <div className={`left-box ${rightSideClass ? rightSideClass : ''} ${collectionMobile ? 'show' : ''}`}>
          <div className="shop-left-sidebar">
            <div className="back-button" onClick={() => setCollectionMobile((prev) => !prev)}>
              <h3>
                <a className="text-title">
                  <RiCloseFill />
                  <span>{t('Back')}</span>
                </a>
              </h3>
            </div>
            {basicStoreCard && basicStoreCard}
            {!isOffcanvas && <CollectionFilter filter={filter} setFilter={setFilter} />}
            <UncontrolledAccordion
              className="custome-accordion"
              open={open}
              toggle={toggle}
              stayOpen
              defaultOpen={defaultOpenList}
            >
              <AccordionItem>
                <AccordionHeader targetId="1">
                  <span>{t('Categories')}</span>
                </AccordionHeader>
                <CollectionCategory filter={filter} setFilter={setFilter} />
              </AccordionItem>

              {/* Rating */}
              {/* <CollectionRating filter={filter} setFilter={setFilter} /> */}
            </UncontrolledAccordion>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionSidebar;
