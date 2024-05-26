import CompareContext from '@/Helper/CompareContext';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import Link from 'next/link';
import { useContext } from 'react';

const StickyCompare = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { compareState } = useContext(CompareContext);
  const { t } = useTranslation(i18Lang, 'common');
  if (compareState?.length == 0) {
    return null;
  } else
    return (
      <div className='compare-fix'>
        <Link href={`/${i18Lang}/compare`}>
          <h5>
            {t("compare")} <span>{`(${compareState?.length})`}</span>
          </h5>
        </Link>
      </div>
    );
};

export default StickyCompare;
