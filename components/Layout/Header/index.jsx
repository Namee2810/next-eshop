import { HeartFilled, HeartOutlined, MenuOutlined, SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import ActiveLink from "components/ActiveLink";
import useOutsideClick from "hooks/useOutsideClick";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";

function Header(props) {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const cartValue = useSelector(state => state.cart.length);
  const favoriteValue = useSelector(state => state.favorites.length);
  const [showSearch, setShowSearch] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const searchRef = useRef();
  useOutsideClick(searchRef, () => {
    if (showSearch) setShowSearch(false);
  });
  const navRef = useRef();
  useOutsideClick(navRef, () => {
    if (showNav && window.innerWidth <= 768) {
      const nav = document.getElementsByClassName(styles.Header_nav)[0];
      nav.style.opacity = 0;
      nav.style.transform = "translateX(-100%)"
      setTimeout(() => {
        nav.style.opacity = 1;
        nav.style.transform = "translateX(0)"
        nav.style.display = "none";
        setShowNav(false);
      }, 500);
    }
  });

  const onSubmit = value => {
    router.push({
      pathname: '/search',
      query: { q: value.search },
    })
  }
  const handleClickSearch = () => {
    setShowSearch(!showSearch);
  }

  const handleCloseHeader = () => {
    const Header_top_element = document.getElementsByClassName(styles.Header_top);
    Header_top_element[0].style.height = 0;
    setTimeout(() => {
      Header_top_element[0].style.display = "none";
    }, 250);
  }

  const handleClickNav = () => {
    const nav = document.getElementsByClassName(styles.Header_nav)[0];
    if (showNav) {
      nav.style.opacity = 0;
      nav.style.transform = "translateX(-100%)"
      setTimeout(() => {
        nav.style.opacity = 1;
        nav.style.transform = "translateX(0)"
        nav.style.display = "none";
        setShowNav(false);
      }, 500);
    }
    else {
      nav.style.display = "flex";
      setShowNav(true);
    }
  }

  return (
    <div className={styles.Header}>
      <div className={styles.Header_top}>
        Miễn phí vận chuyển, 1 đổi 1 trong 30 ngày.&nbsp;
        <a href="">Tìm hiểu thêm</a>
        <div className={styles.Header_top_close} onClick={handleCloseHeader}>X</div>
      </div>
      <Row className={styles.Header_container} justify="center">
        <Col span={24}>
          <div className={styles.Header_logo}>
            <Link href="/">
              <a>eShop.</a>
            </Link>
          </div>
          <div className={styles.Header_nav} ref={navRef}>
            <ActiveLink href="/" activeClassName={styles["Header_nav-active"]}>
              <a>Trang chủ</a>
            </ActiveLink>
            <ActiveLink href="/products" activeClassName={styles["Header_nav-active"]}>
              <a>Sản phẩm</a>
            </ActiveLink>
            <ActiveLink href="/contact" activeClassName={styles["Header_nav-active"]}>
              <a>Liên hệ</a>
            </ActiveLink>
          </div>

          <div className={styles.Header_icons}>
            <div>
              <SearchOutlined onClick={handleClickSearch} />
              {showSearch &&
                <form className={styles.Header_search}
                  onSubmit={handleSubmit(onSubmit)}
                  ref={searchRef}
                >
                  <input type="text" placeholder="Bạn muốn tìm gì?"
                    {...register("search", { required: true })}
                  />
                  <button className={styles.Header_searchBtn} type="submit">Tìm</button>
                </form>}
            </div>
            <div>
              <ActiveLink href="/favorites">
                {favoriteValue > 0 ? <HeartFilled style={{ color: "#ea4335" }} />
                  : <HeartOutlined />}
              </ActiveLink>
              {favoriteValue > 0 &&
                <span className={styles.Header_bubble}>
                  {favoriteValue > 9 ? "9+" : favoriteValue}
                </span>}
            </div>
            <div>
              <ActiveLink href="/cart">
                <ShoppingCartOutlined />
              </ActiveLink>
              {cartValue > 0 &&
                <span className={styles.Header_bubble}>
                  {cartValue > 9 ? "9+" : cartValue}
                </span>}
            </div>
          </div>
          <div className={styles.Header_menu} onClick={handleClickNav}>
            <MenuOutlined />
          </div>
        </Col>
      </Row>
    </div >
  );
}

export default Header;