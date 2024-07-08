import Cookies from "js-cookie";

export const AuthStateGenerator = () => {
  const genState = Math.floor(Math.random() * 10000000) + 1;
  Cookies.set("genState", genState.toString());
  const loginLink = `${import.meta.env.VITE_AUTH_URL}/realms/${import.meta.env.VITE_REALM}/protocol/openid-connect/auth?response_type=code&client_id=${import.meta.env.VITE_REALM_ID}&state=${genState}&scope=openid profile&redirect_uri=${
    import.meta.env.VITE_REDIRECT_URL
  }`;
  const registrationLink = `${import.meta.env.VITE_AUTH_URL}/realms/${import.meta.env.VITE_REALM}/protocol/openid-connect/registrations?response_type=code&client_id=${import.meta.env.VITE_REALM_ID}&state=${genState}&scope=openid profile&redirect_uri=${
    import.meta.env.VITE_REDIRECT_URL
  }`;

  return { genState, loginLink, registrationLink };
};
