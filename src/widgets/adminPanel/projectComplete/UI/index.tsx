import { zodResolver } from "@hookform/resolvers/zod";
import { useAdminCompleteProjectMutation } from "@entities/admin";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  useToast,
} from "@shared/ui";
import { useForm } from "react-hook-form";
import { PROJECT_COMPLETE_FIELDS } from "../model/constants";
import {
  ProjectCompleteFormValues,
  projectCompleteSchema,
} from "../model/schema";
import { FormFieldItem } from "./FormFieldItem";

export const ProjectComplete = () => {
  const { toast } = useToast();
  const [completeProject] = useAdminCompleteProjectMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectCompleteFormValues>({
    resolver: zodResolver(projectCompleteSchema),
  });

  const onSubmit = async (data: ProjectCompleteFormValues) => {
    try {
      await completeProject({
        project_id: data.project_id,
      }).unwrap();
      toast({
        title: "Успех",
        description: "Проект успешно завершён",
      });
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось завершить проект",
      });
    }
  };

  return (
    <div className="w-full flex justify-center items-start p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Завершение проекта</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {PROJECT_COMPLETE_FIELDS.map((field) => (
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
              variant="primary"
            >
              {isSubmitting ? "Сохранение..." : "Завершить проект"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
