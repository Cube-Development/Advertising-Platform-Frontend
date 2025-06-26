import { BREAKPOINT, PAGE_ANIMATION } from "@shared/config";
import { useClearCookiesOnPage, useWindowWidth } from "@shared/hooks";
import { CustomTitle } from "@shared/ui";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { FC, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ENUM_NAVIGATION_CARD_ITEM_TYPE } from "./model";
import styles from "./styles.module.scss";
import {
  ChangeNotificationsForm,
  ChangePasswordForm,
  NavigationCard,
  UserDataForm,
} from "./UI";

export const SettingsProfile: FC = () => {
  useClearCookiesOnPage();
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState<ENUM_NAVIGATION_CARD_ITEM_TYPE>(
    ENUM_NAVIGATION_CARD_ITEM_TYPE.USER_DATA,
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleChangeTab = (tab: ENUM_NAVIGATION_CARD_ITEM_TYPE) => {
    setCurrentTab(tab);
    setIsOpen(true);
  };

  const screen = useWindowWidth();

  const [isDraggable, setIsDraggable] = useState(false); // Состояние для активации drag
  const ref = useRef<HTMLDivElement | null>(null); // Ref для чата

  const handleTouchStart = (event: React.TouchEvent) => {
    // Получаем координату начала касания
    const touchX = event.touches[0].clientX;

    // Проверяем, находится ли касание в пределах 0-100px от левого края чата
    if (ref.current) {
      const chatLeft = ref.current.getBoundingClientRect().left; // Левый край чата
      const touchOffset = touchX - chatLeft;

      if (touchOffset >= 0 && touchOffset <= 80) {
        setIsDraggable(true); // Активируем drag
      } else {
        setIsDraggable(false); // Отключаем drag
      }
    }
  };
  return (
    <div className="container">
      <div className={styles.wrapper}>
        <CustomTitle
          title={t("profile.title")}
          variant="primary"
          className={isOpen ? "opacity-0 md:opacity-100" : ""}
        />
        <div className={styles.content}>
          <div>
            <NavigationCard currentTab={currentTab} onClick={handleChangeTab} />
          </div>
          {screen > BREAKPOINT.MD ? (
            <>
              {currentTab === ENUM_NAVIGATION_CARD_ITEM_TYPE.USER_DATA ? (
                <UserDataForm />
              ) : currentTab ===
                ENUM_NAVIGATION_CARD_ITEM_TYPE.CHANGE_PASSWORD ? (
                <ChangePasswordForm />
              ) : (
                <ChangeNotificationsForm />
              )}
            </>
          ) : (
            <>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    ref={ref}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={PAGE_ANIMATION.sideTransition.transition}
                    variants={PAGE_ANIMATION.sideTransition}
                    className={styles.form}
                    drag={isDraggable ? "x" : false} // Включаем drag только если isDraggable === true
                    dragConstraints={{ left: 0, right: 0 }}
                    onTouchStart={(event) => handleTouchStart(event)} // Отслеживаем начало касания
                    onDragEnd={(event, info) => {
                      if (info.offset.x > 100) setIsOpen(false); // Закрыть чат, если свайп вправо больше 100px
                    }}
                  >
                    <button
                      className={styles.back}
                      onClick={() => setIsOpen(false)}
                    >
                      <ArrowLeft className={styles.icon} size={18} />
                      <p>{t("profile.back")}</p>
                    </button>
                    {currentTab === ENUM_NAVIGATION_CARD_ITEM_TYPE.USER_DATA ? (
                      <UserDataForm />
                    ) : currentTab ===
                      ENUM_NAVIGATION_CARD_ITEM_TYPE.CHANGE_PASSWORD ? (
                      <ChangePasswordForm />
                    ) : (
                      <ChangeNotificationsForm />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
