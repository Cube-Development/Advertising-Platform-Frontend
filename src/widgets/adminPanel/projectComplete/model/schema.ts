import * as z from "zod";

export const projectCompleteSchema = z.object({
  project_id: z.string().min(1, "Введите ID проекта"),
});

export type ProjectCompleteFormValues = z.infer<typeof projectCompleteSchema>;
