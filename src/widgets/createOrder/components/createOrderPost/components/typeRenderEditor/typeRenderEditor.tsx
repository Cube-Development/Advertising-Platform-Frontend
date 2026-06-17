import { platformTypesNum } from "@entities/platform";
import { ICreatePostForm, POST } from "@entities/project";
import { FC } from "react";
import { UseFormSetValue } from "react-hook-form";
import { renderEditor } from "./renderEditor";

interface TypeRenderEditorProps {
  formState: ICreatePostForm;
  setValue: UseFormSetValue<ICreatePostForm>;
  disabled?: boolean;
  isStreaming?: boolean;
}

export const TypeRenderEditor: FC<TypeRenderEditorProps> = ({
  formState,
  setValue,
  disabled = false,
  isStreaming = false,
}) => {
  switch (formState.platformFilter?.id) {
    case platformTypesNum.telegram:
      return renderEditor({
        platformId: platformTypesNum.telegram,
        formState,
        setValue,
        disabled,
        isStreaming,
        maxTextLength: POST.TELEGRAM_TEXT_LENGTH,
      });

    case platformTypesNum.instagram:
      return renderEditor({
        platformId: platformTypesNum.instagram,
        formState,
        setValue,
        disabled,
        isStreaming,
      });

    case platformTypesNum.youtube:
      return renderEditor({
        platformId: platformTypesNum.youtube,
        formState,
        setValue,
        disabled,
        isStreaming,
      });

    // case platformTypesNum.site:
    //   return renderEditor({
    //     platformId: platformTypesNum.site,
    //     formState,
    //     setValue,
    //     disabled: true,
    //     placeholder: "Ссылка на сайт",
    //   });

    default:
      return null;
  }
};
