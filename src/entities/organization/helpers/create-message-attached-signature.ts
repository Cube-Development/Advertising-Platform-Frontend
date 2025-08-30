export const CreateMessageAttachedSignature = (
  base64Data: string,
  keyId: string,
) => {
  return {
    plugin: "pkcs7",
    name: "append_pkcs7_attached",
    arguments: [base64Data, keyId],
  };
};
