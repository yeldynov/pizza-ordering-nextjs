import styles from '../styles/PizzaList.module.css';
import PizzaCard from './PizzaCard';

const PizzaList = ({ pizzaList }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>НАЙСМАЧНІША ПІЦА В ПОЛТАВІ</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
        optio architecto tempore officiis animi nam. Porro aspernatur nam, iste
        consequuntur corporis eum expedita dolorem ipsam cumque esse vel
        exercitationem in.
      </p>
      <div className={styles.wrapper}>
        {pizzaList.map((pizza) => (
          <PizzaCard key={pizza._id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
};

export default PizzaList;
