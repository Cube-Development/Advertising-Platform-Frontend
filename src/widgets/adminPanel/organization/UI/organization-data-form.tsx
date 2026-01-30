import {
  IDigitalFormData,
  LEGAL_DATA,
  useGetProfileEDOQuery,
} from "@entities/organization";
import { LogoutEcp } from "@features/organization";
import { useAppSelector } from "@shared/hooks";
import { CustomBlockData } from "@shared/ui";
import { NotLogin } from "@widgets/organization";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";

export const OrganizationDataForm: FC = ({}) => {
  const { isAuthEcp } = useAppSelector((state) => state.user);
  const { data: profile, isLoading } = useGetProfileEDOQuery(undefined, {
    skip: !isAuthEcp,
  });

  const {
    register,
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IDigitalFormData>({
    defaultValues: {},
  });
  const formState = watch();

  useEffect(() => {
    if (!isAuthEcp) return;
    if (isLoading) return;
    if (!profile) return;

    reset({
      // type_legal: Number(profile?.type) || 0,
      name: profile?.name || "",
      address: profile?.address || "",
      INN: Number(profile?.tin) || 0,
      checking_account: profile?.account || "",
      bank_name: profile?.bankCode || "",
      bank_mfo: Number(profile?.mfo) || undefined,
      phone: profile?.mobile || profile?.phone || "",
      email: profile?.email || "",
      PNFL: Number(profile?.personalNum || "") || undefined,
      registration_number: 0,
      registration_date: "",
      transit_account: "",
      card_number: 0,
      card_date: "",
      password: "",
    });
  }, [profile, isLoading, isAuthEcp]);

  return (
    <div className="relative frame">
      {isAuthEcp ? (
        <>
          <div className="absolute top-4 right-4 ">
            <LogoutEcp />
          </div>
          <div className="grid grid-flow-row gap-5">
            {LEGAL_DATA.map((item, index) => (
              <CustomBlockData
                key={index + (item?.title || "")}
                data={item}
                register={register}
                inputError={errors}
                isRow
                disabled={true}
              />
            ))}
          </div>
        </>
      ) : (
        <NotLogin />
      )}
    </div>
  );
};
