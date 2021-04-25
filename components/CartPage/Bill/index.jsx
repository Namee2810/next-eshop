import { message } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import Checkout from '../Checkout';
import styles from "./styles.module.scss";

const billInit = {
  subtotal: 0,
  discount: 0,
  discountCode: 0,
  total: 0
}

function Bill(props) {
  const { products } = props;
  const [bill, setBill] = useState(billInit);
  const [showCheckout, setShowCheckout] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    let billClone = { ...billInit };
    products.forEach(item => {
      billClone.subtotal += (item.price * item.quantity);
      if (item.type > 0) billClone.discount += item.price * item.quantity * item.type / 100;
    });
    billClone.total = billClone.subtotal - billClone.discount - billClone.discountCode * billClone.subtotal / 100
    setBill({ ...billClone })
  }, [products])

  const handleSubmitDiscount = (e) => {
    e.preventDefault();
    const code = e.target.code.value;
    if (code === "GIAM50") {
      setBill({ ...bill, discountCode: 50, total: bill.total - 50 / 100 * bill.subtotal });
      message.success("Bạn đã nhận được ưu đãi giảm 50% từ mã 'GIAM50'");
    }
    else {
      message.warn("Mã giảm giá không hợp lệ")
      setBill({ ...bill, discountCode: 0, total: bill.subtotal - bill.discount });
    }
  }

  const handleOk = () => {
    document.getElementById("form_checkout-submit").click();
  }

  return (
    <div className={styles.Bill}>
      <div className={styles.Bill_discount}>
        <div>MÃ GIẢM GIÁ</div>
        <form onSubmit={handleSubmitDiscount}>
          <input name="code" type="text" placeholder="Nhập mã giảm giá" />
          <button type="submit" className="btn btn-dark">APPLY</button>
        </form>
      </div>
      <div className={styles.Bill_bill}>
        <div className={classNames(styles.Bill_bill_header, styles.wave)}>
          ĐƠN HÀNG
        </div>
        <div className={styles.Bill_bill_body}>
          <div>
            <div>Đơn giá</div>
            <div>${bill.subtotal.toFixed(2)}</div>
          </div>
          <div>
            <div>Giảm giá</div>
            <div style={{ color: "#EA4335" }}>${bill.discount.toFixed(2)}</div>
          </div>
          <div>
            <div>Mã giảm giá {bill.discountCode > 0 && `(${bill.discountCode}%)`}</div>
            <div style={{ color: "#EA4335" }}>${(bill.subtotal * bill.discountCode / 100).toFixed(2)}</div>
          </div>
          <div>
            <div>Tổng</div>
            <div>${bill.total.toFixed(2)}</div>
          </div>
        </div>
        <div style={{ marginTop: "40px", textAlign: "center", fontSize: "16px", fontWeight: "bold" }}>
          <button onClick={() => setShowCheckout(true)}
            className="btn btn-dark">Đặt hàng</button>
        </div>
      </div>
      <Modal title="Đặt hàng" visible={showCheckout}
        onOk={handleOk}
        onCancel={() => setShowCheckout(false)}
        maskClosable={false} width={700}
        confirmLoading={confirmLoading}
        okText="Đặt hàng"
        cancelText="Đóng"
      >
        <Checkout products={products} bill={bill} setConfirmLoading={setConfirmLoading} />
      </Modal>
    </div >
  );
}

export default Bill;