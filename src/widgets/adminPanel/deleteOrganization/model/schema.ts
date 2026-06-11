import * as z from "zod";

export const deleteOrganizationSchema = z.object({
  email: z.string().min(1, "Введите email организации"),
});

export type DeleteOrganizationFormInput = z.input<
  typeof deleteOrganizationSchema
>;
export type DeleteOrganizationFormValues = z.infer<
  typeof deleteOrganizationSchema
>;
