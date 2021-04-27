import { Result } from "antd";
import Layout from "components/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';

function OrderComplete(props) {
  const router = useRouter();
  const [order, setOrder] = useState();

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("order"));
    if (local) {
      setOrder(local);
      localStorage.removeItem("order")
    }
    else router.push("/")
  }, [])

  return (
    <div>
      <Head>
        <title>eShop. | Đặt hàng thành công</title>
      </Head>
      <Layout>
        {order &&
          <Result style={{ minHeight: "65vh", display: "flex", justifyContent: "center", flexDirection: "column" }}
            status="success"
            title={`Cảm ơn quý khách ${order.name} đã ủng hộ cửa hàng !`}
            subTitle={`Mã đơn hàng: ${order.id}. Đơn sẽ giao tới quý khách trong 5-7 ngày tới ❤`}
          />}
      </Layout>
    </div>
  );
}

export default OrderComplete;