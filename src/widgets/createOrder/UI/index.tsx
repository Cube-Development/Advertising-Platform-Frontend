import { ICreatePostForm } from "@entities/project";
import { ENUM_COOKIES_TYPES, MOCK_CREATE_ORDERS } from "@shared/config";
import { useAppSelector } from "@shared/hooks";
import { SpinnerLoader } from "@shared/ui";
import Cookies from "js-cookie";
import { FC } from "react";
import { SubmitHandler } from "react-hook-form";
import {
  CreateOrderDatetime,
  CreateOrderLoading,
  CreateOrderPayment,
  CreateOrderPost,
  CreateOrderTop,
} from "../components";
import {
  useChangeBlur,
  useCreateOrderForm,
  useCreateOrderLoad,
  useOnSubmitPayment,
} from "../model";

interface CreateOrderBlockProps {}

export const CreateOrderBlock: FC<CreateOrderBlockProps> = () => {
  const projectId = Cookies.get(ENUM_COOKIES_TYPES.PROJECT_ID) || "";
  const { role } = useAppSelector((state) => state.user);
  const { blur, handleOnChangeBlur } = useChangeBlur();
  const { isLoading, payment } = useOnSubmitPayment();

  const {
    projectName,
    isProjectNameLoading,
    projectChannels,
    isOrdersLoading,
    projectPosts,
    isPostsLoading,
    totalPrice,
  } = useCreateOrderLoad({ projectId });

  const { register, getValues, handleSubmit, setValue, formState } =
    useCreateOrderForm({
      name: projectName?.name!,
      isNameLoading: isProjectNameLoading,
      projectId,
    });

  const onSubmit: SubmitHandler<ICreatePostForm> = async (formData) => {
    if (
      projectId &&
      formData?.posts?.length &&
      formData?.datetime?.orders?.length &&
      !isOrdersLoading &&
      !isPostsLoading &&
      !formState?.isDownloadPosts
    ) {
      await payment(formData, projectId, role);
    }
  };

  // console.log("cards", projectChannels?.orders);

  // const CARDS = MOCK_CREATE_ORDERS;
  const CARDS = null;
  return (
    <>
      {isLoading && <CreateOrderLoading />}
      <CreateOrderTop
        onChangeBlur={handleOnChangeBlur}
        register={register}
        getValues={getValues}
        formState={formState}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        {isOrdersLoading ? (
          <div className="h-[80svh] w-full backdrop-blur-3xl flex justify-center items-center">
            <SpinnerLoader />
          </div>
        ) : (
          <>
            <CreateOrderPost
              cards={CARDS || projectChannels?.orders || []}
              posts={projectPosts?.posts || []}
              isBlur={blur.post}
              onChangeBlur={handleOnChangeBlur}
              setValue={setValue}
              getValues={getValues}
              formState={formState}
            />

            <CreateOrderDatetime
              cards={CARDS || projectChannels?.orders || []}
              isBlur={blur.datetime}
              onChangeBlur={handleOnChangeBlur}
              setValue={setValue}
              getValues={getValues}
              formState={formState}
            />

            <CreateOrderPayment
              isBlur={blur.payment}
              totalAmount={totalPrice?.amount || 0}
              role={role}
              setValue={setValue}
              formState={formState}
              onAction={handleSubmit(onSubmit)}
              isAllowed={
                !formState?.isDownloadPosts &&
                !isOrdersLoading &&
                !isPostsLoading
              }
            />
          </>
        )}
      </form>
    </>
  );
};
