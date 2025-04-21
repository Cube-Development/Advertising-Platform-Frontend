export enum ADMIN_REVIEW_STATUS {
  WAIT = 0,
  ACCEPT = 1,
}

export const ADMIN_REVIEW_BAR_FILTER = [
  {
    name: "admin_panel.reviews.types.wait",
    type: ADMIN_REVIEW_STATUS.WAIT,
  },
  {
    name: "admin_panel.reviews.types.accept",
    type: ADMIN_REVIEW_STATUS.ACCEPT,
  },
];

export enum ADMIN_REVIEW_FORM {
  PAGE = "page",
  STATUS = "status",
}
