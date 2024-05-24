import React from 'react';
import "./styles.css";
import Header from "../Header";
import Footer from "../Footer";

const Layout = ({ children }) => {
  return (
    <section className="layout-container">
      <Header />

      <main>
        { children }
      </main>

      <Footer />
    </section>
  );
};

export default Layout;
