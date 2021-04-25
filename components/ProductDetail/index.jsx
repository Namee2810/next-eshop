import { Col, Divider, Rate, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { CART_ADD } from "store/reducer";
import styles from "./styles.module.scss";

const sizeList = ["S", "L", "XL", "XXL"],
  colorList = ["black", "#DDDDDD", "orange", "blue", "brown"],
  detailPayment = "https://res.cloudinary.com/db2nhrkkl/image/upload/v1619149985/next-eshop/detail-payment_jchzks.png"

function ProductDetail(props) {
  const { product } = props;

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const [color, setColor] = useState(0);
  const [size, setSize] = useState(0);

  const handleClickAdd = (id) => {
    dispatch(CART_ADD({ id }))
  }

  return (
    <Row justify="center">
      <Col
        lg={{ span: 16 }}
        span={22}
        className={styles.ProductDetail}>
        <div>
          <div className={styles.ProductDetail_image} >
            <img src={product.image} alt="" />
            <div className={styles.ProductDetail_tag}>
              {product.type === -1 &&
                <span className={styles.ProductDetail_tag_new}>MỚI</span>}
              {product.type > 0 &&
                <span className={styles.ProductDetail_tag_sale}>-{product.type}%</span>}
            </div>
          </div>
          <div className={styles.ProductDetail_content}>
            <h2>{product.name}</h2>
            <Rate defaultValue={product.rate} />
            <div className={styles.ProductDetail_price}>
              {product.type > 0
                ? <>
                  ${(product.price - product.price * product.type / 100).toFixed(2)}
                  <span>{product.price}</span>
                </>
                : <>${product.price}</>
              }
            </div>
            <div className={styles.ProductDetail_size}>
              Size:
          {sizeList.map((item, idx) => (
              <span className={classNames(
                { [`${styles["ProductDetail_size-select"]}`]: size === idx }
              )} key={idx}
                onClick={() => setSize(idx)}
              >
                {item}
              </span>
            ))}
            </div>
            <div className={styles.ProductDetail_color}>
              Color:
          {colorList.map((item, idx) => (
              <div className={classNames(
                { [`${styles["ProductDetail_color-select"]}`]: color === idx }
              )} key={idx}
                onClick={() => setColor(idx)}
                style={{ background: item }}
              />
            ))}

            </div>
            <div className={classNames("btn btn-transparent", styles.ProductDetail_add)}
              onClick={() => handleClickAdd(product._id)}>
              {
                cart.findIndex(item => item.id === product._id) !== -1 ? "- Remove from cart"
                  : "+ Add to cart"
              }
            </div>
            <Divider>Thanh toán an toàn</Divider>
            <img src={detailPayment} alt="" />
          </div>
        </div>
        <div className={styles.ProductDetail_des}>
          <Divider>Mô tả sản phẩm</Divider>
          <Title level={3}>Products Infomation</Title>
          <p>A Pocket PC is a handheld computer, which features many of the same capabilities as a modern PC. These handy little devices allow individuals to retrieve and store e-mail messages, create a contact file, coordinate appointments, surf the internet, exchange text messages and more. Every product that is labeled as a Pocket PC must be accompanied with specific software to operate the unit and must feature a touchscreen and touchpad.<br /><br />
          As is the case with any new technology product, the cost of a Pocket PC was substantial during it’s early release. For approximately $700.00, consumers could purchase one of top-of-the-line Pocket PCs in 2003. These days, customers are finding that prices have become much more reasonable now that the newness is wearing off. For approximately $350.00, a new Pocket PC can now be purchased.</p>
          <Title level={3}>Material used</Title>
          <p>Polyester is deemed lower quality due to its none natural quality’s. Made from synthetic materials, not natural like wool. Polyester suits become creased easily and are known for not being breathable. Polyester suits tend to have a shine to them compared to wool and cotton suits, this can make the suit look cheap. The texture of velvet is luxurious and breathable. Velvet is a great choice for dinner party jacket and can be worn all year round.</p>
        </div>
      </Col>
    </Row>
  );
}

export default ProductDetail;