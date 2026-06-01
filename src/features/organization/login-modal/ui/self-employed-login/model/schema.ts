import { formDataLength } from "@shared/config";
import { isValidPhoneNumber, isValidPNFL } from "@shared/utils";
import { z } from "zod";

const requiredKey = "organization.login.self_employed.errors.required";

export const selfEmployedFormSchema = z.object({
  PNFL: z
    .string()
    .min(1, requiredKey)
    .max(formDataLength.PNFL, "organization.login.self_employed.errors.pinfl")
    .refine(isValidPNFL, "organization.login.self_employed.errors.pinfl"),
  phone: z
    .string()
    .min(1, requiredKey)
    .refine(
      isValidPhoneNumber,
      "organization.login.self_employed.errors.phone",
    ),
  card_number: z
    .string()
    .min(1, requiredKey)
    .max(
      formDataLength.card_number,
      "organization.login.self_employed.errors.card",
    )
    .refine(
      (value) => value.replace(/\D/g, "").length >= 16,
      "organization.login.self_employed.errors.card",
    ),
});

export type SelfEmployedFormValues = z.infer<typeof selfEmployedFormSchema>;
