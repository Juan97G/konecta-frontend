import React, { useReducer } from 'react';
import EmpleadoContext from "./empleadoContext";
import empleadoReducer from "./empleadoReducer";
import { URL_BACKEND_API } from "../../constants";
import axios from "axios";

const EmpleadoProvider = (props) => {

  const initialState = {
    empleados: [],
    isLoading: false,
    limit: 8,
    currentPage: 1,
    totalPages: 0
  }

  /* USE REDUCER */
  const [state, dispatch] = useReducer(empleadoReducer, initialState);

  /* FUNCTIONS */
  const getEmpleados = async (currentPage, querySearch = "") => {
    const url = `${URL_BACKEND_API}/empleado?page=${currentPage}&limit=${state.limit}&querySearch=${querySearch}`;

    dispatch({
      type: 'SET_LOADING',
      payload: true
    })

    try {
      const response = await axios.get(url);

      dispatch({
        type: 'SET_EMPLEADOS',
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

  return (
    <EmpleadoContext.Provider value={{
      empleados: state.empleados,
      isLoading: state.isLoading,
      limit: state.limit,
      currentPage: state.currentPage,
      totalPages: state.totalPages,
      getEmpleados
    }}>
      {props.children}
    </EmpleadoContext.Provider>
  );
};

export default EmpleadoProvider;
