import type { ReactNode } from "react";

export interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
}
