export default (state, action) => {

  switch (action.type) {

    case 'LOGIN_SUCCESS':
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user
      }

    case 'LOGOUT':
      localStorage.removeItem("token");
      return {
        ...state,
        token: "",
        user: null
      }

    case 'EXIST_TOKEN':
      return {
        ...state,
        user: action.payload
      }

    case 'LOADING_TRUE':
      return {
        ...state,
        loading: true
      }

    case 'LOADING_FALSE':
      return {
        ...state,
        loading: false
      }

    case "OPEN_MODAL_LOGIN":
      return {
        ...state,
        titleModal: "Iniciar sesión",
        sizeModal: "mini",
        openModalLogin: true
      }

    case "OPEN_MODAL_SIGNUP":
      return {
        ...state,
        titleModal: action.payload.titleModal,
        textButton: action.payload.textButton,
        sizeModal: "tiny",
        openModalsignUp: true
      }

    case "CLOSE_MODAL":
      return {
        ...state,
        titleModal: "",
        sizeModal: "",
        openModalsignUp: false,
        openModalLogin: false
      }


    default:
      return state;
  }
}
