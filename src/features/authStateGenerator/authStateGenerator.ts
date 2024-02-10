import Cookies from 'js-cookie';

export const AuthStateGenerator = () => {
  const genState = Math.floor(Math.random() * 100000000);
  Cookies.set('genState', genState.toString());
  return genState;
};