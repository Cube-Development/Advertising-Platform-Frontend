import React from "react";
import {
  UserPlus,
  Magnifer,
  Wallet,
  Smartphone,
  Chart2,
} from "@solar-icons/react";
import type { WorkflowStep } from "./types";

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 1,
    title: "main_advertiser.workflow.steps.0.title",
    description: "main_advertiser.workflow.steps.0.description",
    icon: React.createElement(UserPlus, { size: 24 }),
  },
  {
    id: 2,
    title: "main_advertiser.workflow.steps.1.title",
    description: "main_advertiser.workflow.steps.1.description",
    icon: React.createElement(Magnifer, { size: 24 }),
  },
  {
    id: 3,
    title: "main_advertiser.workflow.steps.2.title",
    description: "main_advertiser.workflow.steps.2.description",
    icon: React.createElement(Wallet, { size: 24 }),
  },
  {
    id: 4,
    title: "main_advertiser.workflow.steps.3.title",
    description: "main_advertiser.workflow.steps.3.description",
    icon: React.createElement(Smartphone, { size: 24 }),
  },
  {
    id: 5,
    title: "main_advertiser.workflow.steps.4.title",
    description: "main_advertiser.workflow.steps.4.description",
    icon: React.createElement(Chart2, { size: 24 }),
  },
];
