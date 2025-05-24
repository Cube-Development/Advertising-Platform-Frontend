import { FC } from "react";
import { Download } from "lucide-react";
import { GetPostRes, ICreatePost, ICreatePostForm } from "@entities/project";
import { useFileDownloader } from "@shared/hooks/useDownloadFiles";
import styles from "./styles.module.scss";
import downloadLottie from "/animated/download_files_lottie.gif";
import { useTranslation } from "react-i18next";
import { preparePostsData } from "../../helpers";

interface DownloadAllBtnProps {
  formState?: ICreatePostForm;
  post?: GetPostRes;
  currentPost?: ICreatePost;
}

export const DownloadAllBtn: FC<DownloadAllBtnProps> = ({
  post,
  formState,
  currentPost,
}) => {
  const { t } = useTranslation();
  const { videosRes, mediaRes, fileRes } = preparePostsData(post);
  const postData = [...videosRes, ...mediaRes, ...(fileRes ? [fileRes] : [])];

  const { downloadAllFiles, isAllDownloading, progress } = useFileDownloader(
    formState
      ? [...(currentPost?.media || []), ...(currentPost?.files || [])]
      : postData,
  );

  return (
    <div>
      {post && (
        <div
          onClick={() => downloadAllFiles()}
          className={`${styles.download_btn} `}
        >
          {isAllDownloading ? (
            <>
              <div
                className={styles.download_progress}
                style={{ width: `${progress}%` }}
              />
              <span className={styles.download_progress_text}>{progress}%</span>
            </>
          ) : (
            <div className={styles.download_btn__title}>
              {t("download_all_files")}
            </div>
          )}
          <span className={styles.download_btn__icon}>
            {isAllDownloading ? (
              <img src={downloadLottie} alt="download lottie" />
            ) : (
              <Download width={20} height={20} stroke="#2d2d2d" />
            )}
          </span>
        </div>
      )}
    </div>
  );
};
