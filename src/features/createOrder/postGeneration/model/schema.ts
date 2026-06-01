import { z } from "zod";
import { EGenerationLanguage } from "@entities/postGeneration";

export const postGenerationSchema = z.object({
  business_name: z
    .string({
      message: "create_order.generation.errors.business_name_required",
    })
    .trim()
    .min(1, "create_order.generation.errors.business_name_required"),
  niche: z
    .string({ message: "create_order.generation.errors.niche_required" })
    .trim()
    .min(1, "create_order.generation.errors.niche_required"),
  offer: z.string().trim().optional().default(""),
  link: z.string().trim().optional().default(""),
  language: z.nativeEnum(EGenerationLanguage),
});

export type PostGenerationFormInput = z.input<typeof postGenerationSchema>;
export type PostGenerationFormOutput = z.output<typeof postGenerationSchema>;
