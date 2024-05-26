'use client';
import { useCustomSearchParams } from '@/Utils/Hooks/useCustomSearchParams';
import { useEffect, useState } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import CollectionLeftSidebar from './CollectionLeftSidebar';

const CollectionContain = () => {
  const [filter, setFilter] = useState({ category: [], price: [], attribute: [], rating: [], sortBy: '', field: '' });
  const [category, attribute, price, rating, sortBy, field, search] = useCustomSearchParams([
    'category',
    'attribute',
    'price',
    'rating',
    'sortBy',
    'field',
    'search',
  ]);
  useEffect(() => {
    setFilter((prev) => {
      return {
        ...prev,
        category: category ? category?.category?.split(',') : [],
        attribute: attribute ? attribute?.attribute?.split(',') : [],
        price: price ? price?.price?.split(',') : [],
        rating: rating ? rating?.rating?.split(',') : [],
        sortBy: sortBy ? sortBy?.sortBy : '',
        field: field ? field?.field : '',
        search: search ? search?.search : '',
      };
    });
  }, [category, attribute, price, rating, sortBy, field, search]);

  return (
    <>
      <Breadcrumb title={'Collection'} subNavigation={[{ name: 'Collection' }]} />
      <CollectionLeftSidebar filter={filter} setFilter={setFilter} />
    </>
  );
};

export default CollectionContain;
