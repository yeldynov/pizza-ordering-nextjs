import { useState } from 'react';
import styles from '../styles/Featured.module.css';
import Image from 'next/image';

const images = [
  '/img/featured.png',
  '/img/featured2.png',
  '/img/featured3.png',
];

const Featured = () => {
  const [index, setIndex] = useState(0);

  const handleArrow = (direction) => {
    if (direction === 'right') {
      setIndex(index !== 0 ? index - 1 : images.length - 1);
    }
    if (direction === 'left') {
      setIndex(index !== images.length - 1 ? index + 1 : 0);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.arrowContainer}
        style={{ left: 0 }}
        onClick={() => handleArrow('left')}
      >
        <Image
          src={'/img/arrowl.png'}
          alt=''
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div
        className={styles.wrapper}
        style={{ transform: `translate(${-100 * index}vw)` }}
      >
        {images.map((img, idx) => (
          <div className={styles.imgContainer} key={idx}>
            <Image src={img} alt='' fill style={{ objectFit: 'contain' }} />
          </div>
        ))}
      </div>
      <div
        className={styles.arrowContainer}
        style={{ right: 0 }}
        onClick={() => handleArrow('left')}
      >
        <Image
          src={'/img/arrowr.png'}
          alt=''
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  );
};

export default Featured;
