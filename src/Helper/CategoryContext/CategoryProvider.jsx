import React, { useCallback, useEffect, useState } from 'react';
import { CategoryAPI } from '@/Utils/AxiosUtils/API';
import { useQuery } from '@tanstack/react-query';
import request from '@/Utils/AxiosUtils';
import CategoryContext from '.';

const CategoryProvider = (props) => {
  const [categoryAPIData, setCategoryAPIData] = useState({
    data: [],
    refetchCategory: '',
    params: {},
    categoryIsLoading: false,
  });
  const { data: categoryData, isLoading: categoryIsLoading } = useQuery(
    [CategoryAPI],
    () => request({ url: CategoryAPI, params: { ...categoryAPIData.params, type: 'PRODUCT' } }),
    {
      enabled: true,
      refetchOnWindowFocus: false,
      select: (data) => data.data,
    },
  );
  const filterCategory = useCallback(
    (value) => {
      return categoryData?.filter((elem) => elem.type === value) || [];
    },
    [categoryData],
  );

  // Setting Data on Category variables
  useEffect(() => {
    if (categoryData) {
      setCategoryAPIData((prev) => ({ ...prev, data: categoryData, categoryIsLoading: categoryIsLoading }));
    }
  }, [categoryData]);

  return (
    <CategoryContext.Provider
      value={{ ...props, categoryAPIData, setCategoryAPIData, filterCategory: filterCategory, categoryIsLoading }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
