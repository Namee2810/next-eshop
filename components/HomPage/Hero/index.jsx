import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import PinterestIcon from '@material-ui/icons/Pinterest';
import TwitterIcon from '@material-ui/icons/Twitter';
import axios from 'axios';
import Link from "next/link";
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import styles from "./styles.module.scss";

const items = [
  {
    title: "Fall - Winter Collections 2030",
    des: "A specialist label creating luxury essentials. Ethically crafted with an unwavering\
    commitment to exceptional quality.",
    href: "#",
    background: "https://preview.colorlib.com/theme/malefashion/img/hero/hero-2.jpg"
  },
  {
    title: "Fall - Winter Collections 2030",
    des: "A specialist label creating luxury essentials. Ethically crafted with an unwavering\
    commitment to exceptional quality.",
    href: "#",
    background: "https://preview.colorlib.com/theme/malefashion/img/hero/hero-1.jpg"
  }
]

const settings = {
  infiniteLoop: true,
  emulateTouch: true,
  showIndicators: false,
  showStatus: false,
  showThumbs: false,
  showArrows: false
};

export default function Hero(props) {
  const [id, setID] = useState(0);

  return (
    <div className={styles.Hero}>
      {
        items && <Carousel {...settings}>
          {
            items.map((item, idx) => (
              <div className={styles.Hero_item} key={idx}
                style={{ backgroundImage: `url("${item.background}")` }}
              >
                <div className={styles.Hero_text}>
                  <p>COLLECTION</p>
                  <p>{item.title}</p>
                  <p>{item.des}</p>
                  <Link href={item.href}>
                    <a className="btn btn-dark btn-anim">Mua ngay <span>→</span></a>
                  </Link>
                </div>
              </div>
            ))
          }
        </Carousel>
      }
      <div className={styles.Hero_socials}>
        <Link href="#">
          <a><FacebookIcon /></a>
        </Link>
        <Link href="#">
          <a><InstagramIcon /></a>
        </Link>
        <Link href="#">
          <a><TwitterIcon /></a>
        </Link>
        <Link href="#">
          <a><PinterestIcon /></a>
        </Link>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  await axios.get("/api/hero").then(products => console.log(products))
  return {
    props: { hero }
  }
}