import { PostTypesNum, platformTypesNum } from "@entities/platform";
import { ContentType } from "../config";
import { IChannelLink } from "@entities/channel";

export interface PostFormats {
  platform: platformTypesNum;
  post_types: PostTypesNum[];
}
[];

export interface IPostChannel {
  id: string;
  avatar: string;
  name: string;
  category: string;
  platform: platformTypesNum;
  post_type: PostTypesNum;
  channel_url: string;

  date_from?: string;
  date_to?: string;
  date?: string;
  time_from?: string;
  time_to?: string;
}

export interface IProjectId {
  project_id: string;
}

export interface ICreatePostForm {
  name?: string;
  posts?: ICreatePost[];
  multiposts?: ICreatePost[];
  selectedMultiPostId?: string | null;
  datetime: ICreateDate;
  isMultiPost: boolean;
  selectedPostType: PostTypesNum;
  platformFilter: IChannelLink;
}

export interface ICreatePost {
  platform?: number;
  post_type?: PostTypesNum;
  comment?: string;
  media?: File[];
  files?: File[];
  buttons?: ITgButton[];
  text?: IPostText[];
  content?: IFile[];
  order_id?: string;
}

export interface IFile {
  content_type: ContentType;
  content: string;
  url?: string;
}

export interface IPostText {
  content_type: ContentType;
  content: string;
}

export interface ITgButton {
  content_type: ContentType;
  content: string;
  url: string;
}

export interface ICreateDate extends IProjectId {
  orders: IDatetime[];
}

export interface IDatetime {
  order_id?: string;
  date_from?: string;
  date_to?: string;
  time_from?: string;
  time_to?: string;
  date?: string;
}

export interface DateListProps {
  onChange: (dateList: Date[]) => void;
  startDate?: string[] | string | undefined;
}

export interface TimeListProps {
  onChange: (timeList: string[]) => void;
  startTime?: string[] | undefined;
}

export interface FileProps {
  onChange: (files: File[]) => void;
  currentFiles?: File[];
}
