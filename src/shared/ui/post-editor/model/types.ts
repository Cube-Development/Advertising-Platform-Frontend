export enum ContentType {
  text = 1,
  photo = 2,
  video = 3,
  file = 4,
  button = 5,
  gif = 6,
}

export interface IEditorFile {
  content_type: ContentType;
  content: string;
  url?: string;
  name?: string;
}

export interface TextFormat {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  monospace?: boolean;
}
