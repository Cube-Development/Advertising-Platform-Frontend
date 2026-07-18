import { zodResolver } from "@hookform/resolvers/zod";
import { useAdminPublishOrderMutation } from "@entities/admin";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  useToast,
} from "@shared/ui";
import { useForm } from "react-hook-form";
import { ORDER_PUBLISH_FIELDS } from "../model/constants";
import { OrderPublishFormValues, orderPublishSchema } from "../model/schema";
import { FormFieldItem } from "./FormFieldItem";

export const OrderPublish = () => {
  const { toast } = useToast();
  const [publishOrder] = useAdminPublishOrderMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrderPublishFormValues>({
    resolver: zodResolver(orderPublishSchema),
  });

  const onSubmit = async (data: OrderPublishFormValues) => {
    try {
      await publishOrder({
        order_id: data.order_id,
        url: data.url,
      }).unwrap();
      toast({
        title: "Успех",
        description: "Пост успешно опубликован",
      });
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось опубликовать пост",
      });
    }
  };

  return (
    <div className="w-full flex justify-center items-start p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Публикация поста</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {ORDER_PUBLISH_FIELDS.map((field) => (
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
              {isSubmitting ? "Сохранение..." : "Опубликовать"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
