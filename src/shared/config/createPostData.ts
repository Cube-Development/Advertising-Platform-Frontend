export enum CreatePostData {
  project_id = "project_id",
  platform = "platform",
  name = "name",
  comment = "comment",
  files = "files",
  orders = "orders",
}

export enum CreatePostFormData {
  project_id = "project_id",
  name = "name",
  posts = "posts",
  datetime = "datetime",
}

export enum ContentNum {
  text = 1,
  photo = 2,
  video = 3,
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

const example = {
  project_id: "project_id",
  name: "name",
  posts: {
    telegram: {
      project_id: "project_id",
      platform: 1,
      comment: "comment",
      files: [
        {
          content_type: 1,
          content: "content",
        },
      ],
    },
  },
};
