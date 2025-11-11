export enum CreatePostData {
  project_id = "project_id",
  platform = "platform",
  name = "name",
  comment = "comment",
  files = "files",
  orders = "orders",
}

export enum CreatePostFormData {
  name = "name",
  posts = "posts",
  datetime = "datetime",
  multiposts = "multiposts",
}

export enum ContentType {
  text = 1,
  photo = 2,
  video = 3,
  file = 4,
  button = 5,
  gif = 6,
}

export enum FileData {
  content_type = "content_type",
  content = "content",
}

export enum DatetimeData {
  order_id = "order_id",
  date_from = "date_from",
  date_to = "date_to",
  time_from = "time_from",
  time_to = "time_to",
  date = "date",
}
