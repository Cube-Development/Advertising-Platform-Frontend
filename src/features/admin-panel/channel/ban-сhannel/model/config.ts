import { formatFullDate, isValidFullDate } from "@shared/utils";

export const REASON_VALIDATE = {
  validate: {
    required: "admin_panel.channels.card.ban.reason.error.required",
  },
};

export const DATE_VALIDATE = {
  validate: {
    required: "admin_panel.channels.card.ban.date.error.required",
    validate: {
      valid: (value: string) =>
        isValidFullDate(value) ||
        "admin_panel.channels.card.ban.date.error.required",
    },
    onChange: formatFullDate,
  },
};
