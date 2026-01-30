import { ICreatePostForm } from "@entities/project";
import { ENUM_COOKIES_TYPES } from "@shared/config";
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
  CreateOrderPrices,
} from "../components";
import {
  useChangeBlur,
  useCheckBalance,
  useCreateOrderForm,
  useCreateOrderLoad,
  useOnSubmitPayment,
  useSyncExternalFields,
} from "../model";
import { ENUM_ROLES } from "@entities/user";
import { useVoiceAgentOrderObserver } from "@widgets/voice-agent/model/hooks/use-voice-agent-order-observer";

interface CreateOrderBlockProps {}

export const CreateOrderBlock: FC<CreateOrderBlockProps> = () => {
  const { role } = useAppSelector((state) => state.user);
  const projectId = Cookies.get(ENUM_COOKIES_TYPES.PROJECT_ID) || "";

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
    projectPrices,
  } = useCreateOrderLoad({ projectId, role });

  const { register, getValues, handleSubmit, setValue, formState } =
    useCreateOrderForm({
      name: projectName?.name || "",
      isNameLoading: isProjectNameLoading,
      projectId,
    });

  useVoiceAgentOrderObserver({
    campaignName: formState.name,
    totalPrice: totalPrice?.amount,
    isCartEmpty: !projectChannels?.orders?.length,
    blur,
  });

  useSyncExternalFields({ formState, setValue });

  const { checkBalance } = useCheckBalance(
    formState?.wallet_type,
    totalPrice?.amount,
  );
  console.log("formState", formState);
  const onSubmit: SubmitHandler<ICreatePostForm> = async (formData) => {
    if (
      projectId &&
      formData?.posts?.length &&
      formData?.datetime?.orders?.length &&
      !isOrdersLoading &&
      !isPostsLoading &&
      !formState?.isDownloadPosts
    ) {
      if (checkBalance()) {
        await payment(formData, projectId, role);
      }
    }
  };

  const onSave: SubmitHandler<ICreatePostForm> = async (formData) => {
    if (
      projectId &&
      formData?.posts?.length &&
      formData?.datetime?.orders?.length &&
      !isOrdersLoading &&
      !isPostsLoading &&
      !formState?.isDownloadPosts
    ) {
      await payment(formData, projectId, role, true);
    }
  };

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
              cards={projectChannels?.orders || []}
              posts={projectPosts?.posts || []}
              isBlur={blur.post}
              onChangeBlur={handleOnChangeBlur}
              setValue={setValue}
              getValues={getValues}
              formState={formState}
            />

            <CreateOrderDatetime
              cards={projectChannels?.orders || []}
              isBlur={blur.datetime}
              onChangeBlur={handleOnChangeBlur}
              setValue={setValue}
              getValues={getValues}
              formState={formState}
              role={role}
            />

            {role === ENUM_ROLES.AGENCY && (
              <CreateOrderPrices
                isBlur={blur.prices}
                onChangeBlur={handleOnChangeBlur}
                setValue={setValue}
                getValues={getValues}
                projectPrices={projectPrices?.items || []}
              />
            )}

            <CreateOrderPayment
              isBlur={blur.payment}
              totalAmount={totalPrice?.amount || 0}
              role={role}
              setValue={setValue}
              formState={formState}
              onAction={handleSubmit(onSubmit)}
              onSave={handleSubmit(onSave)}
              isAllowed={
                !formState?.isDownloadPosts &&
                !isOrdersLoading &&
                !isPostsLoading
              }
              step={role === ENUM_ROLES.AGENCY ? 5 : 4}
            />
          </>
        )}
      </form>
    </>
  );
};
