import React from 'react';
import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import './index.css';
import App from './App';
import AuthProvider from "./context/auth/authProvider";
import EmpleadoProvider from "./context/empleado/empleadoProvider";
import SolicitudProvider from "./context/solicitud/solicitudProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <EmpleadoProvider>
      <SolicitudProvider>
        <App/>
      </SolicitudProvider>
    </EmpleadoProvider>
  </AuthProvider>
);
