import { ContentType, useGetFileLinkMutation } from "@entities/project";
import { IMess } from "@entities/communication";
import { FC, useEffect, useState } from "react";
import { MessageActionMenu } from "../MessageActionMenu";
import { FileIcon } from "lucide-react";

interface MessageContentProps {
  message: IMess;
}

export const MessageContent: FC<MessageContentProps> = ({ message }) => {
  const [getFileLink] = useGetFileLinkMutation();
  const [fileUrl, setFileUrl] = useState<string>("");

  const handleDownload = async () => {
    if (fileUrl) {
      try {
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download =
          message.name || message.content.split("/").pop() || "download";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Download failed:", error);
      }
    }
  };

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
          className="break-words overflow-wrap-anywhere"
          dangerouslySetInnerHTML={{ __html: message.content }}
        />
      );

    case ContentType.photo:
      return (
        <div className="max-w-full my-2 group">
          {fileUrl && (
            <img
              src={fileUrl}
              alt="Photo"
              className="max-w-full max-h-[400px] rounded-lg object-contain cursor-pointer transition-opacity duration-200 hover:opacity-90"
            />
          )}
          <MessageActionMenu onDownload={handleDownload} />
        </div>
      );

    case ContentType.video:
      return (
        <div className="max-w-full my-2 group">
          {fileUrl && (
            <video
              src={fileUrl}
              controls
              className="max-w-full max-h-[400px] rounded-lg"
            >
              <source src={fileUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <MessageActionMenu onDownload={handleDownload} />
        </div>
      );

    case ContentType.gif:
      return (
        <div className="max-w-full my-2 group">
          {fileUrl && (
            <img
              src={fileUrl}
              alt="GIF"
              className="max-w-full max-h-[400px] rounded-lg object-contain cursor-pointer transition-opacity duration-200 hover:opacity-90"
            />
          )}
          <MessageActionMenu onDownload={handleDownload} />
        </div>
      );

    case ContentType.file:
      const fileName =
        message.name || message.content.split("/").pop() || "file";
      return (
        <div className="flex items-center gap-2 group">
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-3 no-underline text-primary"
          >
            <FileIcon className="w-5 h-5 text-white shrink-0" />
            <span className="text-sm max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap text-white">
              {fileName}
            </span>
          </a>
          <MessageActionMenu onDownload={handleDownload} />
        </div>
      );

    default:
      return (
        <div className="break-words overflow-wrap-anywhere">
          {message.content}
        </div>
      );
  }
};
