import { UseFormSetValue } from "react-hook-form";
import { Editor } from "@features/createOrder";
import { CreatePostFormData, ICreatePostForm } from "@entities/project";
import { platformTypesNum } from "@entities/platform";

interface RenderEditorProps {
  platformId: platformTypesNum;
  formState: ICreatePostForm;
  setValue: UseFormSetValue<ICreatePostForm>;
}

export const renderEditor = ({
  platformId,
  formState,
  setValue,
}: RenderEditorProps) => {
  if (formState?.selectedMultiPostId) {
    return formState?.multiposts?.map((post, index) =>
      post?.order_id === formState?.selectedMultiPostId &&
      post?.post_type === formState?.selectedPostType ? (
        <Editor
          key={index}
          setValue={setValue}
          type={CreatePostFormData.multiposts}
          platformId={platformId}
          formState={formState}
        />
      ) : null,
    );
  } else {
    return formState?.posts?.map((post, index) =>
      post?.post_type === formState?.selectedPostType ? (
        <Editor
          key={index}
          setValue={setValue}
          type={CreatePostFormData.posts}
          platformId={platformId}
          formState={formState}
        />
      ) : null,
    );
  }
};
