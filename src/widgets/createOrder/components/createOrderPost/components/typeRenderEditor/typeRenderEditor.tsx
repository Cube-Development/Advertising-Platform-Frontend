import { platformTypesNum } from "@entities/platform";
import { ICreatePostForm } from "@entities/project";
import { FC } from "react";
import { UseFormSetValue } from "react-hook-form";
import { renderEditor } from "../renderEditor";

interface TypeRenderEditorProps {
  formState: ICreatePostForm;
  setValue: UseFormSetValue<ICreatePostForm>;
}

export const TypeRenderEditor: FC<TypeRenderEditorProps> = ({
  formState,
  setValue,
}) => {
  switch (formState.platformFilter?.id) {
    case platformTypesNum.telegram:
      return renderEditor({
        platformId: platformTypesNum.telegram,
        formState,
        setValue,
      });

    case platformTypesNum.instagram:
      return renderEditor({
        platformId: platformTypesNum.instagram,
        formState,
        setValue,
      });

    case platformTypesNum.youtube:
      return renderEditor({
        platformId: platformTypesNum.youtube,
        formState,
        setValue,
      });

    default:
      return null;
  }
};
