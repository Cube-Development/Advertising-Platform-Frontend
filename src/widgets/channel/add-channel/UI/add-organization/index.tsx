import { ChannelReady, IAddChannelData } from "@entities/channel";
import { PAGE_ANIMATION } from "@shared/config";
import { useAppSelector } from "@shared/hooks";
import { ENUM_PATHS } from "@shared/routing";
import { MyButton } from "@shared/ui";
import { NotLogin } from "@widgets/organization";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useChannelAccept } from "../../model";

interface IAddOrganizationProps {
  step: number;
  variant: typeof PAGE_ANIMATION.animationLeft;
  onChangeStep: (newStep: number) => void;
  channel_id: string;
  isEdit: boolean;
  data: IAddChannelData;
}

export const AddOrganization: FC<IAddOrganizationProps> = ({
  step,
  variant,
  onChangeStep,
  channel_id,
  data,
  isEdit,
}) => {
  const { t } = useTranslation();
  const { isOfferSign } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { channelAccept } = useChannelAccept({ channel_id, isEdit });

  const handleOnClick = () => {
    channelAccept(data);
    navigate(ENUM_PATHS.MY_CHANNELS);
  };

  return (
    <>
      {step === 4 && (
        <motion.div initial="hidden" animate="visible" variants={variant}>
          {!isOfferSign ? (
            <NotLogin />
          ) : (
            <div className="container">
              <div className="flex flex-col gap-6">
                <ChannelReady />
                <div className="flex justify-center">
                  <div className="grid grid-cols-2 gap-2">
                    <MyButton
                      type="button"
                      buttons_type="button__white"
                      onClick={() => onChangeStep(step - 1)}
                      className="grid grid-cols-[max-content,1fr] "
                    >
                      <ArrowLeft className="text-[var(--Personal-colors-main)]" />
                      <p>{t("add_platform_btn.prev")}</p>
                    </MyButton>
                    <MyButton onClick={handleOnClick}>
                      <p>{t("add_platform_btn.send")}</p>
                    </MyButton>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </>
  );
};
