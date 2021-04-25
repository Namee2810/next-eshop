import { HeartFilled, HeartOutlined, SearchOutlined } from "@ant-design/icons";
import { Pagination, Rate } from "antd";
import classNames from "classnames";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import FlipMove from 'react-flip-move';
import { useDispatch, useSelector } from "react-redux";
import { CART_ADD, FAVORITES_ADD } from "store/reducer";
import styles from "./styles.module.scss";

export default function Products(props) {
  const { productsInit, isProductsPage, total,
    setPage, page, filter, setFilter } = props;
  const dispatch = useDispatch();

  const favorites = useSelector(state => state.favorites);
  const cart = useSelector(state => state.cart);

  const [disableFilter, setDisableFilter] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsInit);
  }, [productsInit]);

  const handleChangeFilter = (type) => {
    if (disableFilter) return;
    setFilter(type);
    setPage(1)
  }
  const handleClickFavorite = (id) => {
    dispatch(FAVORITES_ADD({ id }))
  }
  const handleClickAdd = (id) => {
    dispatch(CART_ADD({ id }))
  }
  const handleChangePage = (pageChange, pageSize) => {
    setPage(pageChange)
  }

  return (
    <div className={styles.Products}>
      { (isProductsPage && total) &&
        <>
          <div className={styles.Products_header}>
            <div
              className={classNames(
                styles.Products_filter,
                { [`${styles["Products_filter-active"]}`]: filter === 0 }
              )}
              onClick={() => handleChangeFilter(0)}
            >
              Bán chạy
          </div>
            <div
              className={classNames(
                styles.Products_filter,
                { [`${styles["Products_filter-active"]}`]: filter === -1 }
              )}
              onClick={() => handleChangeFilter(-1)}
            >
              Mới nhất
          </div>
            <div
              className={classNames(
                styles.Products_filter,
                { [`${styles["Products_filter-active"]}`]: filter === 1 }
              )}
              onClick={() => handleChangeFilter(1)}
            >
              Giảm nhiều
          </div>
          </div>
          <Pagination total={total} pageSize={12}
            current={page}
            simple
            onChange={handleChangePage}
            total={total}
          />
        </>
      }
      {products.length > 0 &&
        <FlipMove className={styles.Products_body}
          duration={500}
          onStartAll={() => setDisableFilter(true)}
          onFinishAll={() => setDisableFilter(false)}
        >
          {
            products.map((item) => (
              <div className={styles.Products_item}
                key={item._id}>
                <div className={styles.Products_image}
                  style={{ backgroundImage: `url("${item.image}")` }}
                />
                <div className={styles.Products_tag}>
                  {item.type === -1 &&
                    <span className={styles.Products_tag_new}>MỚI</span>}
                  {item.type > 0 &&
                    <span className={styles.Products_tag_sale}>-{item.type}%</span>}
                </div>
                <div className={styles.Products_text}>
                  <div className={styles.Products_text_add} onClick={() => handleClickAdd(item._id)}>{
                    cart.findIndex(i => i.id === item._id) === -1 ? "+ Add to cart" : "- Remove from cart"
                  }</div>
                  <div>{item.name}</div>
                  <div><Rate defaultValue={item.rate} disabled /></div>
                  <div>
                    {item.type > 0
                      ? <>
                        <span>${(item.price - item.price * item.type / 100).toFixed(2)}</span>
                        <span>{item.price}</span>
                      </>
                      : <span>${item.price}</span>
                    }
                  </div>
                </div>
                <div className={styles.Products_item_hover}>
                  <Link href={`/product/${item._id}`}>
                    <a>
                      <div><SearchOutlined /></div>
                    </a>
                  </Link>
                  <div onClick={() => handleClickFavorite(item._id)}>
                    {favorites.includes(item._id) ? <HeartFilled style={{ color: "#ea4335" }} /> : <HeartOutlined />}
                  </div>
                </div>
              </div>
            ))
          }
        </FlipMove>
      }
      {
        (isProductsPage && total) &&
        <Pagination total={total} pageSize={12}
          current={page}
          showSizeChanger={false}
          showQuickJumper={true}
          onChange={handleChangePage}
          total={total}
        />
      }
    </div>
  );
}
