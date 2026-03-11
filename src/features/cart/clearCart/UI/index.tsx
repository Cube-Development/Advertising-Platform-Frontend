import { TrashBasketIcon } from "@shared/assets";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  MyButton,
  Separator,
  cn,
} from "@shared/ui";
import { CircleX, Trash2 } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const ClearCart: FC = () => {
  const { t } = useTranslation();

  const handleClearCart = () => {
    // TODO: Implement cart clearing logic
    console.log("Clear cart clicked");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <MyButton buttons_type="button__orange" className="p-3">
          <Trash2 className="text-white size-5" />
        </MyButton>
      </AlertDialogTrigger>

      <AlertDialogContent className="gap-4 sm:max-w-lg frame w-[90vw]">
        <AlertDialogHeader className="!text-center mt-4">
          <AlertDialogTitle className="font-semibold text-gray-900 text-md md:text-xl">
            {t("cart.clear.title")}
          </AlertDialogTitle>
          <AlertDialogDescription className="mt-2 text-sm text-gray-600 sm:text-lg">
            {t("cart.clear.description")}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogCancel className="absolute top-0 right-0 p-4 cursor-pointer">
          <CircleX size={20} />
        </AlertDialogCancel>

        <Separator />

        <AlertDialogFooter className="flex flex-col-reverse gap-2 sm:flex-row">
          <AlertDialogCancel asChild>
            <Button onClick={handleClearCart} variant={"outline"}>
              {t("cart.clear.cancel")}
            </Button>
          </AlertDialogCancel>
          <Button
            onClick={handleClearCart}
            className="flex items-center justify-center w-full gap-2 text-white bg-red-600 sm:w-auto hover:bg-red-700 font-semibold"
          >
            {t("cart.clear.confirm")}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
