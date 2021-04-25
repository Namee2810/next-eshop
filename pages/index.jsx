import axios from "axios"
import Banner from "components/HomPage/Banner"
import Deal from "components/HomPage/Deal"
import Hero from "components/HomPage/Hero"
import Instagram from "components/HomPage/Instagram"
import Layout from "components/Layout"
import Products from "components/Products"
import Head from "next/head"
import { useEffect, useState } from "react"

export default function Home() {

  const [hero, setHero] = useState();
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    const productsData = await axios.post("/api/products", { page: 1, perPage: 8 });
    setProducts(productsData.data.products);
  }, [])

  return (
    <Layout>
      <Head>
        <title>eShop. | Trang chủ</title>
      </Head>
      <Hero hero={hero} />
      <Banner />
      <div style={{
        fontSize: "26px",
        fontWeight: "500",
        margin: "50px 0px 20px",
        textAlign: "center",
        letterSpacing: "4px"
      }}>SẢN PHẨM ĐANG BÁN CHẠY</div>
      <Products productsInit={products} />
      <Deal />
      <Instagram />
    </Layout>
  )
}