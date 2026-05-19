import { z } from "zod";

export const mailingSchema = z.object({
  subject: z.string().min(1, "Обязательное поле"),
  text: z.string().min(1, "Обязательное поле"),
  role: z.string().min(1, "Обязательное поле"),
  users: z.string().optional().transform((val) => 
    val ? val.split(",").map((u) => u.trim()).filter(Boolean) : []
  ),
});

export type MailingFormInput = z.input<typeof mailingSchema>;
export type MailingFormOutput = z.output<typeof mailingSchema>;
