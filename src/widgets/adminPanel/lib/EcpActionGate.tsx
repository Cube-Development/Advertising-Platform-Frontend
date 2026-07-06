import { LoginModal } from "@features/organization";
import { useAppSelector } from "@shared/hooks";
import { FC, MouseEvent, PropsWithChildren, useEffect, useState } from "react";

export const EcpActionGate: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthEcp } = useAppSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isAuthEcp) {
      setIsModalOpen(false);
    }
  }, [isAuthEcp]);

  const handleClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (isAuthEcp) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    setIsModalOpen(true);
  };

  return (
    <>
      <LoginModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        haveTrigger={false}
      />
      <div onClickCapture={handleClickCapture}>{children}</div>
    </>
  );
};
