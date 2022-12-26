import { useState } from 'react';
import styles from '../styles/OrderDetail.module.css';

const OrderDetail = ({ total, createOrder }) => {
  const [customer, setCustomer] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleClick = () => {
    createOrder({ customer, address, phone, total, method: 0 });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>
          Вартість замовлення після доставки - 120 грн.
        </h1>
        <div className={styles.item}>
          <label className={styles.label}>Як Вас звати?</label>
          <input
            type='text'
            placeholder='Джейсон Стетхем'
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Номер Телефону</label>
          <input
            type='text'
            placeholder='+38 097 403 31 39'
            className={styles.input}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Адреса Доставки</label>
          <textarea
            rows={5}
            type='text'
            placeholder='вул. Миру 255-а, кв. 56'
            className={styles.textarea}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button className={styles.button} onClick={handleClick}>
          Підтвердити Замовлення
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
