import React, { useContext, useEffect, useMemo, useState } from 'react';
import Cookies from 'js-cookie';
import CartContext from '.';
import { ToastNotification } from '@/Utils/CustomFunctions/ToastNotification';
import { AddToCartAPI } from '@/Utils/AxiosUtils/API';
import request from '@/Utils/AxiosUtils';
import { useQuery } from '@tanstack/react-query';
import ThemeOptionContext from '../ThemeOptionsContext';

const CartProvider = (props) => {
  const isCookie = Cookies.get('authToken');
  const [cartProducts, setCartProducts] = useState([]);
  const [variationModal, setVariationModal] = useState('');
  const [cartTotal, setCartTotal] = useState(0);
  const { setCartCanvas } = useContext(ThemeOptionContext);

  // Getting data from Cart API
  const {
    data: CartAPIData,
    isLoading: getCartLoading,
    refetch,
  } = useQuery([AddToCartAPI], () => request({ url: AddToCartAPI }), {
    enabled: true,
    refetchOnWindowFocus: false,
    select: (res) => res?.data,
  });
  // Refetching Cart API
  useEffect(() => {
    if (isCookie) {
      refetch();
    }
  }, [isCookie]);

  // Setting CartAPI data to state and LocalStorage
  useEffect(() => {
    if (isCookie) {
      if (CartAPIData) {
        setCartProducts(CartAPIData?.cartItems);
        setCartTotal(CartAPIData?.total);
      }
    } else {
      const isCartAvaliable = JSON.parse(localStorage.getItem('cart'));
      if (isCartAvaliable?.cartItems?.length > 0) {
        setCartProducts(isCartAvaliable?.cartItems);
        setCartTotal(isCartAvaliable?.total);
      }
    }
  }, [getCartLoading]);

  const updateCartItem = (cartItem) => {
    return request({ url: AddToCartAPI, method: 'POST', data: cartItem });
  };

  // Adding data in localstorage when not Login
  useEffect(() => {
    storeInLocalStorage();
    updateCartItem(cartProducts)
  }, [cartProducts]);

  // Getting total
  const total = useMemo(() => {
    return cartProducts?.reduce((prev, curr) => {
      return prev + Number(curr.subtotal);
    }, 0);
  }, [getCartLoading, cartProducts]);

  // Total Function for child components
  const getTotal = (value) => {
    return value?.reduce((prev, curr) => {
      return prev + Number(curr.subtotal);
    }, 0);
  };

  // Remove and Delete cart data from API and State
  const removeCart = (id, cartId) => {
    const updatedCart = cartProducts?.filter((item) => item.product.id !== id);
    setCartProducts(updatedCart);
  };

  // Common Handler for Increment and Decerement
  const handleIncDec = (qty, productObj, isProductQty, setIsProductQty, isOpenFun, cloneVariation) => {
    const cartUid = null;
    const updatedQty = isProductQty ? isProductQty : 0 + qty;
    const cart = [...cartProducts];
    const index = cart.findIndex((item) => item.product.id === productObj?.id);
    // Add data when not presence in Cart variable
    if (index === -1) {
      const params = {
        id: productObj?.id,
        product: productObj,
        quantity: cloneVariation?.selectedVariation?.productQty
          ? cloneVariation?.selectedVariation?.productQty
          : updatedQty,
        subtotal: cloneVariation?.selectedVariation?.sale_price
          ? updatedQty * cloneVariation?.selectedVariation?.sale_price
          : updatedQty * productObj?.sale_price,
      };
      setCartProducts((prev) => {
        const newCart = [...prev, params];
        return newCart;
      });

      cart.push(params);
    } else {
      // Checking the Stock QTY of paricular product
      const productStockQty = cart[index]?.product?.quantity;
      if (productStockQty < cart[index]?.quantity + qty) {
        ToastNotification('error', `You can not add more items than available. In stock ${productStockQty} items.`);
        return false;
      }

      const newQuantity = cart[index].quantity + qty;
      if (newQuantity < 1) {
        // Remove the item from the cart if the new quantity is less than 1
        return removeCart(productObj?.id, cartUid ? cartUid : cart[index].id);
      } else {
        cart[index] = {
          ...cart[index],
          id: cartUid?.id ? cartUid?.id : cart[index].id ? cart[index].id : null,
          quantity: newQuantity,
          subtotal: newQuantity * cart[index]?.product?.price,
        };
        setCartProducts([...cart]);
      }
    }

    // Update the productQty state immediately after updating the cartProducts state
    if (isCookie) {
      setIsProductQty && setIsProductQty(updatedQty);
      isOpenFun && isOpenFun(true);
    } else {
      setIsProductQty && setIsProductQty(updatedQty);
      isOpenFun && isOpenFun(true);
    }
    setCartCanvas(true);
  };

  // Replace Cart
  const replaceCart = (updatedQty, productObj, cloneVariation) => {
    const cart = [...cartProducts];
    const index = cart.findIndex((item) => item.product_id === productObj?.id);
    cart[index].quantity = 0;

    const productQty = cart[index]?.variation ? cart[index]?.variation?.quantity : cart[index]?.product?.quantity;

    if (cart[index]?.variation) {
      cart[index].variation.selected_variation = cart[index]?.variation?.attribute_values
        ?.map((values) => values.value)
        .join('/');
    }

    // Checking the Stock QTY of paricular product
    if (productQty < cart[index]?.quantity + updatedQty) {
      ToastNotification('error', `You can not add more items than available. In stock ${productQty} items.`);
      return false;
    }

    const params = {
      id: null,
      product: productObj,
      product_id: productObj?.id,
      variation: cloneVariation?.selectedVariation ? cloneVariation?.selectedVariation : null,
      variation_id: cloneVariation?.selectedVariation?.id ? cloneVariation?.selectedVariation?.id : null,
      quantity: cloneVariation?.productQty ? cloneVariation?.productQty : updatedQty,
      subtotal: cloneVariation?.selectedVariation?.sale_price
        ? updatedQty * cloneVariation?.selectedVariation?.sale_price
        : updatedQty * productObj?.sale_price,
    };

    isCookie
      ? setCartProducts((prevCartProducts) =>
          prevCartProducts.map((elem) => {
            if (elem?.product_id === cloneVariation?.selectedVariation?.product_id) {
              return params;
            } else {
              return elem;
            }
          }),
        )
      : setCartProducts((prevCartProducts) =>
          prevCartProducts.map((elem) => {
            if (elem?.product_id === cloneVariation?.selectedVariation?.product_id) {
              return params;
            } else {
              return elem;
            }
          }),
        );
  };

  // Setting data to localstroage when UAT is not there
  const storeInLocalStorage = () => {
    setCartTotal(total);
    localStorage.setItem('cart', JSON.stringify({ items: cartProducts, total: total }));
  };

  return (
    <CartContext.Provider
      value={{
        ...props,
        cartProducts,
        setCartProducts,
        cartTotal,
        setCartTotal,
        removeCart,
        getTotal,
        handleIncDec,
        variationModal,
        setVariationModal,
        replaceCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
