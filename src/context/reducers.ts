export default function reducer(state: any, action: any) {
  switch (action.type) {
    case 'ACCOUNT':
      return { ...state, account: action.payload };

    default:
      return state;
  }
}
