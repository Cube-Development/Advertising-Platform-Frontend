import { FC, useEffect, useState } from "react";
import { DidoxLogin } from "./didox-login/didox-login";
import { LoginModalStep } from "./model";
import { RegistrationType, RegistrationTypeSelect } from "./registration-type-select";
import { SelfEmployedLogin } from "./self-employed-login";

interface IModalContentProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const ModalContent: FC<IModalContentProps> = ({
  isOpen = false,
  onClose,
}) => {
  const [step, setStep] = useState<LoginModalStep>(
    LoginModalStep.RegistrationType,
  );

  useEffect(() => {
    if (!isOpen) {
      setStep(LoginModalStep.RegistrationType);
    }
  }, [isOpen]);

  const handleBack = () => setStep(LoginModalStep.RegistrationType);

  const handleRegistrationContinue = (type: RegistrationType) => {
    if (type === RegistrationType.Legal) {
      setStep(LoginModalStep.Didox);
    } else {
      setStep(LoginModalStep.SelfEmployed);
    }
  };

  switch (step) {
    case LoginModalStep.Didox:
      return <DidoxLogin onBack={handleBack} />;
    case LoginModalStep.SelfEmployed:
      return <SelfEmployedLogin onBack={handleBack} />;
    case LoginModalStep.RegistrationType:
    default:
      return (
        <RegistrationTypeSelect onContinue={handleRegistrationContinue} />
      );
  }
};
