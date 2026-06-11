import * as z from "zod";

export const channelOwnerSwapSchema = z
  .object({
    channel_id: z.string().uuid("Введите корректный UUID канала"),
    owner_email: z.string().min(1, "Введите email текущего владельца"),
    new_owner_email: z.string().min(1, "Введите email нового владельца"),
  })
  .refine((data) => data.owner_email !== data.new_owner_email, {
    message: "Email нового владельца должен отличаться от текущего",
    path: ["new_owner_email"],
  });

export type ChannelOwnerSwapFormInput = z.input<typeof channelOwnerSwapSchema>;
export type ChannelOwnerSwapFormValues = z.infer<typeof channelOwnerSwapSchema>;
