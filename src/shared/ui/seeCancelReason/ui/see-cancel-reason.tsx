import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  MyButton,
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogDescription,
  AlertDialogAction,
} from "@shared/ui";
import { MessageSquareWarning, X } from "lucide-react";

export const SeeCancelReason: FC<{ reason?: string }> = ({ reason }) => {
  const { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <MyButton
          buttons_type="button__white"
          className="rounded-[8px] text-xs font-semibold leading-none p-[10px] [&>svg]:size-3 [&>svg]:scale-[1.75]"
        >
          <MessageSquareWarning className="mobile-xl:size-5 size-4 stroke-[1.5px]" />
          {t(`offer_btn.see_cancel_reason`)}
        </MyButton>
      </AlertDialogTrigger>
      <AlertDialogContent
        showOverlay={false}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 !left-0 !top-0 !translate-x-0 !translate-y-0 !w-full !h-full !max-w-none !max-h-none !rounded-none !border-0 !shadow-none"
      >
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDialogOpen(false)}
        />
        <div
          className={`relative z-50 bg-transparent shadow-none border-0 grid [grid-template-rows:max-content_1fr_max-content] gap-5 md:h-[50vh] md:w-[50vw] md:max-w-[800px] h-[300px] w-[70vw]`}
        >
          <AlertDialogDescription className="sr-only"></AlertDialogDescription>
          <AlertDialogTitle className="sr-only"></AlertDialogTitle>
          <div className="flex items-center justify-center h-fit relative bg-white rounded-xl p-4">
            <AlertDialogAction
              className="!bg-transparent absolute -right-[60px] -top-8"
              onClick={() => setIsDialogOpen(false)}
            >
              <X
                className={`w-[30px] rounded-full p-2 bg-white cursor-pointer text-black`}
              />
            </AlertDialogAction>
            <div className="overflow-auto h-[300px] text-center mobile-xl:text-sm text-xs font-semibold">
              {reason}
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
