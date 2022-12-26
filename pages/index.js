import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';

import Featured from '../components/Featured';
import PizzaList from '../components/PizzaList';
import Add from '../components/Add';
import AddButton from '../components/AddButton';

import styles from '../styles/Home.module.css';

export default function Home({ pizzaList, admin }) {
  const [close, setClose] = useState(true);

  return (
    <>
      <Head>
        <title>Доставка Піци Полтава</title>
        <meta
          name='description'
          content='Замовляйте кращу піцу в Полтаві з доставкою! Багатий вибір, гарна ціна, чудовий смак! Працюємо цілодобово.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Featured />
      {admin && <AddButton setClose={setClose} />}
      <PizzaList pizzaList={pizzaList} />
      {!close && <Add setClose={setClose} />}
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || '';

  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get(process.env.BACKEND_URL + 'api/products');
  return {
    props: {
      pizzaList: res.data,
      admin,
    },
  };
};
