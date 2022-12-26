import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';

import styles from '../../styles/Admin.module.css';

const Admin = ({ orders, pizzas }) => {
  const [pizzaList, setPizzaList] = useState(pizzas);
  const [orderList, setOrderList] = useState(orders);
  const status = ['Готується', 'В Дорозі', 'Доставлено'];

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        'http://localhost:3000/api/products/' + id
      );
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;
    try {
      const res = await axios.put('http://localhost:3000/api/orders/' + id, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Товари</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTable}>
              <th>Зображення</th>
              <th>ID</th>
              <th>Найменування</th>
              <th>Ціна</th>
              <th>Дія</th>
            </tr>
          </tbody>
          {pizzaList.map((pizza) => (
            <tbody key={pizza._id}>
              <tr className={styles.trTable}>
                <td>
                  <Image
                    src={pizza.img}
                    width={50}
                    height={50}
                    objectFit='cover'
                    alt=''
                  />
                </td>
                <td>{pizza._id.slice(0, 5)}...</td>
                <td>{pizza.title}</td>
                <td>{pizza.prices[0]} ГРН</td>
                <td>
                  <button className={styles.button}>Edit</button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(pizza._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Замовлення</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTable}>
              <th>ID</th>
              <th>Замовник</th>
              <th>Телефон</th>
              <th>Вартість замовлення</th>
              <th>Платіж</th>
              <th>Статус</th>
              <th>Дія</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTable}>
                <td>{order._id.slice(0, 5)}...</td>
                <td>{order.customer}</td>
                <td>{order.phone}</td>
                <td>{order.total} ГРН</td>
                <td>
                  {order.method === 0 ? (
                    <span>Готівка</span>
                  ) : (
                    <span>Карта</span>
                  )}
                </td>
                <td>{status[order.status]}</td>
                <td>
                  <button
                    className={styles.button}
                    onClick={() => handleStatus(order._id)}
                  >
                    Наступний Етап
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Admin;

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || '';

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }

  const productRes = await axios.get('http://localhost:3000/api/products');
  const orderRes = await axios.get('http://localhost:3000/api/orders');

  return {
    props: {
      pizzas: productRes.data,
      orders: orderRes.data,
    },
  };
};
