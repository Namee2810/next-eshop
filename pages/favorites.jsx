import axios from "axios";
import Layout from "components/Layout";
import Products from "components/Products";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

function FavoritesPage(props) {
  const favorites = useSelector(state => state.favorites);
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (!favorites || !favorites.length) return setProducts([]);

    if (favorites.length > products.length) {
      let requests = [], productsData = [];
      favorites.forEach(id => requests.push(axios.post('/api/product', { id })))
      axios.all(requests).then(axios.spread((...res) => {
        res.forEach(r => productsData.push(r.data))
        setProducts(productsData)
      })).catch(errors => {
        // react on errors.
      })
    }
    else if (favorites.length < products.length) {
      let productsClone = products, removed = false;
      favorites.forEach((item, idx) => {
        if (item !== productsClone[idx]._id) {
          productsClone.splice(idx, 1);
          setProducts([...productsClone]);
          removed = true;
        }
      });
      if (!removed) {
        productsClone.splice(productsClone.length - 1, 1);
        setProducts([...productsClone]);
      }
    }
  }, [favorites])

  return (
    <Layout>
      <Head>
        <title>eShop. | Yêu thích</title>
      </Head>
      <h1 className="Page_title" style={{ marginBottom: "60px" }}>Danh sách yêu thích</h1>
      {
        (favorites.length && !products.length) &&
        <div className="Page_empty">
          <div>Đang tải sản phẩm</div>
          <Link href="/">
            <a className="btn btn-dark">Tiếp tục mua hàng</a>
          </Link>
        </div>
      }
      {products.length > 0 ? <Products productsInit={products} />
        : <div className="Page_empty">
          <div>Danh sách yêu thích đang trống</div>
          <Link href="/products">
            <a className="btn btn-dark">Tiếp tục mua hàng</a>
          </Link>
        </div>
      }
    </Layout>
  );
}

export default FavoritesPage;