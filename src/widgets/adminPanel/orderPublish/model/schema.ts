import * as z from "zod";

export const orderPublishSchema = z.object({
  order_id: z.string().min(1, "Введите ID ордера"),
  url: z.string().min(1, "Введите ссылку"),
});

export type OrderPublishFormValues = z.infer<typeof orderPublishSchema>;
