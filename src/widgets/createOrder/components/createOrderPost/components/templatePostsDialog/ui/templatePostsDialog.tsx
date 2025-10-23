import { CloudUpload, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogClose,
  ScrollArea,
  MyButton,
} from "@shared/ui";
import { PostTemplates } from "@features/project";

export const TemplatePostsDialog = () => {
  const { t } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <MyButton
          buttons_type="button__orange"
          className="hover:scale-[1.015] hover:opacity-80 transition-all duration-300 cursor-pointer flex items-center justify-center mobile-xl:ml-2 ml-0 mx-auto"
        >
          <CloudUpload className="mobile-xl:size-6 size-5 stroke-[2px]" />
          <p>{t("create_order.create.template")}</p>
        </MyButton>
      </DialogTrigger>
      <DialogContent className="max-w-[96vw] max-h-[96vh] overflow-hidden md:!p-6 !p-4">
        <DialogDescription className="sr-only"></DialogDescription>
        <DialogTitle className="sr-only"></DialogTitle>
        <DialogClose className="flex items-center justify-end">
          <X className="size-[30px] md:scale-[2] scale-[1.5] rounded-full md:p-2 p-1 bg-white cursor-pointer text-black" />
        </DialogClose>
        <ScrollArea className="max-h-[70vh]">
          <PostTemplates canDelete={false} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
