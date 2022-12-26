import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { reset } from '../redux/cartSlice';

import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';

import styles from '../styles/Cart.module.css';
import OrderDetail from '../components/OrderDetail';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  // This values are the props in the UI
  const amount = cart.total;
  const currency = 'USD';
  const style = { layout: 'vertical' };

  const dispatch = useDispatch();
  const router = useRouter();

  const createOrder = async (data) => {
    try {
      const res = await axios.post(
        process.env.BACKEND_URL + 'api/orders',
        data
      );
      res.status === 201 && router.push('/orders/' + res.data._id);
      dispatch(reset());
    } catch (error) {
      console.log(err);
    }
  };

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: 'resetOptions',
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className='spinner' />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Продукт</th>
              <th>Наіменування</th>
              <th>Додатково</th>
              <th>Ціна</th>
              <th>Кількість</th>
              <th>Усього</th>
            </tr>
          </tbody>
          <tbody>
            {cart.products.map((product) => (
              <tr className={styles.tr} key={product._id}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.img}
                      layout='fill'
                      objectFit='cover'
                      alt=''
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {product.extras.map((extra) => (
                      <span key={extra._id}>{extra.text}, </span>
                    ))}
                  </span>
                </td>
                <td>
                  <span className={styles.price}>{product.price} ГРН</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    {product.price * product.quantity} ГРН
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>УСЬОГО В КОШИКУ</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Усього:</b>{' '}
            {cart.total.toFixed(2)} ГРН
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Знижка:</b> 0.00 ГРН
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>До сплати:</b>{' '}
            {cart.total.toFixed(2)} ГРН
          </div>
          {open ? (
            <div className={styles.peymentMethods}>
              <button
                className={styles.payButton}
                onClick={() => setCash(true)}
              >
                ГОТІВКОЮ ПРИ ДОСТАВЦІ
              </button>
              <PayPalScriptProvider
                options={{
                  'client-id': 'test',
                  components: 'buttons',
                  currency: 'USD',
                  'disable-funding': 'card',
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button onClick={() => setOpen(true)} className={styles.button}>
              ЗАМОВИТИ
            </button>
          )}
        </div>
      </div>
      {cash && <OrderDetail total={cart.total} createOrder={createOrder} />}
    </div>
  );
};

export default Cart;
