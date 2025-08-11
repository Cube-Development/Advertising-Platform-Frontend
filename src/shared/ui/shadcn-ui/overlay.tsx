import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@shared/ui";

import { useIsMobile } from "../hooks/use-mobile";

export function useResponsiveOverlay() {
  const isMobile = useIsMobile();

  const components = isMobile
    ? {
        OverlayRoot: Drawer,
        OverlayTrigger: DrawerTrigger,
        OverlayContent: DrawerContent,
        OverlayHeader: DrawerHeader,
        OverlayTitle: DrawerTitle,
        OverlayDescription: DrawerDescription,
        OverlayFooter: DrawerFooter,
        OverlayClose: DrawerClose,
      }
    : {
        OverlayRoot: Dialog,
        OverlayTrigger: DialogTrigger,
        OverlayContent: DialogContent,
        OverlayHeader: DialogHeader,
        OverlayTitle: DialogTitle,
        OverlayDescription: DialogDescription,
        OverlayFooter: DialogFooter,
        OverlayClose: DialogClose,
      };

  return components;
}
