import React, { useContext } from 'react';
import "./styles.css";
import {Button, Dropdown, Header as HeaderUI, Icon, Image} from "semantic-ui-react";
import Menu from "./Menu";
import {Link, useNavigate} from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import Login from "../Login";
import SignUp from "../SignUp";

const Header = () => {

  /* CONTEXT */
  const { user, openModalLogin, openModalSignup, logout } = useContext(AuthContext);

  const trigger = (
    <Image src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" avatar size="mini" />
  )

  /* HOOKS */
  const navigate = useNavigate();

  /* FUNCTIONS */
  /*const cerrarSesion = () => {
    logout();
    navigate("/login");
  }*/

  return (
    <header className="header-container">
      <div className="header-wrapper">
        <Link to="/">
          <HeaderUI as='h2'>
            <Icon name='code'/>
            <HeaderUI.Content>Prueba Técnica - KONECTA</HeaderUI.Content>
          </HeaderUI>
        </Link>

        {user && (
          <>
            <Menu/>

            <Dropdown trigger={trigger}>
              <Dropdown.Menu>
                <Dropdown.Item disabled>
                  Hola, <b>{user?.nombre.split(" ")[0]}</b>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/empleados")}>
                  Empleados
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/solicitudes")}>
                  Solicitudes
                </Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item onClick={() => logout()}>
                  Cerrar sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        )}

        {!user && (
          <div className="buttons-auth-header">
            <Button size="small" onClick={() => openModalLogin()}>
              Iniciar sesión
            </Button>
            <Button size="small" onClick={() => openModalSignup('Registrarme', 'REGISTRARME')}>
              Registrarme
            </Button>
          </div>
        )}
      </div>
      <Login/>
      <SignUp />
    </header>
  );
};

export default Header;
