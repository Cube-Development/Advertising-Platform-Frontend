import { UseFormSetValue } from "react-hook-form";
import { Editor } from "@features/createOrder";
import { CreatePostFormData, ICreatePostForm } from "@entities/project";
import { platformTypesNum } from "@entities/platform";

interface RenderEditorProps {
  platformId: platformTypesNum;
  formState: ICreatePostForm;
  setValue: UseFormSetValue<ICreatePostForm>;
  disabled?: boolean;
  isStreaming?: boolean;
  placeholder?: string;
}

export const renderEditor = ({
  platformId,
  formState,
  setValue,
  disabled = false,
  isStreaming = false,
  placeholder,
}: RenderEditorProps) => {
  if (formState?.selectedMultiPostId) {
    return formState?.multiposts?.map((post) =>
      post?.order_id === formState?.selectedMultiPostId &&
      post?.post_type === formState?.selectedPostType ? (
        <Editor
          key={`${post?.platform && post?.platform + post?.post_type}`}
          setValue={setValue}
          type={CreatePostFormData.multiposts}
          platformId={platformId}
          formState={formState}
          disabled={disabled}
          isStreaming={isStreaming}
          placeholder={placeholder}
        />
      ) : null,
    );
  } else {
    return formState?.posts?.map((post) =>
      post?.post_type === formState?.selectedPostType ? (
        <Editor
          key={`${post?.platform && post?.platform + post?.post_type}`}
          setValue={setValue}
          type={CreatePostFormData.posts}
          platformId={platformId}
          formState={formState}
          disabled={disabled}
          isStreaming={isStreaming}
          placeholder={placeholder}
        />
      ) : null,
    );
  }
};
