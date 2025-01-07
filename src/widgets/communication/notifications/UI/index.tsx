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
import {
  BREAKPOINT,
  INTERSECTION_ELEMENTS,
  PAGE_ANIMATION,
} from "@shared/config";
import { useAppDispatch, useWindowWidth } from "@shared/hooks";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
  ScrollArea,
} from "@shared/ui";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useState } from "react";
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
  const screen = useWindowWidth();

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
              }
            )
          );
        });
    }
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
            <AlertDialogTitle className={styles.title}>
              <p className="gradient_color">{t("notifications.title")}</p>
              <AlertDialogCancel onClick={handleClose}>
                <div className={styles.close}>
                  <CancelIcon2 />
                </div>
              </AlertDialogCancel>
              {!!currentNotification && (
                <div className={styles.arrow} onClick={handleClose}>
                  <ArrowSmallVerticalIcon className="active__icon" />
                </div>
              )}
            </AlertDialogTitle>
            {data?.notifications?.length ? (
              <ScrollArea>
                <div className={styles.notifications}>
                  {data?.notifications.map((card, index) => (
                    <motion.div
                      key={index}
                      initial="hidden"
                      animate="visible"
                      custom={index % INTERSECTION_ELEMENTS.notifications}
                      variants={PAGE_ANIMATION.animationNotification}
                      onClick={() => handleChangeNotification(card)}
                    >
                      <NotificationCard card={card} />
                    </motion.div>
                  ))}
                  {isFetching &&
                    Array.from({
                      length: INTERSECTION_ELEMENTS.notifications,
                    }).map((_, index) => (
                      <SkeletonNotificationCard key={index} />
                    ))}
                  {!data?.isLast && !isFetching && (
                    <DinamicPagination onChange={handleChangePage} />
                  )}
                  <AnimatePresence>
                    {currentNotification && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={PAGE_ANIMATION.sideTransition.transition}
                        variants={PAGE_ANIMATION.sideTransition}
                        className={styles.message}
                      >
                        <NotificationMessage card={currentNotification} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollArea>
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
            <DrawerTitle className={styles.title}>
              <DrawerDescription className="gradient_color">
                {t("notifications.title")}
              </DrawerDescription>
              <DrawerClose onClick={handleClose}>
                <div className={styles.close}>
                  <CancelIcon2 />
                </div>
              </DrawerClose>
              {!!currentNotification && (
                <div className={styles.arrow} onClick={handleClose}>
                  <ArrowSmallVerticalIcon className="active__icon" />
                </div>
              )}
            </DrawerTitle>
            {data?.notifications?.length ? (
              <ScrollArea>
                <div className={styles.notifications}>
                  {data?.notifications.map((card, index) => (
                    <motion.div
                      key={index}
                      initial="hidden"
                      animate="visible"
                      custom={index % INTERSECTION_ELEMENTS.notifications}
                      variants={PAGE_ANIMATION.animationNotification}
                      onClick={() => handleChangeNotification(card)}
                    >
                      <NotificationCard card={card} />
                    </motion.div>
                  ))}
                  {isFetching &&
                    Array.from({
                      length: INTERSECTION_ELEMENTS.notifications,
                    }).map((_, index) => (
                      <SkeletonNotificationCard key={index} />
                    ))}
                  {!data?.isLast && !isFetching && (
                    <DinamicPagination onChange={handleChangePage} />
                  )}
                  <AnimatePresence>
                    {currentNotification && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={PAGE_ANIMATION.sideTransition.transition}
                        variants={PAGE_ANIMATION.sideTransition}
                        className={styles.message}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={(event, info) => {
                          console.log(event, info);
                          if (info.offset.x > 100) handleClose(); // Если свайп вправо больше 100px, закрыть чат
                        }}
                      >
                        <NotificationMessage card={currentNotification} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollArea>
            ) : (
              <></>
            )}
            <div className={styles.new}>
              <p className="gradient_color">
                {t("notifications.new")}: {data?.elements}
              </p>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};
