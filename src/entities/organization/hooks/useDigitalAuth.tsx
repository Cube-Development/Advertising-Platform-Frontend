import { useDigitalLoginByCertificate } from "./useDigitalLoginByCertificate";
import { useDigitalLoginByPassword } from "./useDigitalLoginByPassword";
import { useDigitalRegister } from "./useDigitalRegister";

export const useDigitalAuth = () => {
  const { registration, isLoading: isLoadingRegister } = useDigitalRegister();
  const { loginCertificate, isLoading: isLoadingCertificate } =
    useDigitalLoginByCertificate();
  const { loginPassword, isLoading: isLoadingPassword } =
    useDigitalLoginByPassword();
  return {
    registration,
    loginCertificate,
    loginPassword,
    isLoadingCertificate,
    isLoadingPassword,
    isLoadingRegister,
  };
};
