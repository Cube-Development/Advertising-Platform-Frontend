import { FC } from "react";
import { Download } from "lucide-react";
import { GenerateDownloadLink } from "@shared/functions";
import { ContentType, IFile, getContentType } from "@entities/project";

interface YoutubeMediaProps {
  medias?: File[];
  mediasRes?: IFile[];
}

export const YoutubeMedia: FC<YoutubeMediaProps> = ({ medias, mediasRes }) => {
  return (
    <div>
      {medias && (
        <div className="w-[100%] overflow-hidden relative">
          {getContentType(medias[0]) === ContentType.photo ? (
            <img
              src={URL.createObjectURL(medias[0])}
              alt={`Photo ${1}`}
              className="object-cover h-[34vw] max-h-[500px] w-full"
            />
          ) : (
            <video
              autoPlay
              loop
              muted
              className="object-cover h-[34vw] max-h-[500px] w-full"
            >
              <source src={URL.createObjectURL(medias[0])} type="video/mp4" />
              <source src={URL.createObjectURL(medias[0])} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          )}
          <div
            onClick={() => GenerateDownloadLink(medias[0], medias[0]?.name)}
            className="absolute bottom-2 right-2 rounded-full bg-[#ababab] opacity-75 hover:opacity-100 flex items-center content-center p-1 cursor-pointer"
          >
            <Download width={20} height={20} stroke="#fff" />
          </div>
        </div>
      )}
      {mediasRes && (
        <div className="w-[100%] overflow-hidden relative">
          {mediasRes[0]?.content_type === ContentType.photo ? (
            <img
              src={mediasRes[0]?.content}
              alt={`Photo ${1}`}
              className="object-cover h-[28vw] max-h-[600px] w-full"
            />
          ) : (
            <video
              autoPlay
              loop
              muted
              className="object-cover h-[28vw] max-h-[600px] w-full"
            >
              <source src={mediasRes[0]?.content} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <div
            onClick={() =>
              GenerateDownloadLink(mediasRes[0]?.content, `File_${1}`)
            }
            className="absolute bottom-2 right-2 rounded-full bg-[#ababab] opacity-75 hover:opacity-100 flex items-center content-center p-1 cursor-pointer"
          >
            <Download width={20} height={20} stroke="#fff" />
          </div>
        </div>
      )}
    </div>
  );
};
