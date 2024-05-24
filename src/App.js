import {ToastContainer} from "react-toastify";
import AuthContext from "./context/auth/authContext";
import {Suspense, useContext, useEffect} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Loading from "./components/Loading";
import Empleado from "./pages/Empleado";
import Solicitud from "./pages/Solicitud";

function App() {

  const { user, token, validateTokenIfExists } = useContext(AuthContext);

  useEffect(() => {
    validateTokenIfExists();
  }, [token]);


  return (
    <BrowserRouter>
      <Suspense fallback={<Loading/>}>
        <Routes>
          <Route path="*" element={<Navigate to="/" /> } />
          <Route path="/" element={<Home />}>
            <Route path="solicitudes" element={<Solicitud />} />
            <Route path="empleados" element={<Empleado />} />
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer
        position="top-center"
        theme="colored"
        autoClose="4000"
      />
    </BrowserRouter>
  );
}

export default App;
