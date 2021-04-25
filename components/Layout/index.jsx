import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { CART_LOAD, FAVORITES_LOAD } from "store/reducer";
import Footer from './Footer';
import Header from './Header';
import styles from "./styles.module.scss";

function Layout(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) dispatch(CART_LOAD({ cart }));
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    if (favorites) dispatch(FAVORITES_LOAD({ favorites }));
  }, [])

  return (
    <div className={styles.Layout}>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}

export default Layout;