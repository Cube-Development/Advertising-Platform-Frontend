import {
  ArrowRightLeft,
  Bell,
  CheckCircle,
  CircleAlert,
  CircleCheckBig,
  CreditCard,
  DollarSign,
  FileText,
  Shield,
  Wallet,
} from "lucide-react";
import { IGuideStep, IGuideSubstep } from "./types";

export const GUIDE_TOPUP_STEPS_LIST: Pick<IGuideStep, "icon" | "color">[] = [
  {
    icon: <Shield className="w-5 h-5 text-blue-600" />,
    color: "blue",
  },
  {
    icon: <DollarSign className="w-5 h-5 text-green-600" />,
    color: "green",
  },
  {
    icon: <FileText className="w-5 h-5 text-purple-600" />,
    color: "purple",
  },
  {
    icon: <CreditCard className="w-5 h-5 text-orange-600" />,
    color: "orange",
  },
  {
    icon: <CheckCircle className="w-5 h-5 text-emerald-600" />,
    color: "emerald",
  },
  {
    icon: <Bell className="w-5 h-5 text-indigo-600" />,
    color: "indigo",
  },
];

export const GUIDE_WITHDRAW_STEPS_LIST: (Pick<IGuideStep, "icon" | "color"> & {
  substeps?: Pick<IGuideSubstep, "icon" | "color">[];
})[] = [
  {
    icon: <Wallet className="w-5 h-5 text-blue-600" />,
    color: "blue",
    substeps: [
      {
        icon: <CircleAlert className="w-4 h-4 text-orange-600" />,
        color: "orange",
      },
      {
        icon: <CircleCheckBig className="w-4 h-4 text-green-600" />,
        color: "green",
      },
    ],
  },
  {
    icon: <Shield className="w-5 h-5 text-purple-600" />,
    color: "purple",
  },
  {
    icon: <DollarSign className="w-5 h-5 text-green-600" />,

    color: "green",
  },
  {
    icon: <ArrowRightLeft className="w-5 h-5 text-orange-600" />,

    color: "orange",
  },
  {
    icon: <Bell className="w-5 h-5 text-indigo-600" />,
    color: "indigo",
  },
];
