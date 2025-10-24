import { platformTypesNum, PostTypesNum } from "@entities/platform";
import { IPostTemplate } from "@entities/project";

export interface CreateTemplateFormData extends IPostTemplate {
  platform: platformTypesNum;
  post_type: PostTypesNum;
  localMedia?: File[];
  localFiles?: File[];
}
