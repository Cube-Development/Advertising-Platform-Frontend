import {
  ENUM_DOCUMENT_STATUS,
  ENUM_DOCUMENT_STATUS_TAB,
} from "@entities/documents";
import { LucideIcon } from "lucide-react";

export interface IDocumentTab {
  label: string;
  owner?: 0 | 1;
  icon: LucideIcon;
  tabStatus: ENUM_DOCUMENT_STATUS_TAB;
  status: ENUM_DOCUMENT_STATUS[];
}
