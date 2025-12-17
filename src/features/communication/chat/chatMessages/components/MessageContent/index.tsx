import { ContentType, useGetFileLinkMutation } from "@entities/project";
import { IMess } from "@entities/communication";
import { FileIcon } from "@shared/assets";
import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";

interface MessageContentProps {
  message: IMess;
}

export const MessageContent: FC<MessageContentProps> = ({ message }) => {
  const [getFileLink] = useGetFileLinkMutation();
  const [fileUrl, setFileUrl] = useState<string>("");

  useEffect(() => {
    if (
      message.content_type === ContentType.photo ||
      message.content_type === ContentType.video ||
      message.content_type === ContentType.file ||
      message.content_type === ContentType.gif
    ) {
      getFileLink({ filename: message.content })
        .unwrap()
        .then((res) => {
          if (res.url) setFileUrl(res.url);
        })
        .catch((err) => console.error("Failed to get file link", err));
    }
  }, [message.content, message.content_type, getFileLink]);

  switch (message.content_type) {
    case ContentType.text:
      return (
        <div
          className={styles.text_content}
          dangerouslySetInnerHTML={{ __html: message.content }}
        />
      );

    case ContentType.photo:
      return (
        <div className={styles.media_content}>
          {fileUrl && (
            <img src={fileUrl} alt="Photo" className={styles.image} />
          )}
        </div>
      );

    case ContentType.video:
      return (
        <div className={styles.media_content}>
          {fileUrl && (
            <video src={fileUrl} controls className={styles.video}>
              <source src={fileUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      );

    case ContentType.gif:
      return (
        <div className={styles.media_content}>
          {fileUrl && <img src={fileUrl} alt="GIF" className={styles.gif} />}
        </div>
      );

    case ContentType.file:
      const fileName =
        message.name || message.content.split("/").pop() || "file";
      return (
        <a
          href={fileUrl}
          download={fileName}
          className={styles.file_content}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FileIcon />
          <span>{fileName}</span>
        </a>
      );

    default:
      return <div className={styles.text_content}>{message.content}</div>;
  }
};
