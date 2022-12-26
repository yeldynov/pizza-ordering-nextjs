import Image from 'next/image';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src='/img/bg.png' fill alt='' />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>ДОСТАВКА ДО ДВЕРІ.</h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>ШВИДКО І СМАЧНО</h1>
          <p className={styles.text}>
            м. Полтава <br />
            (093) 403-31-39
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>ЧАСИ РОБОТИ:</h1>
          <p className={styles.text}>
            ПОНЕДІЛОК - П&lsquo;ЯТНИЦЯ
            <br /> 9:00 - 22:00
          </p>
          <br />
          <p className={styles.text}>
            СУБОТА - НЕДІЛЯ
            <br /> 12:00 - 24:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
