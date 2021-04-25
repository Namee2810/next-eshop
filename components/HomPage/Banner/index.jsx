import { Col, Row } from 'antd';
import Link from "next/link";
import React from 'react';
import styles from "./styles.module.scss";

const images = [
  "https://preview.colorlib.com/theme/malefashion/img/banner/banner-1.jpg",
  "https://preview.colorlib.com/theme/malefashion/img/banner/banner-2.jpg",
  "https://preview.colorlib.com/theme/malefashion/img/banner/banner-3.jpg"
]

function Banner(props) {
  return (
    <div className={styles.Banner}>
      <Row>
        <Col xl={{ span: 8, offset: 15 }}
          lg={{ span: 8, offset: 15 }}
          md={{ span: 8, offset: 12 }}
        >
          <div className={styles.Banner_item}>
            <img src={images[0]} alt="" />
            <div className={styles.Banner_text}>
              <p>Clothing Collections 2030</p>
              <Link href="#">
                <a className="btn btn-transparent btn-anim">Mua ngay</a>
              </Link>
            </div>
          </div>
        </Col>
        <Col xxl={{ span: 6, offset: 2 }}
          xl={{ span: 6, offset: 1 }}
          md={{ span: 6, offset: 2 }}
        >
          <div className={styles.Banner_item}>
            <img src={images[1]} alt="" />
            <div className={styles.Banner_text}>
              <p>Accessories</p>
              <Link href="#">
                <a className="btn btn-transparent btn-anim">Mua ngay</a>
              </Link>
            </div>
          </div>
        </Col>
        <Col xxl={{ span: 6, offset: 4 }}
          xl={{ span: 6, offset: 7 }}
          lg={{ span: 5, offset: 7 }}
          md={{ span: 8, offset: 12 }}
        >
          <div className={styles.Banner_item}>
            <img src={images[2]} alt="" />
            <div className={styles.Banner_text}>
              <p>Shoes Spring 2030</p>
              <Link href="#">
                <a className="btn btn-transparent btn-anim">Mua ngay</a>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Banner;