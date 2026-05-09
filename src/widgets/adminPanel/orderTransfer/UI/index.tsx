import { zodResolver } from '@hookform/resolvers/zod';
import { useAdminUpdateOrderDateMutation } from '@entities/admin';
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@shared/ui';
import { useForm } from 'react-hook-form';
import { ORDER_MAIN_FIELDS, ORDER_TIME_FIELDS } from '../model/constants';
import { OrderTransferFormValues, orderTransferSchema } from '../model/schema';
import { FormFieldItem } from './FormFieldItem';

export const OrderTransfer = () => {
  const { toast } = useToast();
  const [updateOrderDate] = useAdminUpdateOrderDateMutation();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrderTransferFormValues>({
    resolver: zodResolver(orderTransferSchema),
  });

  const onSubmit = async (data: OrderTransferFormValues) => {
    try {
      await updateOrderDate({
        order_ident: Number(data.order_ident),
        order_date: data.order_date,
        time_from: data.time_from,
        time_to: data.time_to,
      }).unwrap();
      toast({ title: "Успех", description: "Ордер успешно перенесен" });
    } catch (error) {
      toast({ title: "Ошибка", description: "Не удалось перенести ордер"});
    }
  };

  return (
    <div className="w-full flex justify-center items-start p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Перенос ордера</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {ORDER_MAIN_FIELDS.map((field) => (
              <FormFieldItem 
                key={field.id} 
                field={field} 
                register={register} 
                error={errors[field.id]} 
              />
            ))}

            <div className="grid grid-cols-2 gap-4">
              {ORDER_TIME_FIELDS.map((field) => (
                <FormFieldItem 
                  key={field.id} 
                  field={field} 
                  register={register} 
                  error={errors[field.id]} 
                />
              ))}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting} variant={"primary"}>
              {isSubmitting ? "Сохранение..." : "Сохранить изменения"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
