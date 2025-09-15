import { formatFullDate, isValidFullDate } from "@shared/utils";

export const REASON_VALIDATE = {
  validate: {
    required: "admin_panel.channels.card.reject.reason.error.required",
  },
};

export const DATE_VALIDATE = {
  validate: {
    required: "admin_panel.channels.card.reject.date.error.required",
    validate: {
      valid: (value: string) =>
        isValidFullDate(value) ||
        "admin_panel.channels.card.reject.date.error.required",
    },
    onChange: formatFullDate,
  },
};
