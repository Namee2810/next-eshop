import { CloseOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from 'react';
import FlipMove from "react-flip-move";
import { useDispatch } from "react-redux";
import { CART_ADD, CART_SET_QUANTITY } from "store/reducer";
import styles from "./styles.module.scss";

function Products(props) {
  const { products, setProducts } = props;

  const dispatch = useDispatch();

  const handleChangeQuantity = (_id, quantity) => {
    let productsClone = products;
    const idx = productsClone.findIndex(i => i._id === _id)
    productsClone[idx].quantity += quantity;
    if (productsClone[idx].quantity < 1) productsClone[idx].quantity = 1;
    setProducts([...productsClone])

    dispatch(CART_SET_QUANTITY({ id: _id, quantity: productsClone[idx].quantity }))
  }
  const handleInputQuantity = (target, _id) => {
    if (+target.value < 1 || isNaN(+target.value)) target.value = 1;

    let productsClone = products;
    const idx = productsClone.findIndex(i => i._id === _id)
    productsClone[idx].quantity = +target.value;
    setProducts([...productsClone])

    dispatch(CART_SET_QUANTITY({ id: _id, quantity: productsClone[idx].quantity }))
  }
  const handleRemoveProduct = (id) => {
    dispatch(CART_ADD({ id }))
    let productsClone = products;
    const idx = productsClone.findIndex(i => i._id === id);
    productsClone.splice(idx, 1)
    setProducts([...productsClone])
  }


  return (
    <div className={styles.Products}>
      <table>
        <thead>
          <tr>
            <th>PRODUCT</th>
            <th>QUANTITY</th>
            <th>TOTAL</th>
            <th />
          </tr>
        </thead>
        <FlipMove typeName="tbody">
          {
            products.map((item) => (
              <tr key={item._id}>
                <td>
                  <Link href={`/product/${item._id}`}>
                    <a>
                      <img src={item.image} alt="" className={styles.Products_image} />
                    </a>
                  </Link>
                  <div className={styles.Products_info}>
                    <div>{item.name}</div>
                    <div>{item.type > 0
                      ? <>
                        ${(item.price - item.price * item.type / 100).toFixed(2)}
                        <span>{item.price}</span>
                      </>
                      : <>${item.price}</>
                    }
                    </div>
                  </div>
                </td>
                <td>
                  <LeftOutlined onClick={() => handleChangeQuantity(item._id, -1)} />
                  <input type="number" value={item.quantity}
                    onChange={(event) => handleInputQuantity(event.target, item._id)} />
                  <RightOutlined onClick={() => handleChangeQuantity(item._id, 1)} />
                </td>
                <td style={{ fontSize: "18px", fontWeight: "bold" }}>$
                  {item.type > 0
                    ? (item.quantity * (item.price - item.price * item.type / 100)).toFixed(2)
                    : (item.quantity * item.price).toFixed(2)}
                </td>
                <td><CloseOutlined style={{
                  background: "#F3F2EE", padding: "10px", borderRadius: "50%"
                }}
                  onClick={() => handleRemoveProduct(item._id)}
                /></td>
              </tr>
            ))
          }
        </FlipMove>
      </table>
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <Link href="/products">
          <a className="btn btn-transparent">
            Tiếp tục mua hàng</a>
        </Link>
      </div>
    </div>
  );
}

export default Products;