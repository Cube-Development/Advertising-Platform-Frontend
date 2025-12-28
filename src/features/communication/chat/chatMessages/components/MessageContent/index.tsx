import { ContentType, useGetFileLinkMutation } from "@entities/project";
import { IMess } from "@entities/communication";
import { FC, useEffect, useState } from "react";
import { MessageActionMenu } from "../MessageActionMenu";
import { FileIcon, Image as ImageIcon, Video as VideoIcon } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@shared/ui";

interface MessageContentProps {
  message: IMess;
}

export const MessageContent: FC<MessageContentProps> = ({ message }) => {
  const [getFileLink] = useGetFileLinkMutation();
  const [fileUrl, setFileUrl] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px", // Preload slightly before appearing
  });

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
    if (!inView) return; // Only fetch if visible

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
  }, [message.content, message.content_type, getFileLink, inView]);

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
        <div ref={ref} className="max-w-full my-2 group min-h-[100px]">
          {(!fileUrl || !isLoaded) && (
            <Skeleton className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] flex items-center justify-center rounded-lg bg-gray-200">
              <ImageIcon className="w-10 h-10 text-gray-400" />
            </Skeleton>
          )}
          {fileUrl && (
            <img
              src={fileUrl}
              alt="Photo"
              onLoad={() => setIsLoaded(true)}
              className={`max-w-[200px] sm:max-w-[300px] w-auto h-[200px] sm:h-[300px] rounded-lg object-contain cursor-pointer transition-opacity duration-200 hover:opacity-90 ${
                !isLoaded ? "hidden" : "block"
              }`}
            />
          )}
          <MessageActionMenu onDownload={handleDownload} />
        </div>
      );

    case ContentType.video:
      return (
        <div ref={ref} className="max-w-full my-2 group min-h-[100px]">
          {(!fileUrl || !isLoaded) && (
            <Skeleton className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] flex items-center justify-center rounded-lg bg-gray-200">
              <VideoIcon className="w-10 h-10 text-gray-400" />
            </Skeleton>
          )}
          {fileUrl && (
            <video
              src={fileUrl}
              controls
              onLoadedData={() => setIsLoaded(true)}
              className={`max-w-[200px] sm:max-w-[300px] w-auto h-[200px] sm:h-[300px] rounded-lg ${
                !isLoaded ? "hidden" : "block"
              }`}
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
        <div ref={ref} className="max-w-full my-2 group min-h-[100px]">
          {(!fileUrl || !isLoaded) && (
            <Skeleton className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] flex items-center justify-center rounded-lg bg-gray-200">
              <ImageIcon className="w-10 h-10 text-gray-400" />
            </Skeleton>
          )}
          {fileUrl && (
            <img
              src={fileUrl}
              alt="GIF"
              onLoad={() => setIsLoaded(true)}
              className={`max-w-[200px] sm:max-w-[300px] w-auto h-[200px] sm:h-[300px] rounded-lg object-contain cursor-pointer transition-opacity duration-200 hover:opacity-90 ${
                !isLoaded ? "hidden" : "block"
              }`}
            />
          )}
          <MessageActionMenu onDownload={handleDownload} />
        </div>
      );

    case ContentType.file:
      const fileName =
        message.name || message.content.split("/").pop() || "file";
      return (
        <div ref={ref} className="flex items-center gap-2 group min-h-[40px]">
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
