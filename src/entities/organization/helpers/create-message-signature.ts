export const CreateMessageSignature = (
  message: string | number,
  keyId: string,
) => {
  const base64Data = btoa(String(message));
  return {
    plugin: "pkcs7",
    name: "create_pkcs7",
    arguments: [base64Data, keyId, "no"],
  };
};
