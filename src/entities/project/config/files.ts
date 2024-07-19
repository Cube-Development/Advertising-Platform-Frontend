export const enum MEDIA_FILES {
  maxSize = 50,
  maxLenght = 10,
}
export const enum FILES {
  maxSize = 50,
  maxLenght = 1,
}

export const enum POST {
  postLength = 2000,
  commentLength = 1000,
}

export enum addFileFilter {
  mediafile = "mediafile",
  file = "file",
}

export const addFileTypes = [
  {
    name: "create_order.create.add_files.types.mediafile",
    type: addFileFilter.mediafile,
  },
  {
    name: "create_order.create.add_files.types.file",
    type: addFileFilter.file,
  },
];
