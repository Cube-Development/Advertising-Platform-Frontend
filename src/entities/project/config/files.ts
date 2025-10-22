export const enum MEDIA_FILES {
  MAX_SIZE = 50,
  MAX_LENGTH = 10,
}
export const enum FILES {
  MAX_SIZE = 50,
  MAX_LENGTH = 1,
}

export const enum POST {
  POST_LENGTH = 4096,
  COMMENT_LENGTH = 4096,
}

export enum ADD_FILE_FILTER {
  MEDIA_FILE = "mediafile",
  FILE = "file",
}

export const ADD_FILE_FILTER_TABS_LIST = [
  {
    name: "create_order.create.add_files.types.mediafile",
    type: ADD_FILE_FILTER.MEDIA_FILE,
  },
  {
    name: "create_order.create.add_files.types.file",
    type: ADD_FILE_FILTER.FILE,
  },
];
