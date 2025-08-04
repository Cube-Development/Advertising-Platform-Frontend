import { ENUM_DOCUMENT_STATUS, ENUM_DOCUMENT_TYPE } from "@entities/documents";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  FileClock,
  FilePen,
  FilePlus2,
  Files,
  FileSignature,
  FileStack,
  PencilLine,
  ScrollText,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { IDocumentTab } from "./types";

export const DOCUMENT_STATUS_LIST: IDocumentTab[] = [
  {
    label: "admin_panel.documents.tabs.category.type.draft",
    owner: 1,
    icon: PencilLine,
    status: [ENUM_DOCUMENT_STATUS.CREATED, ENUM_DOCUMENT_STATUS.DRAFT_DELETED],
  },
  {
    label: "admin_panel.documents.tabs.category.type.inbox",
    owner: 1,
    icon: ArrowUpFromLine,
    status: [],
  },
  {
    label: "admin_panel.documents.tabs.category.type.outbox",
    owner: 0,
    icon: ArrowDownToLine,
    status: [],
  },
];

export const DOCUMENT_OPTIONS = ({ LIST }: { LIST: IDocumentTab[] }) => {
  const { t } = useTranslation();
  return LIST.map((item, index) => {
    return {
      name: t(item.label),
      id: index,
      img: item.icon,
    };
  });
};

export const DOCUMENT_TYPE_LIST: IDocumentTab[] = [
  {
    label: "admin_panel.documents.tabs.type.type.all",
    docType: null,
    icon: FileStack,
  },
  {
    label: "admin_panel.documents.tabs.type.type.custom_document",
    docType: ENUM_DOCUMENT_TYPE.CUSTOM_DOCUMENT,
    icon: ScrollText,
  },
  {
    label: "admin_panel.documents.tabs.type.type.invoice",
    docType: ENUM_DOCUMENT_TYPE.INVOICE_NO_ACT,
    icon: Files,
  },
  {
    label: "admin_panel.documents.tabs.type.type.work_act",
    docType: ENUM_DOCUMENT_TYPE.WORK_ACT,
    icon: FilePlus2,
  },
];

export const DOCUMENT_SIGNATURE_LIST: IDocumentTab[] = [
  {
    label: "admin_panel.documents.tabs.signature.type.all",
    icon: PencilLine,
    status: [],
  },
  {
    label: "admin_panel.documents.tabs.signature.type.signed",
    icon: FileSignature,
    status: [ENUM_DOCUMENT_STATUS.SIGNED],
  },
  {
    label: "admin_panel.documents.tabs.signature.type.signed_party",
    icon: FilePen,
    status: [ENUM_DOCUMENT_STATUS.SIGNED_PARTY],
  },
  {
    label: "admin_panel.documents.tabs.signature.type.signed_self",
    icon: FileClock,
    status: [ENUM_DOCUMENT_STATUS.SIGNAED_SELF],
  },
];

export const SIGN_STATUS_LIST = Array.from(
  new Set(DOCUMENT_SIGNATURE_LIST.flatMap((item) => item.status)),
);
