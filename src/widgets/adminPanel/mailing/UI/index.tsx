import { useAdminSendMailingMutation } from "@entities/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  MultiSelect,
  useToast,
} from "@shared/ui";
import { Label } from "@shared/ui/shadcn-ui/ui/label";
import { useForm } from "react-hook-form";
import { MAILING_MAIN_FIELDS, MAILING_TEXT_FIELDS } from "../model/constants";
import {
  MailingFormInput,
  MailingFormOutput,
  mailingSchema,
} from "../model/schema";
import { FormFieldItem } from "./FormFieldItem";

const ROLE_OPTIONS: any[] = [
  { id: "blogger", name: "Блогер" },
  { id: "advertiser", name: "Рекламодатель" },
];

export const Mailing = () => {
  const { toast } = useToast();
  const [sendMailing] = useAdminSendMailingMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MailingFormInput, any, MailingFormOutput>({
    resolver: zodResolver(mailingSchema),
    defaultValues: {
      role: "blogger",
    },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: MailingFormOutput) => {
    try {
      await sendMailing({
        subject: data.subject,
        text: data.text,
        role: data.role,
        users: data.users,
      }).unwrap();
      toast({ title: "Успех", description: "Рассылка успешно отправлена" });
      reset();
    } catch (error) {
      toast({ title: "Ошибка", description: "Не удалось отправить рассылку" });
    }
  };

  return (
    <div className="w-full flex justify-center items-start p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Рассылка</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {MAILING_MAIN_FIELDS.map((field) =>
              field.id === "role" ? (
                <div key={field.id} className="flex flex-col gap-2">
                  <Label>Роль</Label>
                  <MultiSelect
                    options={ROLE_OPTIONS}
                    onValueChange={(val) => setValue("role", val[0])}
                    single={true}
                    showCheckBox={false}
                    defaultValue={[selectedRole]}
                    placeholder="Выберите роль"
                  />
                  {errors.role && (
                    <p className="text-sm text-red-500">
                      {errors.role.message}
                    </p>
                  )}
                </div>
              ) : (
                <FormFieldItem
                  key={field.id}
                  field={field}
                  register={register}
                  error={errors[field.id as keyof MailingFormInput]}
                />
              ),
            )}

            <div className="flex flex-col gap-4">
              {MAILING_TEXT_FIELDS.map((field) => (
                <FormFieldItem
                  key={field.id}
                  field={field}
                  register={register}
                  error={errors[field.id as keyof MailingFormInput]}
                />
              ))}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
              variant={"primary"}
            >
              {isSubmitting ? "Отправка..." : "Отправить"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
