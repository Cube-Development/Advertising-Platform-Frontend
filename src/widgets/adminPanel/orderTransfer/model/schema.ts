import * as z from 'zod';

export const orderTransferSchema = z.object({
  order_ident: z.string().min(1, "Введите номер ордера"),
  order_date: z.string().refine((val) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(val);
    selectedDate.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, { message: "Дата должна быть не меньше текущей" }),
  time_from: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/, "Неверный формат времени"),
  time_to: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/, "Неверный формат времени"),
}).superRefine((data, ctx) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selectedDate = new Date(data.order_date);
  selectedDate.setHours(0, 0, 0, 0);

  if (selectedDate.getTime() === today.getTime()) {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    if (data.time_from < currentTime) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['time_from'], message: "Время должно быть не меньше текущего" });
    }
    if (data.time_to < currentTime) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['time_to'], message: "Время должно быть не меньше текущего" });
    }
  }
  
  if (data.time_from >= data.time_to) {
     ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['time_to'], message: "Время 'до' должно быть больше времени 'от'" });
  }
});

export type OrderTransferFormInput = z.input<typeof orderTransferSchema>;
export type OrderTransferFormValues = z.infer<typeof orderTransferSchema>;
