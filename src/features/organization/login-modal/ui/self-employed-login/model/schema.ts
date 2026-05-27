import { formDataLength } from "@shared/config";
import { isValidPhoneNumber, isValidPNFL } from "@shared/utils";
import { z } from "zod";

const ERRORS = {
  required: "organization.login.self_employed.errors.required",
  pinfl: "organization.login.self_employed.errors.pinfl",
  phone: "organization.login.self_employed.errors.phone",
  card: "organization.login.self_employed.errors.card",
} as const;

// const CARD_NUMBER_LENGTH = 16;

export const selfEmployedFormSchema = z.object({
  PNFL: z
    .string()
    .min(1, ERRORS.required)
    .length(formDataLength.PNFL, ERRORS.pinfl)
    .refine(isValidPNFL, ERRORS.pinfl),

  phone: z
    .string()
    .min(1, ERRORS.required)
    .refine(isValidPhoneNumber, ERRORS.phone),

  // card_number: z
  //   .string()
  //   .min(1, ERRORS.required)
  //   .refine(
  //     (value) => value.replace(/\D/g, "").length === CARD_NUMBER_LENGTH,
  //     ERRORS.card,
  //   ),
});

export type SelfEmployedFormValues = z.infer<typeof selfEmployedFormSchema>;
