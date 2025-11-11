import { FC } from "react";
import { Download } from "lucide-react";
import { GenerateDownloadLink } from "@shared/utils";
import { ContentType, IFile, getContentType } from "@entities/project";

interface YoutubeMediaProps {
  medias?: File[];
  mediasRes?: IFile[];
  shortsHeight: number;
  iconSize: number;
}

export const YoutubeMedia: FC<YoutubeMediaProps> = ({
  medias,
  mediasRes,
  shortsHeight,
  iconSize,
}) => {
  return (
    <div>
      {medias && (
        <div className="w-[100%] overflow-hidden relative">
          {(getContentType(medias[0]) === ContentType.photo || getContentType(medias[0]) === ContentType.gif) ? (
            <img
              src={URL.createObjectURL(medias[0])}
              alt={`Photo ${1}`}
              className="object-cover h-[620px] w-full"
              style={{ height: `${shortsHeight}px` }}
            />
          ) : (
            <video
              autoPlay
              loop
              muted
              controls
              className="object-cover h-[620px] w-full"
              style={{ height: `${shortsHeight}px` }}
            >
              <source src={URL.createObjectURL(medias[0])} type="video/mp4" />
              <source src={URL.createObjectURL(medias[0])} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          )}
          <div
            onClick={() => GenerateDownloadLink(medias[0], medias[0]?.name)}
            className="absolute bottom-3 right-3 rounded-full bg-[#ababab] opacity-75 hover:opacity-100 flex items-center content-center p-1 cursor-pointer"
          >
            <Download width={iconSize} height={iconSize} stroke="#fff" />
          </div>
        </div>
      )}
      {mediasRes && (
        <div className="w-[100%] overflow-hidden relative">
          {(mediasRes[0]?.content_type === ContentType.photo || mediasRes[0]?.content_type === ContentType.gif) ? (
            <img
              src={mediasRes[0]?.content}
              alt={`Photo ${1}`}
              className="object-cover h-[620] w-full"
              style={{ height: `${shortsHeight}px` }}
            />
          ) : (
            <video
              autoPlay
              loop
              muted
              controls
              className="object-cover h-[620] w-full"
              style={{ height: `${shortsHeight}px` }}
            >
              <source src={mediasRes[0]?.content} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <div
            onClick={() =>
              GenerateDownloadLink(
                mediasRes[0]?.content,
                mediasRes[0]?.name || `File_${1}`,
              )
            }
            className="absolute bottom-3 right-3 rounded-full bg-[#ababab] opacity-75 hover:opacity-100 flex items-center content-center p-1 cursor-pointer"
          >
            <Download width={iconSize} height={iconSize} stroke="#fff" />
          </div>
        </div>
      )}
    </div>
  );
};
