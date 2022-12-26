import Image from 'next/image';
import styles from '../../styles/Order.module.css';

import React from 'react';
import axios from 'axios';

const Order = ({ order }) => {
  const status = order.status;

  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.trTitle}>
                <th>Номер Замовлення</th>
                <th>Замовник</th>
                <th>Номер Телефону</th>
                <th>Адреса Доставки</th>
                <th>Усього</th>
              </tr>
            </tbody>
            <tbody>
              <tr className={styles.tr}>
                <td>
                  <span className={styles.id}>{order._id}</span>
                </td>
                <td>
                  <span className={styles.name}>{order.customer}</span>
                </td>
                <td>
                  <span className={styles.name}>{order.phone}</span>
                </td>
                <td>
                  <span className={styles.address}>{order.address}</span>
                </td>
                <td>
                  <span className={styles.total}>{order.total} ГРН</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <Image src='/img/paid.png' width={30} height={30} alt='' />
            <span>Замовлення прийнято</span>
            <div className={styles.checkedIcon}>
              <Image src='/img/checked.png' width={20} height={20} alt='' />
            </div>
          </div>
          <div className={statusClass(1)}>
            <Image src='/img/bake.png' width={30} height={30} alt='' />
            <span>Готується</span>
            <div className={styles.checkedIcon}>
              <Image src='/img/checked.png' width={20} height={20} alt='' />
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image src='/img/bike.png' width={30} height={30} alt='' />
            <span>В Дорозі</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src='/img/checked.png'
                width={20}
                height={20}
                alt=''
              />
            </div>
          </div>
          <div className={statusClass(3)}>
            <Image src='/img/delivered.png' width={30} height={30} alt='' />
            <span>Доставлено</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src='/img/checked.png'
                width={20}
                height={20}
                alt=''
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>В КОШИКУ</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Усього:</b> {order.total} ГРН
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Знижка:</b> 0.00 ГРН
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>До сплати:</b> {order.total}{' '}
            ГРН
          </div>
          <button disabled className={styles.button}>
            СПЛАЧЕНО
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`);

  return {
    props: { order: res.data },
  };
};
