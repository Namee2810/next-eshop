import axios from "axios";
import Layout from "components/Layout";
import ProductDetail from "components/ProductDetail";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function ProductPage(props) {
  const router = useRouter();

  const { id } = router.query;
  const [product, setProduct] = useState();
  const [notFound, setNotFound] = useState(false);

  useEffect(async () => {
    if (id) {
      const productData = (await axios.post('/api/product', { id })).data;
      if (productData?.status === 204) setNotFound(true);
      else setProduct(productData)
    }
  }, [id])

  return (
    <Layout>
      <Head>
        <title>eShop. | {product ? product.name : "Sản phẩm"}</title>
      </Head>
      <h1 className="Page_title">Chi tiết sản phẩm</h1>
      {
        !notFound
          ? (
            product ? <ProductDetail product={product} />
              : <div className="Page_empty">
                <div>Đang tìm sản phẩm</div>
                <Link href="/products">
                  <a className="btn btn-dark">Tiếp tục mua hàng</a>
                </Link>
              </div>
          )
          : <div className="Page_empty">
            <div>Không tìm thấy sản phẩm</div>
            <Link href="/products">
              <a className="btn btn-dark">Tiếp tục mua hàng</a>
            </Link>
          </div>
      }</Layout>
  );
}

export default ProductPage;