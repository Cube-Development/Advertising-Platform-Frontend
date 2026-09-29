import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
} from "@shared/ui";
import { FC, ReactNode } from "react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  pending?: boolean;
  destructive?: boolean;
  children?: ReactNode;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
}

export const ConfirmDialog: FC<ConfirmDialogProps> = ({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel,
  pending,
  destructive,
  children,
  onConfirm,
  onOpenChange,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-[90%] max-w-[400px] gap-5 rounded-[25px] bg-white p-6">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
          {children}
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-2 sm:justify-end">
          <AlertDialogCancel asChild>
            <Button type="button" variant="outline" disabled={pending}>
              {cancelLabel}
            </Button>
          </AlertDialogCancel>
          <Button
            type="button"
            variant={destructive ? "destructive" : "default"}
            disabled={pending}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
