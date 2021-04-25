import axios from 'axios';
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import useCountDown from '../../../hooks/useCountDown';
import styles from "./styles.module.scss";

const id = "6076efa0c5c35b2ed043983d";

function Deal(props) {
  const [dealProduct, setDealProduct] = useState();
  const countDown = useCountDown({ date: 7, hour: 0, minute: 5, second: 30 })

  useEffect(async () => {
    const dealProductData = await axios.post('/api/product', { id });
    setDealProduct(dealProductData.data);
  }, []);

  return (
    <div className={styles.Deal}>
      {
        dealProduct && <>
          <div className={styles.Deal_img}>
            <img src={dealProduct.image} alt="" />
            <div>
              ${dealProduct.price - dealProduct.price * dealProduct.type / 100}
              <span>${dealProduct.price}</span>
            </div>
          </div>
          <div className={styles.Deal_text}>
            <p>DEAL OF WEEK</p>
            <h1>{dealProduct.name}</h1>
            <div className={styles.Deal_countDown}>
              <div>
                <div>{countDown.date}</div>
                <div>Ngày</div>
              </div>
              <div>
                <div>{countDown.hour}</div>
                <div>Giờ</div>
              </div>
              <div>
                <div>{countDown.minute}</div>
                <div>Phút</div>
              </div>
              <div>
                <div>{countDown.second}</div>
                <div>Giây</div>
              </div>
            </div>
            <div className={styles.Deal_shopBtn}>
              <Link href={`/product/${dealProduct._id}`}>
                <a className="btn btn-dark">Mua ngay</a>
              </Link>
            </div>
          </div>
        </>
      }

    </div>
  );
}

export default Deal;