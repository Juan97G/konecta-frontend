import React, {useReducer} from 'react';
import solicitudReducer from "./solicitudReducer";
import {URL_BACKEND_API} from "../../constants";
import axios from "axios";
import SolicitudContext from "./solicitudContext";

const SolicitudProvider = (props) => {

  const initialState = {
    solicitudes: [],
    isLoading: false,
    limit: 8,
    currentPage: 1,
    totalPages: 0,
    titleModal: "",
    openModal: false,
    isLoadingModal: false
  }

  /* USE REDUCER */
  const [state, dispatch] = useReducer(solicitudReducer, initialState);

  /* FUNCTIONS */
  const getSolicitudes = async (currentPage, querySearch = "") => {
    const url = `${URL_BACKEND_API}/solicitud?page=${currentPage}&limit=${state.limit}&querySearch=${querySearch}`;

    dispatch({
      type: 'SET_LOADING',
      payload: true
    })

    try {
      const response = await axios.get(url);

      dispatch({
        type: 'SET_SOLICITUDES',
        payload: {...response, currentPage}
      })
    } catch (e) {
      return {error: e.response.data.message}
    } finally {
      dispatch({
        type: 'SET_LOADING',
        payload: false
      })
    }
  }

  const closeModal = () => {
    dispatch({
      type: 'CLOSE_MODAL',
    })
  }

  const createSolicitud = async (data) => {
    const url = `${URL_BACKEND_API}/solicitud/create`;

    dispatch({
      type: 'SET_LOADING_MODAL',
      payload: true
    })

    try {
      await axios.post(url, data);

      closeModal();

      await getSolicitudes(1, "");
    } catch (e) {
      return {error: e.response.data.message}
    } finally {
      dispatch({
        type: 'SET_LOADING_MODAL',
        payload: false
      })
    }
  }

  const deleteSolicitud = async (idSolicitud) => {
    const url = `${URL_BACKEND_API}/solicitud/${idSolicitud}`;

    dispatch({
      type: 'SET_LOADING',
      payload: true
    })

    try {
      const response = await axios.delete(url);

      dispatch({
        type: 'DELETE_SOLICITUD',
        payload: idSolicitud
      })

      return response;
    } catch (e) {
      return {error: e.response.data.message}
    } finally {
      dispatch({
        type: 'SET_LOADING',
        payload: false
      })
    }
  }

  const openModalCrearSolicitud = () => {
    dispatch({
      type: 'OPEN_MODAL_CREATE'
    })
  }

  return (
    <SolicitudContext.Provider value={{
      solicitudes: state.solicitudes,
      isLoading: state.isLoading,
      currentPage: state.currentPage,
      totalPages: state.totalPages,
      titleModal: state.titleModal,
      openModal: state.openModal,
      isLoadingModal: state.isLoadingModal,
      getSolicitudes,
      openModalCrearSolicitud,
      createSolicitud,
      deleteSolicitud
    }}>
      {props.children}
    </SolicitudContext.Provider>
  );
};

export default SolicitudProvider;
