export enum adminReviewTypesFilter {
  wait = "wait",
  accept = "accept",
}

export const adminReviewTypes = [
  {
    name: "admin_panel.reviews.types.wait",
    type: adminReviewTypesFilter.wait,
  },
  {
    name: "admin_panel.reviews.types.accept",
    type: adminReviewTypesFilter.accept,
  },
];
