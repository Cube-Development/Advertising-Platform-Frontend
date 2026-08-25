export enum ORGANIZATION_TYPE {
  LEGAL = 1,
  INDIVIDUAL = 2,
}

export const ORGANIZATION_TYPE_LABEL: Record<number, string> = {
  [ORGANIZATION_TYPE.LEGAL]: "track_orders.org_type.legal",
  [ORGANIZATION_TYPE.INDIVIDUAL]: "track_orders.org_type.individual",
};
