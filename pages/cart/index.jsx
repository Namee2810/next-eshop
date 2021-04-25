import axios from "axios";
import Bill from "components/CartPage/Bill";
import Products from "components/CartPage/Products";
import Layout from "components/Layout";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";

function Cart(props) {
  const cart = useSelector(state => state.cart);
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (!cart || !cart.length) return setProducts([]);

    if (cart.length > products.length) {
      let requests = [], productsData = [];
      cart.forEach(item => requests.push(axios.post('/api/product', { id: item.id })))
      axios.all(requests).then(axios.spread((...res) => {
        res.forEach((r, idx) => productsData.push({
          ...r.data, quantity: cart[idx].quantity
        }))
        setProducts(productsData)
      })).catch(errors => {
        // react on errors.
      })
    }
  }, [cart])

  return (
    <Layout>
      <Head>
        <title>eShop. | Giỏ hàng</title>
      </Head>
      <h1 className="Page_title">Shopping cart</h1>
      {
        (cart.length && !products.length) &&
        <div className="Page_empty">
          <div>Đang tải sản phẩm</div>
          <Link href="/">
            <a className="btn btn-dark">Tiếp tục mua hàng</a>
          </Link>
        </div>
      }
      {
        products.length ?
          <div className={styles.Cart}>
            <Products products={products} setProducts={setProducts} />
            <Bill products={products} />
          </div>
          : <div className="Page_empty">
            <div>Giỏ hàng đang trống</div>
            <Link href="/products">
              <a className="btn btn-dark">Tiếp tục mua hàng</a>
            </Link>
          </div>
      }

    </Layout >
  );
}

export default Cart;