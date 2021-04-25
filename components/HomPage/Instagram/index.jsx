import Link from "next/link";
import React from 'react';
import styles from "./styles.module.scss";

const images = [
  "https://res.cloudinary.com/db2nhrkkl/image/upload/v1618482199/next-eshop/instagram-1.jpg",
  "https://res.cloudinary.com/db2nhrkkl/image/upload/v1618482225/next-eshop/instagram-2.jpg",
  "https://res.cloudinary.com/db2nhrkkl/image/upload/v1618482272/next-eshop/instagram-3.jpg",
  "https://res.cloudinary.com/db2nhrkkl/image/upload/v1618482294/next-eshop/instagram-4.jpg"
]

function Instagram(props) {
  return (
    <div className={styles.Instagram}>
      <div className={styles.Instagram_images}>
        {
          images.map((item, idx) => (
            <div key={idx}
              style={{ backgroundImage: `url("${item}")` }} />
          ))
        }
      </div>
      <div className={styles.Instagram_text}>
        <Link href="#">
          <a className="btn-anim">Instagram</a>
        </Link>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <div className={styles.Instagram_text_tag}>#eShop</div>
      </div>
    </div>
  );
}

export default Instagram;