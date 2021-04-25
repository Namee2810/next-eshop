import { MailOutlined } from "@ant-design/icons";
import classNames from "classnames";
import Link from "next/link";
import React from 'react';
import styles from "./styles.module.scss";

const payment = "https://res.cloudinary.com/db2nhrkkl/image/upload/v1618484752/next-eshop/payment_zpmwcf.png";

function Footer(props) {
  return (
    <div className={styles.Footer}>
      <div className={styles.Footer_top}>
        <div>
          <Link href="/">
            <a className={classNames(styles.Footer_title, styles.Footer_logo)}>eShop.</a>
          </Link>
          <p>The customer is at the heart of our unique
            business model, which includes design.</p>
          <img src={payment} alt="" style={{ width: "218px" }} />
        </div>
        <div>
          <div className={styles.Footer_title}>Navigation</div>
          <Link href="/">
            <a>Trang chủ</a>
          </Link>
          <Link href="/products">
            <a>Sản phẩm</a>
          </Link>
          <Link href="/contact">
            <a>Liên hệ</a>
          </Link>
        </div>
        <div>
          <div className={styles.Footer_title}>News</div>
          <p>Be the first to know about new arrivals,
            look books, sales & promos!</p>
          <form action="">
            <input type="text" placeholder="Nhập email" />
            <button type="submit">
              <MailOutlined />
            </button>
          </form>
        </div>
      </div>
      <div className={styles.Footer_made}>
        Made by&nbsp;<a href="https://www.facebook.com/namee2810/">@Namee</a>
      </div>
    </div>
  );
}

export default Footer;