import { ContentType, GetPostRes } from "@entities/project";
import { FC, useEffect, useRef, useState } from "react";
import { DownloadAllBtn } from "../../../utils/downloadAllBtn";
import { TelegramComment } from "../../displayTelegram/UI/comment";
import { TelegramFile } from "../../displayTelegram/UI/file";
import { EmptyPost } from "./emptyPost";
import styles from "./styles.module.scss";

/** Вложения ТЗ к заказу на сайт: всё, кроме текста и кнопок */
const SITE_ATTACHMENT_TYPES = [
  ContentType.photo,
  ContentType.video,
  ContentType.gif,
  ContentType.file,
];

interface DisplaySiteProps {
  /**
   * Готовый пост заказа. У сайта нет макета: при создании заказа показываем
   * подсказку про ТЗ, а в просмотре — комментарий и приложенные файлы.
   */
  post?: GetPostRes;
}

export const DisplaySite: FC<DisplaySiteProps> = ({ post }) => {
  const attachments =
    post?.files?.filter((file) =>
      SITE_ATTACHMENT_TYPES.includes(file.content_type),
    ) || [];
  const comment = post?.comment || "";
  const hasContent = !!comment || attachments.length > 0;

  const imgRef = useRef<HTMLImageElement>(null);
  const [resizes, setResizes] = useState<{
    borderRadius: number;
    timeSize: number;
    channelNameSize: number;
    channelSubsSize: number;
    avatarWidthSize: number;
    unmuteSize: number;
    displayTopSize: number;
    displayBottomSize: number;
    downloadIconSize: number;
  } | null>(null);

  useEffect(() => {
    const imgElement = imgRef.current;
    if (!imgElement) return;

    const updateSizes = () => {
      const imgWidth = imgElement.offsetWidth;
      setResizes({
        borderRadius: (imgWidth / 364) * 54,
        timeSize: (imgWidth / 364) * 14,
        channelNameSize: (imgWidth / 364) * 12,
        channelSubsSize: (imgWidth / 364) * 10,
        avatarWidthSize: (imgWidth / 364) * 30,
        unmuteSize: (imgWidth / 364) * 14,
        displayTopSize: (imgWidth / 364) * 80,
        displayBottomSize: (imgWidth / 364) * 60,
        downloadIconSize: (imgWidth / 364) * 20,
      });
    };

    const observer = new ResizeObserver(updateSizes);
    observer.observe(imgElement);

    return () => observer.disconnect();
  }, [imgRef]);

  return (
    <div className={styles.screen_wrapper}>
      <div className={styles.screen}>
        <p
          className={styles.time}
          style={{ fontSize: `${resizes?.timeSize}px` }}
        >
          9:41
        </p>
        <img
          className={styles.statusbar}
          src="/images/phoneDisplay/statusbar.svg"
        />
        <img
          className={styles.dynamic}
          src="/images/phoneDisplay/dynamic.png"
        />
        <img
          ref={imgRef}
          className={styles.mockup}
          src="/images/phoneDisplay/iphonescreen.png"
        />
        <div
          className={styles.display}
          style={{
            borderRadius: `${resizes?.borderRadius}px`,
            paddingTop: `${resizes?.displayTopSize}px`,
            paddingBottom: `${resizes?.displayBottomSize}px`,
          }}
        >
          {hasContent ? (
            <div className={styles.content}>
              {attachments.map((file, index) => (
                <TelegramFile
                  key={`${file.content}-${index}`}
                  file={file}
                  fontSize={resizes?.timeSize || 14}
                />
              ))}
              {comment && (
                <TelegramComment
                  comment={comment}
                  fontSize={resizes?.timeSize || 14}
                />
              )}
              <div className={styles.stroke}></div>
            </div>
          ) : (
            <EmptyPost />
          )}
        </div>
      </div>
      {attachments.length > 0 && (
        <section className="grid grid-cols-[1fr_auto] mt-2 ml-2.5 gap-1.5">
          <DownloadAllBtn post={post} />
        </section>
      )}
    </div>
  );
};
