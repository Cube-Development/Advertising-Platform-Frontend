import {
  ENUM_DOCUMENT_STATUS,
  ENUM_DOCUMENT_STATUS_TAB,
  ENUM_DOCUMENT_TYPE,
} from "@entities/documents";
import { LucideIcon } from "lucide-react";

export interface IDocumentTab {
  label: string;
  owner?: 0 | 1;
  icon: LucideIcon;
  status?: ENUM_DOCUMENT_STATUS[];
  docType?: ENUM_DOCUMENT_TYPE | null;
}
