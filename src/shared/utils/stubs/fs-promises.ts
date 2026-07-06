export const readFile = async (): Promise<never> => {
  throw new Error("fs/promises is not available in the browser");
};

export const writeFile = async (): Promise<never> => {
  throw new Error("fs/promises is not available in the browser");
};
