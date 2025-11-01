import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ICreatePostForm } from "@entities/project";
import { ENUM_WALLETS_TYPE } from "@entities/wallet";

interface Props {
  name: string;
  isNameLoading: boolean;
  projectId: string;
}

export const useCreateOrderForm = ({
  name,
  isNameLoading,
  projectId,
}: Props) => {
  const { register, getValues, handleSubmit, setValue, watch } =
    useForm<ICreatePostForm>({
      defaultValues: {
        posts: [],
        datetime: { project_id: projectId, orders: [] },
        isMultiPost: false,
        isDownloadPosts: false,
        name: name || "",
        wallet_type: ENUM_WALLETS_TYPE.DEPOSIT,
        prices: [],
      },
    });
  const formState = watch();

  useEffect(() => {
    if (!isNameLoading && name) {
      setValue("name", name);
    }
  }, [name, isNameLoading]);

  return {
    register,
    getValues,
    handleSubmit,
    setValue,
    formState,
  };
};
