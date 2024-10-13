import {
  getNotificationsReq,
  INotificationCard,
  INotifications,
  notificationsAPI,
  useGetNotificationsQuery,
  useReadNotificationMutation,
} from "@entities/communication";
import {
  NotificationCard,
  NotificationMessage,
  SkeletonNotificationCard,
} from "@features/communication";
import { DinamicPagination } from "@features/other";
import {
  ArrowSmallVerticalIcon,
  CancelIcon2,
  NotificationMainIcon,
} from "@shared/assets";
import { BREAKPOINT, INTERSECTION_ELEMENTS } from "@shared/config";
import { useAppDispatch } from "@shared/hooks";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@shared/ui";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const Notifications: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { watch, reset, setValue, getValues, resetField } =
    useForm<getNotificationsReq>({
      defaultValues: {
        page: 1,
        elements_on_page: INTERSECTION_ELEMENTS.notifications,
      },
    });

  const formFields = watch();

  const { data, isFetching } = useGetNotificationsQuery({
    ...formFields,
  });
  const [readNotification] = useReadNotificationMutation();
  const [currentNotification, setCurrentNotification] =
    useState<INotificationCard | null>(null);
  const [screen, setScreen] = useState<number>(window.innerWidth);

  const handleChangeNotification = (card: INotificationCard) => {
    setCurrentNotification(card);
    handleReadNotification(card);
  };

  const handleClose = () => {
    setCurrentNotification(null);
  };

  const handleChangePage = () => {
    const currentPage = getValues("page") || 0;
    setValue("page", currentPage + 1);
  };

  const handleReadNotification = (card: INotificationCard) => {
    if (!card?.is_read && data) {
      readNotification({ notification_id: card?.id })
        .unwrap()
        .then(() => {
          const newNotifications: INotifications = {
            ...data,
            elements: (data?.elements || 1) - 1,
            notifications: data?.notifications?.map((item) => {
              if (item?.id === card?.id) {
                return { ...item, is_read: true };
              }
              return item;
            })!,
          };
          dispatch(
            notificationsAPI.util.updateQueryData(
              "getNotifications",
              {
                ...formFields,
              },
              (draft) => {
                Object.assign(draft, newNotifications);
              },
            ),
          );
        });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const divVariants = {
    close: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: "0%" },
    transition: { transition: { duration: 0.5 } },
  };

  return (
    <div className={styles.wrapper}>
      {screen >= BREAKPOINT.MD ? (
        <AlertDialog>
          <AlertDialogTrigger className={styles.trigger}>
            <NotificationMainIcon
              haveNewNotification={Boolean(data?.elements)}
            />
          </AlertDialogTrigger>
          <AlertDialogContent className={`${styles.content} ${styles.dialog}`}>
            <div className={styles.title}>
              <p>{t("notifications.title")}</p>
              <AlertDialogCancel onClick={handleClose}>
                <div className={styles.close}>
                  <CancelIcon2 />
                </div>
              </AlertDialogCancel>
              {currentNotification && (
                <div className={styles.arrow} onClick={handleClose}>
                  <ArrowSmallVerticalIcon className="active__icon" />
                </div>
              )}
            </div>
            {data?.notifications?.length ? (
              <div className={styles.notifications}>
                {data?.notifications.map((card, index) => (
                  <div
                    key={index}
                    onClick={() => handleChangeNotification(card)}
                  >
                    <NotificationCard card={card} />
                  </div>
                ))}
                {isFetching &&
                  Array.from({
                    length: INTERSECTION_ELEMENTS.notifications,
                  }).map((_, index) => (
                    <SkeletonNotificationCard key={index} />
                  ))}
                {!data?.isLast && (
                  <DinamicPagination onChange={handleChangePage} />
                )}
                <AnimatePresence>
                  {currentNotification && (
                    <>
                      <motion.div
                        initial="close"
                        animate="open"
                        exit="close"
                        transition={divVariants.transition}
                        variants={divVariants}
                        className={styles.message}
                      >
                        <NotificationMessage card={currentNotification} />
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <></>
            )}
            <div className={styles.new}>
              <p>
                {t("notifications.new")}: {data?.elements}
              </p>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Drawer>
          <DrawerTrigger className={styles.trigger}>
            <NotificationMainIcon
              haveNewNotification={Boolean(data?.elements)}
            />
          </DrawerTrigger>
          <DrawerContent className={`${styles.content} ${styles.drawer}`}>
            <div className={styles.title}>
              <p>{t("notifications.title")}</p>
              <DrawerClose onClick={handleClose}>
                <div className={styles.close}>
                  <CancelIcon2 />
                </div>
              </DrawerClose>
              {currentNotification && (
                <div className={styles.arrow} onClick={handleClose}>
                  <ArrowSmallVerticalIcon className="active__icon" />
                </div>
              )}
            </div>
            {data?.notifications?.length ? (
              <div className={styles.notifications}>
                {data?.notifications.map((card, index) => (
                  <div
                    key={index}
                    onClick={() => handleChangeNotification(card)}
                  >
                    <NotificationCard card={card} />
                  </div>
                ))}
                {isFetching &&
                  Array.from({
                    length: INTERSECTION_ELEMENTS.notifications,
                  }).map((_, index) => (
                    <SkeletonNotificationCard key={index} />
                  ))}
                {!data?.isLast && (
                  <DinamicPagination onChange={handleChangePage} />
                )}
                <AnimatePresence>
                  {currentNotification && (
                    <>
                      <motion.div
                        initial="close"
                        animate="open"
                        exit="close"
                        transition={divVariants.transition}
                        variants={divVariants}
                        className={styles.message}
                      >
                        <NotificationMessage card={currentNotification} />
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <></>
            )}
            <div className={styles.new}>
              <p>
                {t("notifications.new")}: {data?.elements}
              </p>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};
