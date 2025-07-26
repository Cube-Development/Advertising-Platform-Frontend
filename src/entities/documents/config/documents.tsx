import {
  AlertTriangle,
  Ban,
  CheckCheck,
  Clock,
  FilePen,
  Hourglass,
  PackageCheck,
  Pencil,
  RotateCcw,
  Send,
  ShieldCheck,
  ShieldX,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  Undo2,
  XCircle,
} from "lucide-react";
import { ENUM_DOCUMENT_STATUS, ENUM_DOCUMENT_TYPE } from "../types";

export const DOCUMENT_STATUS_META: Record<
  ENUM_DOCUMENT_STATUS,
  {
    label: string;
    icon: JSX.Element;
    color: string; // Tailwind-классы для бейджа
  }
> = {
  [ENUM_DOCUMENT_STATUS.CREATED]: {
    label: "Черновик",
    icon: <FilePen />,
    color: "text-gray-700 bg-gray-100",
  },
  [ENUM_DOCUMENT_STATUS.SIGNAED_SELF]: {
    label: "Ожидает подписи партнера",
    icon: <Clock />,
    color: "text-yellow-700 bg-yellow-100",
  },
  [ENUM_DOCUMENT_STATUS.SIGNED_PARTY]: {
    label: "Ожидает вашей подписи",
    icon: <Pencil />,
    color: "text-yellow-700 bg-yellow-100",
  },
  [ENUM_DOCUMENT_STATUS.SIGNED]: {
    label: "Подписан",
    icon: <CheckCheck />,
    color: "text-green-700 bg-green-100",
  },
  [ENUM_DOCUMENT_STATUS.REJECTED]: {
    label: "Отказ от подписи",
    icon: <Ban />,
    color: "text-red-700 bg-red-100",
  },
  [ENUM_DOCUMENT_STATUS.DELETED]: {
    label: "Удален",
    icon: <Trash2 />,
    color: "text-red-500 bg-red-100",
  },
  [ENUM_DOCUMENT_STATUS.DRAFT_DELETED]: {
    label: "Черновик удален",
    icon: <Trash2 />,
    color: "text-red-500 bg-red-100",
  },
  [ENUM_DOCUMENT_STATUS.WAIT_FOR_AGENT_SIGN]: {
    label: "Ожидает подписи агента",
    icon: <ShieldX />,
    color: "text-blue-700 bg-blue-100",
  },
  [ENUM_DOCUMENT_STATUS.SIGNED_BY_AGENT]: {
    label: "Подписан доверенным лицом",
    icon: <ShieldCheck />,
    color: "text-green-700 bg-green-100",
  },
  [ENUM_DOCUMENT_STATUS.NOT_VALID]: {
    label: "Недействительный",
    icon: <AlertTriangle />,
    color: "text-red-700 bg-red-100",
  },
  [ENUM_DOCUMENT_STATUS.PARTNER_WAIT_FOR_AGENT_SIGN]: {
    label: "Ожидает подписи агента (партнер)",
    icon: <Hourglass />,
    color: "text-blue-700 bg-blue-100",
  },
  [ENUM_DOCUMENT_STATUS.CONSIGNOR_SENT]: {
    label: "Отправлено",
    icon: <Send />,
    color: "text-blue-700 bg-blue-100",
  },
  [ENUM_DOCUMENT_STATUS.CONSIGNOR_CANCELED]: {
    label: "Отменено",
    icon: <XCircle />,
    color: "text-red-700 bg-red-100",
  },
  [ENUM_DOCUMENT_STATUS.RESPONSIBLE_PERSON_REJECTED]: {
    label: "Отказано (отв. лицом)",
    icon: <ThumbsDown />,
    color: "text-red-700 bg-red-100",
  },
  [ENUM_DOCUMENT_STATUS.RESPONSIBLE_PERSON_ACCEPTED]: {
    label: "Принято (отв. лицом)",
    icon: <ThumbsUp />,
    color: "text-green-700 bg-green-100",
  },
  [ENUM_DOCUMENT_STATUS.RESPONSIBLE_PERSON_TILL_RETURNED]: {
    label: "Груз возвращен (отв. лицом)",
    icon: <Undo2 />,
    color: "text-orange-700 bg-orange-100",
  },
  [ENUM_DOCUMENT_STATUS.RESPONSIBLE_PERSON_GIVEN]: {
    label: "Доставлено получателю",
    icon: <PackageCheck />,
    color: "text-green-700 bg-green-100",
  },
  [ENUM_DOCUMENT_STATUS.RESPONSIBLE_PERSON_RETURNED]: {
    label: "Груз возвращен (отв. лицом)",
    icon: <RotateCcw />,
    color: "text-orange-700 bg-orange-100",
  },
};

export const DOCUMENT_TYPE_META: Record<ENUM_DOCUMENT_TYPE, string> = {
  [ENUM_DOCUMENT_TYPE.INVOICE_UNUSED]: "Счёт-фактура (не используется)",
  [ENUM_DOCUMENT_TYPE.INVOICE_NO_ACT]: "Счёт-фактура без акта",
  [ENUM_DOCUMENT_TYPE.INVOICE_PHARM]: "Счёт-фактура (ФАРМ)",
  [ENUM_DOCUMENT_TYPE.WAYBILL]: "Товарно-транспортная накладная (ТТН)",
  [ENUM_DOCUMENT_TYPE.WORK_ACT]: "Акт выполненных работ",
  [ENUM_DOCUMENT_TYPE.POWER_OF_ATTORNEY]: "Доверенность",
  [ENUM_DOCUMENT_TYPE.CONTRACT_GNK]: "Договор (ГНК)",
  [ENUM_DOCUMENT_TYPE.CUSTOM_DOCUMENT]: "Произвольный документ",
  [ENUM_DOCUMENT_TYPE.RECONCILIATION_ACT]: "Акт сверки",
  [ENUM_DOCUMENT_TYPE.ACCEPTANCE_ACT]: "Акт приёма-передачи",
  [ENUM_DOCUMENT_TYPE.MULTILATERAL_CUSTOM_DOCUMENT]:
    "Многосторонний произвольный документ",
  [ENUM_DOCUMENT_TYPE.FOUNDERS_PROTOCOL]: "Протокол собрания учредителей",
};

export const NO_SIGN_DOCUMENT_LIST: ENUM_DOCUMENT_STATUS[] = [
  ENUM_DOCUMENT_STATUS.SIGNED,
  ENUM_DOCUMENT_STATUS.SIGNAED_SELF,
  ENUM_DOCUMENT_STATUS.DELETED,
  ENUM_DOCUMENT_STATUS.DRAFT_DELETED,
];
