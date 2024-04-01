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
