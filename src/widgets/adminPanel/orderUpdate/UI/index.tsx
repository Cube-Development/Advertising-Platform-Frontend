import { zodResolver } from "@hookform/resolvers/zod";
import { useAdminUpdateOrderMutation } from "@entities/admin";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  useToast,
} from "@shared/ui";
import { useForm } from "react-hook-form";
import { ORDER_UPDATE_FIELDS } from "../model/constants";
import { OrderUpdateFormValues, orderUpdateSchema } from "../model/schema";
import { FormFieldItem } from "./FormFieldItem";

export const OrderUpdate = () => {
  const { toast } = useToast();
  const [updateOrder] = useAdminUpdateOrderMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrderUpdateFormValues>({
    resolver: zodResolver(orderUpdateSchema),
  });

  const onSubmit = async (data: OrderUpdateFormValues) => {
    try {
      await updateOrder({
        order_ident: data.order_ident,
        ...(data.amount ? { amount: Number(data.amount) } : {}),
        ...(data.executor ? { executor: data.executor } : {}),
        ...(data.channel_id ? { channel_id: data.channel_id } : {}),
      }).unwrap();
      toast({
        title: "Успех",
        description: "Данные ордера успешно изменены",
      });
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось изменить данные ордера",
      });
    }
  };

  return (
    <div className="w-full flex justify-center items-start p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Изменение ордера</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {ORDER_UPDATE_FIELDS.map((field) => (
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
              {isSubmitting ? "Сохранение..." : "Сохранить изменения"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
