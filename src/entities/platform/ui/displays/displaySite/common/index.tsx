import { FC, useEffect, useRef, useState } from "react";
import { EmptyPost } from "./emptyPost";
import styles from "./styles.module.scss";

export const DisplaySite: FC = ({}) => {
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
          <EmptyPost />
        </div>
      </div>
    </div>
  );
};
