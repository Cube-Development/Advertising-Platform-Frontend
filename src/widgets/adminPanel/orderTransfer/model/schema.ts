import * as z from 'zod';

export const orderTransferSchema = z.object({
  order_ident: z.string().min(1, "Введите номер ордера"),
  order_date: z.string().min(1, "Укажите дату"),
  time_from: z.string().min(1, "Укажите время"),
  time_to: z.string().min(1, "Укажите время"),
});

export type OrderTransferFormInput = z.input<typeof orderTransferSchema>;
export type OrderTransferFormValues = z.infer<typeof orderTransferSchema>;
