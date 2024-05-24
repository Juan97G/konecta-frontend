export default (state, action) => {

  switch (action.type) {

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }

    case 'SET_EMPLEADOS':
      return {
        ...state,
        empleados: action.payload.data.rows,
        currentPage: action.payload.currentPage,
        totalPages: Math.ceil(action.payload.data.count / state.limit),
      }

    default:
      return state;
  }
}
