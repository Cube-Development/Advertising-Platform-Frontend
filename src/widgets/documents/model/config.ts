import {
  ENUM_DOCUMENT_STATUS,
  ENUM_DOCUMENT_STATUS_TAB,
  IDocumentTab,
} from "@entities/documents";
import { ArrowDownToLine, ArrowUpFromLine, PencilLine } from "lucide-react";

export const DOCUMENT_STATUS_LIST: IDocumentTab[] = [
  {
    label: "documents_page.tabs.inbox",
    owner: 1,
    icon: ArrowUpFromLine,
    tabStatus: ENUM_DOCUMENT_STATUS_TAB.INBOX,
    status: [],
  },
  {
    label: "documents_page.tabs.outbox",
    owner: 0,
    icon: ArrowDownToLine,
    tabStatus: ENUM_DOCUMENT_STATUS_TAB.OUTBOX,
    status: [],
  },
  {
    label: "documents_page.tabs.draft",
    owner: 1,
    icon: PencilLine,
    tabStatus: ENUM_DOCUMENT_STATUS_TAB.DRAFTS,
    status: [ENUM_DOCUMENT_STATUS.CREATED, ENUM_DOCUMENT_STATUS.DRAFT_DELETED],
  },
];
