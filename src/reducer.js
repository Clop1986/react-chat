export default (state, action) => {
  switch (action.type) {
    case 'IS_AUTH':
      return {
        ...state,
        isAuth: action.playload
      }
    default:
      return state;
  }
}