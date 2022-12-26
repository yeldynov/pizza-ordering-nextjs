import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { Nunito } from '@next/font/google';

const nunito = Nunito();

const Layout = ({ children }) => {
  return (
    <div className={nunito.className}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
