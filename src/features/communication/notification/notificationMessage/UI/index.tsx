import {
  INotificationCard,
  notificationsStatus,
} from "@entities/communication";
import { ScrollArea } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface NotificationMessageProps {
  card: INotificationCard;
}

export const NotificationMessage: FC<NotificationMessageProps> = ({ card }) => {
  const { t } = useTranslation();
  const title =
    notificationsStatus.find((item) => item.type === card?.method)?.name ||
    "...";

  // const text =
  //   '       <div class="notification__email__wrapper" style="background: #f4f4f4; padding: 20px;">        <div class="notification__email__content" style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #ddd; border-radius: 8px;">          <div class="notification_wrapper" style="padding: 25px 15px;">            <div class="notification_text" style="display: grid; grid-auto-flow: row; row-gap: 15px;">              <h2 class="title" style="color: #4772e6; font-size: 20px; font-style: normal; font-weight: 600; line-height: normal; text-align: center;">                Проект запущен в работу!              </h2>              <div class="text" style="display: grid; grid-auto-flow: row; row-gap: 10px;">                <p style="color: #000; font-size: 14px; font-style: normal; font-weight: 500; line-height: normal;">                  Уважаемый(ая)                  <strong> damirk355@gmail.com, </strong>                </p>                <p style="color: #000; font-size: 14px; font-style: normal; font-weight: 500; line-height: normal;">                  Ваш проект                  <strong> "[Название проекта]" </strong>                  успешно запущен в работу! Теперь вы можете отслеживать обновления и статус вашей рекламной кампании в личном кабинете.                  Мы постоянно улучшаем наш сервис, чтобы вы получали максимальную пользу от платформы.                </p>                <p style="color: #000; font-size: 14px; font-style: normal; font-weight: 500; line-height: normal;">                  Подробную информацию о размещениях рекламной кампании можно найти в разделе                  <a href="/orders?project_type=my_project&project_status=active&project_id=[PROJECT_ID]" class="link" style="color: #4772e6; font-weight: 600; text-decoration: none;">                    "Мои проекты"                  </a>.                </p>              </div>              <div class="footer">                <p style="color: #000; font-size: 14px; font-style: normal; font-weight: 500; line-height: normal;">                  С уважением,<br>                  <strong>Команда Blogix</strong>                </p>              </div>            </div>          </div>        </div>      </div>';

  return (
    <div className={styles.wrapper}>
      <ScrollArea>
        {/* <div className="notification_wrapper">
          <div className="notification_text">
            <h2 className="title">Проект запущен в работу!</h2>
            <div className="text">
              <p>
                Уважаемый(ая)
                <strong> @damirk355@gmail.com, </strong>
              </p>
              <p>
                Ваш проект
                <strong> "[Название проекта]" </strong>
                успешно запущен в работу! Теперь вы можете отслеживать
                обновления и статус вашей рекламной кампании в личном кабинете.
                Мы постоянно улучшаем наш сервис, чтобы вы получали максимальную
                пользу от платформы.
              </p>
              <p>
                Подробную информацию о размещениях рекламной кампании можно
                найти в разделе{" "}
                <a href="/orders?project_type=my_project&project_status=active&project_id=[PROJECT_ID]">
                  <strong>"Мои проекты"</strong>
                </a>
                .
              </p>
            </div>
            <div className="footer">
              <p>
                С уважением,
                <br />
                <strong>Команда Blogix</strong>
              </p>
            </div>
          </div>
        </div> */}
        <span dangerouslySetInnerHTML={{ __html: card?.text || "" }} />
        {/* <div className={styles.text__wrapper}>
          <p className={styles.title}>{t(title)}</p>

        </div> */}
      </ScrollArea>
      <div className={styles.support}>
        <span>{t("notifications.support.title")}</span>
      </div>
    </div>
  );
};
