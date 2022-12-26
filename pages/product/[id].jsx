import { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/Product.module.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartSlice';

const Product = ({ pizza }) => {
  const [price, setPrice] = useState(pizza.prices[0]);
  const [size, setSize] = useState(0);
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...pizza, extras, price, quantity }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} fill alt='' />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>{price} ГРН</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Оберіть розмір піци</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image alt='' src='/img/size.png' fill />
            <span className={styles.number}>Мала</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image alt='' src='/img/size.png' fill />
            <span className={styles.number}>Середня</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image alt='' src='/img/size.png' fill />
            <span className={styles.number}>Велика</span>
          </div>
        </div>
        <h3 className={styles.choose}>Оберіть додаткові інгрідієнти:</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map((option) => (
            <div key={option._id} className={styles.option}>
              <input
                type='checkbox'
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor={option.text}>{option.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type='number'
            defaultValue={1}
            className={styles.quantity}
          />
          <button className={styles.button} onClick={handleClick}>
            Додати в Кошик
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    process.env.BACKEND_URL + `api/products/${params.id}`
  );

  return {
    props: {
      pizza: res.data,
    },
  };
};
