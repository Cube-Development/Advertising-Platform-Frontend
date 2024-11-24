export enum complaintPriority {
  low = 0,
  medium = 1,
  high = 2,
}

export const adminComplaintPriorityStatus = [
  {
    name: "admin_panel.complaints.card.priority_status.low",
    id: complaintPriority.low,
  },
  {
    name: "admin_panel.complaints.card.priority_status.medium",
    id: complaintPriority.medium,
  },
  {
    name: "admin_panel.complaints.card.priority_status.high",
    id: complaintPriority.high,
  },
];

export enum complaintStatus {
  wait = 0,
  active = 1,
  complete = 2,
}

export const adminComplaintStatus = [
  {
    name: "admin_panel.complaintInfo.card.status.wait",
    id: complaintStatus.wait,
  },
  {
    name: "admin_panel.complaintInfo.card.status.active",
    id: complaintStatus.active,
  },
  {
    name: "admin_panel.complaintInfo.card.status.complete",
    id: complaintStatus.complete,
  },
];

export enum adminComplaintTypesFilter {
  wait = "wait",
  active = "active",
  complete = "complete",
}

export const adminComplaintTypes = [
  {
    name: "admin_panel.complaints.types.wait",
    type: adminComplaintTypesFilter.wait,
  },
  {
    name: "admin_panel.complaints.types.active",
    type: adminComplaintTypesFilter.active,
  },
  {
    name: "admin_panel.complaints.types.complete",
    type: adminComplaintTypesFilter.complete,
  },
];
