import Cookies from 'js-cookie';

export const AuthStateGenerator = () => {
  const genState = Math.floor(Math.random() * 10000000) + 1;
  Cookies.set('genState', genState.toString());
  const loginLink = `https://auth.cubinc.uz/realms/advertisement-blogger/protocol/openid-connect/auth?response_type=code&client_id=adv-blog-client&state=${genState}&scope=openid profile&redirect_uri=https://ad.cubinc.uz`;
  const registrationLink = `https://auth.cubinc.uz/realms/advertisement-blogger/protocol/openid-connect/registrations?response_type=code&client_id=adv-blog-client&state=${genState}&scope=openid profile&redirect_uri=https://ad.cubinc.uz`;

  return { genState, loginLink, registrationLink };
};