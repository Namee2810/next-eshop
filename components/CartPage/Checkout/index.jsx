import { Col, Divider, Row } from 'antd';
import classNames from 'classnames';
import { useRouter } from "next/router";
import React from 'react';
import { useForm } from "react-hook-form";
import { generateKey } from '../../../modules/generateKey';
import styles from "./styles.module.scss";

function Checkout(props) {
  const { products, bill, setConfirmLoading } = props;
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    setConfirmLoading(true)
    setTimeout(() => {
      router.push({ pathname: "order_complete" });
      localStorage.setItem("order", JSON.stringify({
        id: generateKey(12, false),
        name: data.lastName
      }))
    }, 5000);
  }

  return (
    <div className={styles.Checkout}>
      <div className={styles.Checkout_order}>
        <Divider>Đơn hàng</Divider>
        {
          products.map(item => (
            <div key={item._id}>
              <div>{item.name} x{item.quantity}</div>
              <div>${item.type > 0 ? (item.price - item.price * item.type / 100).toFixed(2)
                : item.price}</div>
            </div>
          ))
        }
        <div style={{ marginTop: "10px" }}>
          <div>Mã giảm giá {bill.discountCode > 0 && `(${bill.discountCode}%)`}</div>
          <div>${bill.discountCode / 100 * bill.subtotal}</div>
        </div>
        <div style={{ borderTop: "1px dashed #7c7c7c" }}>
          <div>Tổng</div>
          <div>${bill.total.toFixed(2)}</div>
        </div>
      </div>
      <div>
        <Divider>Chi tiết đơn hàng</Divider>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row justify="space-between">
            <Col span={11} className={classNames(styles.Checkout_form_field,
              { [`${styles.Checkout_form_field_error}`]: errors.firstName })}>
              <label htmlFor="firstName">First Name</label>
              <input type="text" name="firstName" id="firstName"
                {...register("firstName", { required: true })} />
            </Col>
            <Col span={11} className={classNames(styles.Checkout_form_field,
              { [`${styles.Checkout_form_field_error}`]: errors.lastName })}>
              <label htmlFor="lastName">Last Name</label>
              <input type="text" name="lastName" id="lastName"
                {...register("lastName", { required: true })} />
            </Col>
          </Row>
          <Row>
            <Col span={24} className={classNames(styles.Checkout_form_field,
              { [`${styles.Checkout_form_field_error}`]: errors.country })}>
              <label htmlFor="country">Country</label>
              <input type="text" name="country" id="country"
                {...register("country", { required: true })} />
            </Col>
          </Row>
          <Row>
            <Col span={24} className={classNames(styles.Checkout_form_field,
              { [`${styles.Checkout_form_field_error}`]: errors.address })}>
              <label htmlFor="address">Address</label>
              <input type="text" name="address" id="address"
                {...register("address", { required: true })} />
            </Col>
          </Row>
          <Row>
            <Col span={24} className={classNames(styles.Checkout_form_field,
              { [`${styles.Checkout_form_field_error}`]: errors.zip })}>
              <label htmlFor="zip">PostCode / ZIP</label>
              <input type="text" name="zip" id="zip"
                {...register("zip", { required: true })} />
            </Col>
          </Row>
          <Row justify="space-between">
            <Col span={11} className={classNames(styles.Checkout_form_field,
              { [`${styles.Checkout_form_field_error}`]: errors.phone })}>
              <label htmlFor="phone">Phone</label>
              <input type="text" name="phone" id="phone"
                {...register("phone", { required: true })} />
            </Col>
            <Col span={11} className={classNames(styles.Checkout_form_field,
              { [`${styles.Checkout_form_field_error}`]: errors.email })}>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email"
                {...register("email", { required: true })} />
            </Col>
          </Row>
          <input type="submit" value="" id="form_checkout-submit" />
        </form>
      </div>
    </div >
  );
}

export default Checkout;