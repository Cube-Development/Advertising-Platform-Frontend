import { useState, useEffect, FC } from "react";
import { useTranslation } from "react-i18next";
import postAnimation from "/animated/post_lottie.gif";
import checkAnimation from "/animated/check_lottie.gif";
import filesAnimation from "/animated/files_lottie.gif";
import videosAnimation from "/animated/videos_lottie.gif";
import heartAnimation from "/animated/heart_lottie.gif";
import styles from "./styles.module.scss";

export const CreateOrderLoading: FC = () => {
  const { t } = useTranslation();

  // Список анимаций и соответствующих текстов
  const animations = [
    { animation: postAnimation, text: t("create_order.loading.posts") },
    { animation: checkAnimation, text: t("create_order.loading.payment") },
    { animation: filesAnimation, text: t("create_order.loading.files") },
    { animation: videosAnimation, text: t("create_order.loading.files") },
    { animation: heartAnimation, text: t("create_order.loading.heart") },
  ];

  // Состояние для отображения анимации и текста
  const [loadingState, setLoadingState] = useState<{
    animation: string;
    text: string;
  } | null>(null);

  useEffect(() => {
    // Функция для случайного выбора анимации и текста
    const randomizeAnimation = () => {
      const randomIndex = Math.floor(Math.random() * animations.length);
      setLoadingState(animations[randomIndex]);
    };

    // Запуск случайного выбора при монтировании компонента и каждые 5-10 секунд
    randomizeAnimation();
    const intervalId = setInterval(
      randomizeAnimation,
      Math.floor(Math.random() * (10000 - 5000)) + 3000,
    );

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(intervalId);
  }, []);

  if (!loadingState) return null;

  return (
    <div className={styles.loading}>
      <img
        src={loadingState.animation}
        alt="isLoading..."
        className={styles.loading__icon}
      />
      <p className={styles.loading__title}>{loadingState.text}</p>
    </div>
  );
};
