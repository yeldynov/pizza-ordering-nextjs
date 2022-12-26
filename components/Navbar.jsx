import Image from 'next/image';
import styles from '../styles/Navbar.module.css';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <div className={`${styles.container}`}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <img src={'/img/telephone.png'} alt='' />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ЗАМОВИТИ!</div>
          <div className={styles.text}>093 403 31 39</div>
        </div>
      </div>

      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href='/'>
            <li className={styles.listItem}>Головна</li>
          </Link>
          <li className={styles.listItem}>Продукти</li>
          <li className={styles.listItem}>Меню</li>
          <Image src='/img/logo.png' alt='' width={130} height={91} />
          <li className={styles.listItem}>Акції</li>
          <li className={styles.listItem}>Блог</li>
          <li className={styles.listItem}>Контакти</li>
        </ul>
      </div>
      <Link href='/cart'>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src='/img/cart.png' alt='' width={30} height={30} />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
