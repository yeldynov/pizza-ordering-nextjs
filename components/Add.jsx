import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import styles from '../styles/Add.module.css';

const Add = ({ setClose }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const handleCreate = async () => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'uploads');
    try {
      const uploadRes = await axios.post(
        'https://api.cloudinary.com/v1_1/degzvcois/image/upload',
        data
      );

      const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      };

      axios.post('http://localhost:3000/api/products', newProduct);
      setClose(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>
          ✖
        </span>
        <h1>Додати нову Піцу</h1>
        <div className={styles.item}>
          <label className={styles.label}>Оберіть зображення</label>
          <input type='file' onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Найменування</label>
          <input
            className={styles.input}
            type='text'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Опис</label>
          <textarea
            rows={4}
            type='text'
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Ціни</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type='number'
              placeholder='Мала'
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type='number'
              placeholder='Середня'
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type='number'
              placeholder='Велика'
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Додатково</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type='text'
              placeholder='Елемент'
              name='text'
              onChange={handleExtraInput}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type='number'
              placeholder='Ціна'
              name='price'
              onChange={handleExtraInput}
            />
            <button className={styles.extraButton} onClick={handleExtra}>
              Додати
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((option) => (
              <span key={option.text} className={styles.extraItem}>
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <button className={styles.addButton} onClick={handleCreate}>
          Додати Піцу
        </button>
      </div>
    </div>
  );
};

export default Add;
