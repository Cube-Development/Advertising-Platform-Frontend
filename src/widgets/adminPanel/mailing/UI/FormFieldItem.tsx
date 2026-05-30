import { UseFormRegister, FieldError } from "react-hook-form";
import { Input } from "@shared/ui/shadcn-ui/ui/input";
import { Label } from "@shared/ui/shadcn-ui/ui/label";
import { Textarea } from "@shared/ui/shadcn-ui/ui/textarea";
import { FieldConfig } from "../model/constants";
import { MailingFormInput } from "../model/schema";

interface FormFieldItemProps {
  field: FieldConfig;
  register: UseFormRegister<MailingFormInput>;
  error?: FieldError;
}

export const FormFieldItem = ({
  field,
  register,
  error,
}: FormFieldItemProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={field.id as string}>{field.label}</Label>
      {field.type === "textarea" ? (
        <Textarea
          id={field.id as string}
          placeholder={field.placeholder}
          {...register(field.id)}
          className={
            error
              ? "border-red-500 focus-visible:ring-red-500 min-h-[100px]"
              : "min-h-[100px]"
          }
        />
      ) : (
        <Input
          id={field.id as string}
          type={field.type}
          step={field.step}
          placeholder={field.placeholder}
          {...register(field.id)}
          className={error ? "border-red-500 focus-visible:ring-red-500" : ""}
        />
      )}
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};
