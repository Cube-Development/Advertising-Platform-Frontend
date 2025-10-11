export const CreateMessageAttachedTokenSignature = (
  pkcs7: string,
  signer_serial_number: string,
  tokenBase64: string,
) => {
  return {
    plugin: "pkcs7",
    name: "attach_timestamp_token_pkcs7",
    arguments: [pkcs7, signer_serial_number, tokenBase64],
  };
};
