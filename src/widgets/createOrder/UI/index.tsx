import { ICreatePostForm } from "@entities/project";
import { ENUM_ROLES } from "@entities/user";
import { useAppSelector } from "@shared/hooks";
import { SpinnerLoader } from "@shared/ui";
import { FC, useEffect, useRef } from "react";
import { SubmitHandler } from "react-hook-form";
import {
  CreateOrderDatetime,
  CreateOrderLoading,
  CreateOrderPayment,
  CreateOrderPost,
  CreateOrderPrices,
  CreateOrderTop,
} from "../components";
import {
  useChangeBlur,
  useCheckBalance,
  useCreateOrderForm,
  useCreateOrderLoad,
  useOnSubmitPayment,
  useRequireProjectId,
  useTopUpFromCreateOrder,
} from "../model";

interface CreateOrderBlockProps {}

export const CreateOrderBlock: FC<CreateOrderBlockProps> = () => {
  const { role } = useAppSelector((state) => state.user);
  const { projectId } = useRequireProjectId();

  if (!projectId) return null;

  const { blur, handleOnChangeBlur, sectionId, scrollToSection } =
    useChangeBlur();
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

  const { checkBalance } = useCheckBalance(
    formState?.wallet_type,
    totalPrice?.amount,
  );

  const { handleTopUp } = useTopUpFromCreateOrder({
    payment,
    projectId,
    totalAmount: totalPrice?.amount || 0,
    role,
  });

  const didScrollToSection = useRef(false);
  useEffect(() => {
    if (!sectionId || isOrdersLoading || didScrollToSection.current) return;
    didScrollToSection.current = true;
    scrollToSection(sectionId);
  }, [sectionId, isOrdersLoading, scrollToSection]);

  const onSubmit: SubmitHandler<ICreatePostForm> = async (formData) => {
    const postsOk =
      formData?.isMultiPost && formData?.multiposts?.length
        ? true
        : !!formData?.posts?.length;

    if (
      projectId &&
      postsOk &&
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
    const postsOk =
      formData?.isMultiPost && formData?.multiposts?.length
        ? true
        : !!formData?.posts?.length;

    if (
      projectId &&
      postsOk &&
      formData?.datetime?.orders?.length &&
      !isOrdersLoading &&
      !isPostsLoading &&
      !formState?.isDownloadPosts
    ) {
      await payment(formData, projectId, role, true);
    }
  };

  const onTopUp: SubmitHandler<ICreatePostForm> = async (formData) => {
    const postsOk =
      formData?.isMultiPost && formData?.multiposts?.length
        ? true
        : !!formData?.posts?.length;

    if (
      projectId &&
      postsOk &&
      formData?.datetime?.orders?.length &&
      !isOrdersLoading &&
      !isPostsLoading &&
      !formState?.isDownloadPosts
    ) {
      await handleTopUp(formData);
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
              onTopUp={handleSubmit(onTopUp)}
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
