import { zodResolver } from "@hookform/resolvers/zod";
import { useAdminSwapChannelOwnerMutation } from "@entities/admin";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  useToast,
} from "@shared/ui";
import { useForm } from "react-hook-form";
import { CHANNEL_OWNER_SWAP_FIELDS } from "../model/constants";
import {
  ChannelOwnerSwapFormValues,
  channelOwnerSwapSchema,
} from "../model/schema";
import { FormFieldItem } from "./FormFieldItem";

export const ChannelOwnerSwap = () => {
  const { toast } = useToast();
  const [swapChannelOwner] = useAdminSwapChannelOwnerMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChannelOwnerSwapFormValues>({
    resolver: zodResolver(channelOwnerSwapSchema),
  });

  const onSubmit = async (data: ChannelOwnerSwapFormValues) => {
    try {
      await swapChannelOwner({
        channel_id: data.channel_id,
        owner_email: data.owner_email,
        new_owner_email: data.new_owner_email,
      }).unwrap();
      toast({
        title: "Успех",
        description: "Владелец канала успешно изменён",
      });
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось передать канал",
      });
    }
  };

  return (
    <div className="w-full flex justify-center items-start p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Передача канала</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {CHANNEL_OWNER_SWAP_FIELDS.map((field) => (
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
              {isSubmitting ? "Сохранение..." : "Передать канал"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
