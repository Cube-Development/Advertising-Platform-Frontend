import {
  ENUM_PROJECT_TYPES,
  useCopyAdvProjectMutation,
} from "@entities/project";
import { MoreIcon } from "@shared/assets";
import { ENUM_PATHS } from "@shared/routing";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useToast,
} from "@shared/ui";
import { buildPathWithQuery, queryParamKeys } from "@shared/utils";
import { Loader } from "lucide-react";
import { FC, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface ProjectCardMenuProps {
  project_id: string;
}

export const ProjectCardMenu: FC<ProjectCardMenuProps> = ({ project_id }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [copyAdvProject, { isLoading }] = useCopyAdvProjectMutation();

  const handleTriggerClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
  };

  const handleCopy = async (event: Event): Promise<void> => {
    event.preventDefault();
    if (!project_id || isLoading) return;

    try {
      await copyAdvProject({ project_id }).unwrap();
      toast({
        variant: "success",
        title: t("toasts.orders_advertiser.copy.success"),
      });
      navigate(
        buildPathWithQuery(ENUM_PATHS.ORDERS, {
          [queryParamKeys.projectType]: ENUM_PROJECT_TYPES.SAVED_PROJECT,
        }),
      );
    } catch (error) {
      toast({
        variant: "error",
        title: t("toasts.orders_advertiser.copy.error"),
      });
      console.error("error: ", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="cursor-pointer"
          onClick={handleTriggerClick}
        >
          <MoreIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={4}
        className="!p-0 !rounded-[12px] frame !min-w-[180px] z-50"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="px-3 py-2 text-xs cursor-pointer gap-2 focus:bg-[#f0f0f0]"
            disabled={isLoading}
            onSelect={handleCopy}
          >
            {isLoading && (
              <Loader className="animate-spin" width={16} height={16} />
            )}
            {t("order_btn.copyProject")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
