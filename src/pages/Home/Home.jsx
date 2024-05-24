import React, { useContext } from 'react';
import "./styles.css";
import Layout from "../../components/Layout";
import AuthContext from "../../context/auth/authContext";
import {Outlet} from "react-router-dom";

const Home = () => {

  /* CONTEXT */
  const { user } = useContext(AuthContext);

  return (
    <Layout>
      { user ? (
        <Outlet />
      ) : (
        <div className="home-container">
          <h1>Bienvenido/a &#129395;</h1>
          <p>A continuación vas a conocer mi desarrollo para la prueba técnica en KONECTA</p>
          <p>Inicia sesión o registrate para ingresar al aplicativo</p>
        </div>
      )}
    </Layout>
  );
};

export default Home;
