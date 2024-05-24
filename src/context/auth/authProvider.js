import {useReducer} from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {jwtDecode} from "jwt-decode";
import { URL_BACKEND_API } from "../../constants";
import axios from "axios";

const AuthProvider = (props) => {

  /* STATE INICIAL */
  const initialState = {
    token: typeof window !== 'undefined' ? localStorage.getItem("token") : "",
    user: null,
    loading: false,
    titleModal: "",
    textButton: "",
    sizeModal: "",
    openModalLogin: false,
    openModalsignUp: false,
  }

  /* USE REDUCER */
  const [state, dispatch] = useReducer(authReducer, initialState);

  /* FUNCTIONS */
  /* Retornar el usuario autenticado en base al JWT */
  const validateTokenIfExists = async () => {
    const token = localStorage.getItem("token");

    if (token){
      dispatch({
        type: 'EXIST_TOKEN',
        payload: await jwtDecode(token)
      });
    }
  }

  const openModalLogin = () => {
    dispatch({
      type: 'OPEN_MODAL_LOGIN'
    })
  }

  const openModalSignup = (titleModal, textButton) => {
    dispatch({
      type: 'OPEN_MODAL_SIGNUP',
      payload: {titleModal, textButton}
    })
  }

  const closeModal = () => {
    dispatch({
      type: 'CLOSE_MODAL'
    })
  }

  const login = async (data) => {
    const url = `${URL_BACKEND_API}/auth/login`;

    dispatch({
      type: 'LOADING_TRUE'
    })

    try {
      const response = await axios.post(url, data);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          token: response.data.token,
          user: await jwtDecode(response.data.token)
        }
      })

      closeModal();
    } catch (e) {
      return {error: e.response.data.message}
    } finally {
      dispatch({
        type: 'LOADING_FALSE'
      })
    }
  }

  const logout = () => {
    dispatch({
      type: 'LOGOUT'
    })
  }

  const signup = async (data) => {
    const url = `${URL_BACKEND_API}/auth/sign-up`;

    dispatch({
      type: 'LOADING_TRUE'
    })

    try {
      await axios.post(url, data);

      closeModal();
    } catch (e) {
      return {error: e.response.data.message}
    } finally {
      dispatch({
        type: 'LOADING_FALSE'
      })
    }
  }


  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        loading: state.loading,
        titleModal: state.titleModal,
        textButton: state.textButton,
        sizeModal: state.sizeModal,
        openLogin: state.openModalLogin,
        openSignup: state.openModalsignUp,
        validateTokenIfExists,
        openModalLogin,
        openModalSignup,
        closeModal,
        login,
        logout,
        signup
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );

}

export default AuthProvider;
