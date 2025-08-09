import { Certificate } from "@shared/api";

export const CreateMessageKeyId = (certificate: Certificate) => {
  return {
    plugin: "pfx",
    name: "load_key",
    arguments: [
      certificate!.disk,
      certificate!.path,
      certificate!.name,
      certificate!.alias,
    ],
  };
};
