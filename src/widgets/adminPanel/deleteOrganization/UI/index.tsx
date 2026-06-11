import { zodResolver } from "@hookform/resolvers/zod";
import { useAdminDeleteOrganizationMutation } from "@entities/admin";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  useToast,
} from "@shared/ui";
import { useForm } from "react-hook-form";
import { DELETE_ORGANIZATION_FIELDS } from "../model/constants";
import {
  DeleteOrganizationFormValues,
  deleteOrganizationSchema,
} from "../model/schema";
import { FormFieldItem } from "./FormFieldItem";

export const DeleteOrganization = () => {
  const { toast } = useToast();
  const [deleteOrganization] = useAdminDeleteOrganizationMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DeleteOrganizationFormValues>({
    resolver: zodResolver(deleteOrganizationSchema),
  });

  const onSubmit = async (data: DeleteOrganizationFormValues) => {
    try {
      await deleteOrganization({ email: data.email }).unwrap();
      toast({ title: "Успех", description: "Организация удалена" });
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить организацию",
      });
    }
  };

  return (
    <div className="w-full flex justify-center items-start p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Удаление организации</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {DELETE_ORGANIZATION_FIELDS.map((field) => (
              <FormFieldItem
                key={field.id}
                field={field}
                register={register}
                error={errors[field.id]}
              />
            ))}

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
              variant="destructive"
            >
              {isSubmitting ? "Удаление..." : "Удалить организацию"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
