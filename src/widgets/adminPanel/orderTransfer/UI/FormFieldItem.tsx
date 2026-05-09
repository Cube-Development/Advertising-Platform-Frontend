import { UseFormRegister, FieldError } from "react-hook-form";
import { Input } from "@shared/ui/shadcn-ui/ui/input";
import { Label } from "@shared/ui/shadcn-ui/ui/label";
import { FieldConfig } from "../model/constants";
import { OrderTransferFormInput } from "../model/schema";

interface FormFieldItemProps {
  field: FieldConfig;
  register: UseFormRegister<OrderTransferFormInput>;
  error?: FieldError;
}

export const FormFieldItem = ({
  field,
  register,
  error,
}: FormFieldItemProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={field.id as string}>{field.label}</Label>
      <Input
        id={field.id as string}
        type={field.type}
        step={field.step}
        placeholder={field.placeholder}
        {...register(field.id)}
        className={error ? "border-red-500 focus-visible:ring-red-500" : ""}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};
