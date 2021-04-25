import axios from "axios";
import Layout from "components/Layout";
import Products from "components/Products";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from 'react';


export default function ProductsPage(props) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState(0);

  useEffect(async () => {
    let query = {};
    switch (filter) {
      case -1: {
        query = {
          type: -1
        }
        break
      }
      case 1: {
        query = {
          type: { $gt: 0 }
        }
        break
      }
      default: break
    }
    const productsData = await axios.post("/api/products", { page, perPage: 12, query });
    setProducts(productsData.data.products);
    setTotal(productsData.data.total);
  }, [page, filter])

  return (
    <Layout>
      <Head>
        <title>eShop. | Sản phẩm</title>
      </Head>
      <h1 className="Page_title">Products</h1>
      <Products productsInit={products}
        isProductsPage
        page={page} setPage={setPage}
        total={total}
        filter={filter} setFilter={setFilter}
      />
      { !products.length && <div className="Page_empty">
        <div>Đang tải sản phẩm</div>
        <Link href="/">
          <a className="btn btn-dark">Trang chủ</a>
        </Link>
      </div>}
    </Layout>
  );
}