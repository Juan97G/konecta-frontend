export default (state, action) => {

  switch (action.type) {

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }

    case 'SET_LOADING_MODAL':
      return {
        ...state,
        isLoadingModal: action.payload
      }

    case 'SET_SOLICITUDES':
      return {
        ...state,
        solicitudes: action.payload.data.rows,
        currentPage: action.payload.currentPage,
        totalPages: Math.ceil(action.payload.data.count / state.limit),
      }

    case 'OPEN_MODAL_CREATE':
      return {
        ...state,
        openModal: true,
        titleModal: "Crear Solicitud"
      }

    case 'CLOSE_MODAL':
      return {
        ...state,
        openModal: false
      }

    case 'DELETE_SOLICITUD':
      return {
        ...state,
        solicitudes: state.solicitudes.filter((sol) => sol.id !== action.payload)
      }

    default:
      return state;
  }
}
