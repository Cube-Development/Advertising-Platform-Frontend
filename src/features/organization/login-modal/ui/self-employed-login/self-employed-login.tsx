import {
  IGetMyOrganizationResponse,
  useCreateOrganizationMutation,
} from "@entities/organization";
import { zodResolver } from "@hookform/resolvers/zod";
import { formDataLength } from "@shared/config";
import { useToast } from "@shared/ui";
import { Button, cn, Input, Label } from "@shared/ui/shadcn-ui";
import { formatToNumber, formatToPhoneNumber } from "@shared/utils";
import { ArrowLeft, Loader2 } from "lucide-react";
import { FC, useRef, useState } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SelfEmployedFormValues, selfEmployedFormSchema } from "./model";
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
  const invitePopupRef = useRef<Window | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SelfEmployedFormValues>({
    resolver: zodResolver(selfEmployedFormSchema),
    mode: "onBlur",
    defaultValues: {
      PNFL: "",
      phone: "",
    },
  });

  const onSubmit = async (data: SelfEmployedFormValues) => {
    invitePopupRef.current = window.open("about:blank", "_blank");

    try {
      const result = await createOrganization({
        PINFL: data.PNFL,
        phone: data.phone.replace(/\D/g, ""),
      }).unwrap();

      if (result.invite_url) {
        const popup = invitePopupRef.current;
        if (popup && !popup.closed) {
          popup.location.href = result.invite_url;
        }
        invitePopupRef.current = null;
      } else {
        invitePopupRef.current?.close();
        invitePopupRef.current = null;
      }

      toast({
        title: t("toasts.organization.create.success"),
        variant: "success",
      });
      setCreatedOrganization(result);
    } catch (err: unknown) {
      invitePopupRef.current?.close();
      invitePopupRef.current = null;

      const error = err as {
        data?: { message?: string; error?: { message?: string } };
      };
      const backendMessage =
        error?.data?.error?.message || error?.data?.message;
      const errorMessage =
        backendMessage === "Unique violation error"
          ? "toasts.organization.create.unique"
          : backendMessage === "Organization not found"
            ? "toasts.organization.create.not_found"
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

        <SelfEmployedSuccess inviteUrl={createdOrganization.invite_url} />
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
        className="grid grid-rows-[1fr,min-content] gap-5 py-6 px-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="grid gap-6">
            <div className="grid gap-4 text-center">
              <p className="text-2xl font-semibold text-gray-900">
                {t("organization.login.self_employed.title")}
              </p>
              <span className="text-gray-600">
                {t("organization.login.self_employed.description")}
              </span>
            </div>

            <div className="grid gap-6">
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
                maxLength={formDataLength.phone + 1}
              />

              {/* <FormField
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
            maxLength={16}
          /> */}
            </div>
          </div>
        </div>
        <div className="mb-5">
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
        </div>
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
      className={cn(
        "text-base",
        error
          ? "rounded-lg bg-[#F4F5F7] border-red-500 h-12 focus-visible:ring-inset focus-visible:ring-offset-0"
          : "rounded-lg bg-[#F4F5F7] border-[#F4F5F7] h-12 focus-visible:ring-inset focus-visible:ring-offset-0",
      )}
      maxLength={maxLength}
      {...register}
    />
    {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
  </div>
);
