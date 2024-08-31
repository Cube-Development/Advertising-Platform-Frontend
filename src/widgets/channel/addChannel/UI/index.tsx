import { FC, useState } from "react";
import { ChannelIdentification } from "./channelIdentification";
import { ChannelDescription } from "./channelDescription";
import { ChannelTop } from "./channelTop";
import { QueryParams } from "@shared/functions";
import { IChannelLink } from "@entities/channel";
import { platformTypes } from "@entities/platform";
import styles from "./styles.module.scss";
import { ChannelAccept } from "./channelAccept";
import { motion } from "framer-motion";
import { PAGE_ANIMATION } from "@shared/config";

interface AddChannelBlockProps {}

export const AddChannelBlock: FC<AddChannelBlockProps> = () => {
  const { channel_id, add_channel } = QueryParams();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [currentVariant, setCurrentVariant] = useState(
    PAGE_ANIMATION.animationRight,
  );

  const handleOnChangeStep = (newStep: number) => {
    if (newStep > currentStep) {
      setCurrentVariant(PAGE_ANIMATION.animationRight);
    } else {
      setCurrentVariant(PAGE_ANIMATION.animationLeft);
    }
    setCurrentStep(newStep);
  };

  const [currentPlatform, setCurrentPlatform] = useState<IChannelLink>(
    platformTypes[0],
  );
  const [inserCode, setInserCode] = useState<string>("");

  return (
    <div className="container sidebar" style={{ minHeight: "100vh" }}>
      <div className={styles.wrapper}>
        {/* <div className="container">
        <div className={styles.flag}></div>
      </div> */}
        <ChannelTop channel_id={channel_id!} query={add_channel!} />
        {currentStep === 1 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={currentVariant}
          >
            <ChannelIdentification
              currentPlatform={currentPlatform}
              setCurrentPlatform={setCurrentPlatform}
              onChangeStep={handleOnChangeStep}
              setInserCode={setInserCode}
              channel_id={channel_id!}
            />
          </motion.div>
        )}
        {currentStep === 2 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={currentVariant}
          >
            <ChannelDescription
              currentPlatform={currentPlatform}
              onChangeStep={handleOnChangeStep}
              inserCode={inserCode}
              channel_id={channel_id!}
            />
          </motion.div>
        )}
        {currentStep === 3 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={currentVariant}
          >
            <ChannelAccept onChangeStep={handleOnChangeStep} />
          </motion.div>
        )}
      </div>
    </div>
  );
};
