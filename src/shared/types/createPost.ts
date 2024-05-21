export interface IPostChannel {
  id: string;
  avatar: string;
  name: string;
  category: string;
  platform: number;
}

export interface IProjectId {
  project_id: string;
}

export interface ICreatePostForm extends IProjectId {
  name?: string;
  posts: ICreatePost[];
  datetime: ICreateDate;
}

export interface ICreatePost extends IProjectId {
  platform?: number;
  // name?: string;
  comment?: string;
  media?: File[];
  files?: File[];
  buttons?: ITgButton[];
  text?: IPostText[];
}

// export interface IFile {
//   content_type: number;
//   content: string;
//   url?: string;
// }

export interface IPostText {
  content_type: number;
  content: string;
}

export interface ITgButton {
  content_type: number;
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
}

export interface TimeListProps {
  onChange: (timeList: string[]) => void;
}

export interface FileProps {
  onChange: (files: File[]) => void;
  currentFiles?: File[];
}
