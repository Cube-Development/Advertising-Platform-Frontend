import * as z from "zod";

export const orderUpdateSchema = z.object({
  order_ident: z.string().min(1, "Введите ID ордера"),
  amount: z.string().optional(),
  executor: z.string().optional(),
});

export type OrderUpdateFormValues = z.infer<typeof orderUpdateSchema>;
