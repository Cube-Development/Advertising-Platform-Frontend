import { FC } from "react";
import { DidoxLogin } from "./didox-login/didox-login";

interface IModalContentProps {
  // add your props here
}

export const ModalContent: FC<IModalContentProps> = ({}) => {
  return (
    <div>
      <DidoxLogin />
    </div>
  );
};
