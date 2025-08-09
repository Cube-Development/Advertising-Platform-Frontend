import { PAGE_ANIMATION } from "@shared/config";
import { useAppSelector } from "@shared/hooks";
import { NotLogin, OrganizationDataForm } from "@widgets/organization";
import { motion } from "framer-motion";
import { FC } from "react";

interface IAddOrganizationProps {
  step: number;
  variant: typeof PAGE_ANIMATION.animationLeft;
  onChangeStep: (newStep: number) => void;
}

export const AddOrganization: FC<IAddOrganizationProps> = ({
  step,
  variant,
  onChangeStep,
}) => {
  const { isAuthEcp } = useAppSelector((state) => state.user);

  return (
    <>
      {step === 4 && (
        <motion.div initial="hidden" animate="visible" variants={variant}>
          {!isAuthEcp ? (
            <NotLogin />
          ) : (
            <div className="container">
              <div className="frame">
                <OrganizationDataForm />
              </div>
            </div>
          )}
        </motion.div>
      )}
    </>
  );
};
