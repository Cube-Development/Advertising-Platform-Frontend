import {
  IGetMyOrganizationResponse,
  useCreateOrganizationMutation,
} from "@entities/organization";
import { zodResolver } from "@hookform/resolvers/zod";
import { formDataLength } from "@shared/config";
import { useToast } from "@shared/ui";
import { Button, Input, Label } from "@shared/ui/shadcn-ui";
import { formatToNumber, formatToPhoneNumber } from "@shared/utils";
import { ArrowLeft, Loader2 } from "lucide-react";
import { FC, useState } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  SelfEmployedFormValues,
  selfEmployedFormSchema,
} from "./model";
import { SelfEmployedSuccess } from "./ui";

interface SelfEmployedLoginProps {
  onBack: () => void;
}

export const SelfEmployedLogin: FC<SelfEmployedLoginProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [createOrganization, { isLoading }] = useCreateOrganizationMutation();
  const [createdOrganization, setCreatedOrganization] =
    useState<IGetMyOrganizationResponse | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SelfEmployedFormValues>({
    resolver: zodResolver(selfEmployedFormSchema),
    defaultValues: {
      PNFL: "",
      phone: "",
      card_number: "",
    },
  });

  const onSubmit = async (data: SelfEmployedFormValues) => {
    try {
      const result = await createOrganization({
        PINFL: data.PNFL,
        phone: data.phone,
        card_number: data.card_number,
      }).unwrap();

      toast({
        title: t("toasts.organization.create.success"),
        variant: "success",
      });
      setCreatedOrganization(result);
    } catch (err: unknown) {
      const error = err as { data?: { error?: { message?: string } } };
      const errorMessage =
        error?.data?.error?.message === "Unique violation error"
          ? "toasts.organization.create.unique"
          : "toasts.organization.create.error";

      toast({
        title: t(errorMessage),
        variant: "error",
      });
    }
  };

  if (createdOrganization) {
    return (
      <div className="grid grid-rows-[max-content,1fr] h-full min-h-0 w-full">
        <div className="grid gap-3 bg-[#341F47] px-5 py-4">
          <Button
            type="button"
            variant="ghost"
            className="text-white gap-2 px-0 h-auto justify-start hover:translate-y-0 hover:bg-transparent hover:text-white focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
            onClick={onBack}
          >
            <ArrowLeft size={18} />
            {t("organization.login.buttons.back")}
          </Button>
          <p className="text-lg font-semibold text-white">
            {t("organization.login.self_employed.header.brand")}
          </p>
        </div>

        <SelfEmployedSuccess inviteUrl={createdOrganization.invate_url} />
      </div>
    );
  }

  return (
    <div className="grid grid-rows-[max-content,1fr] h-full min-h-0 w-full">
      <div className="grid gap-3 bg-[#341F47] px-5 py-4">
        <Button
          type="button"
          variant="ghost"
          className="text-white gap-2 px-0 h-auto justify-start hover:translate-y-0 hover:bg-transparent hover:text-white focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
          onClick={onBack}
        >
          <ArrowLeft size={18} />
          {t("organization.login.buttons.back")}
        </Button>
        <p className="text-lg font-semibold text-white">
          {t("organization.login.self_employed.header.brand")}
        </p>
      </div>

      <form
        className="grid gap-5 px-5 py-8 pb-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-2 text-center">
          <p className="text-2xl font-semibold text-gray-900">
            {t("organization.login.self_employed.title")}
          </p>
          <span className="text-gray-600">
            {t("organization.login.self_employed.description")}
          </span>
        </div>

        <div className="grid gap-5">
          <FormField
            id="PNFL"
            label={t("organization.login.self_employed.fields.pinfl")}
            placeholder={t(
              "organization.login.self_employed.placeholders.pinfl",
            )}
            error={errors.PNFL}
            errorMessage={
              errors.PNFL?.message && t(errors.PNFL.message as string)
            }
            register={register("PNFL", { onChange: formatToNumber })}
            maxLength={formDataLength.PNFL}
          />

          <FormField
            id="phone"
            label={t("organization.login.self_employed.fields.phone")}
            placeholder={t(
              "organization.login.self_employed.placeholders.phone",
            )}
            error={errors.phone}
            errorMessage={
              errors.phone?.message && t(errors.phone.message as string)
            }
            register={register("phone", { onChange: formatToPhoneNumber })}
          />

          <FormField
            id="card_number"
            label={t("organization.login.self_employed.fields.card")}
            placeholder={t(
              "organization.login.self_employed.placeholders.card",
            )}
            error={errors.card_number}
            errorMessage={
              errors.card_number?.message &&
              t(errors.card_number.message as string)
            }
            register={register("card_number", { onChange: formatToNumber })}
            maxLength={formDataLength.card_number}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="w-full bg-[#FFEA00] text-gray-900 hover:bg-[#FFEA00]/90 rounded-lg h-12 font-semibold"
        >
          {t("organization.login.self_employed.buttons.submit")}
          {(isSubmitting || isLoading) && (
            <Loader2 className="ml-2 animate-spin" size={18} />
          )}
        </Button>
      </form>
    </div>
  );
};

interface FormFieldProps {
  id: string;
  label: string;
  placeholder: string;
  error?: { message?: string };
  errorMessage?: string | false;
  register: ReturnType<UseFormRegister<SelfEmployedFormValues>>;
  maxLength?: number;
}

const FormField: FC<FormFieldProps> = ({
  id,
  label,
  placeholder,
  error,
  errorMessage,
  register,
  maxLength,
}) => (
  <div className="grid gap-2">
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      placeholder={placeholder}
      className={
        error
          ? "rounded-lg bg-[#F4F5F7] border-red-500 h-12 focus-visible:ring-inset focus-visible:ring-offset-0"
          : "rounded-lg bg-[#F4F5F7] border-[#F4F5F7] h-12 focus-visible:ring-inset focus-visible:ring-offset-0"
      }
      maxLength={maxLength}
      {...register}
    />
    {errorMessage && (
      <p className="text-sm text-red-500">{errorMessage}</p>
    )}
  </div>
);
