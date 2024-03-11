export enum catalogFilter {
  parameters = "parameters",
  AI = "AI",
}

export const catalogTypes = [
  {
    name: "catalog.search.parameters",
    type: catalogFilter.parameters,
  },
  {
    name: "catalog.search.AI",
    type: catalogFilter.AI,
  },
];
