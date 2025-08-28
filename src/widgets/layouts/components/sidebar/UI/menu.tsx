import { FC } from "react";
import { IMenuItem } from "../../header/model";
import { MenuItem } from "./menu-item";
import { useAppDispatch } from "@shared/hooks";
import { setDropDownMenu } from "@shared/slice";
import { useLocation } from "react-router-dom";

interface IMenuProps {
  menu: IMenuItem[];
}

export const Menu: FC<IMenuProps> = ({ menu }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const handleOpenDropdownMenu = (newTitle: string) => {
    document.body.classList.add("sidebar-open");
    const newMenu = { isOpen: true, title: newTitle };
    dispatch(setDropDownMenu(newMenu));
  };

  const getFirstPathSegment = (pathname: string) => {
    const cleanPathname = pathname.split("?")[0].split("#")[0];
    const segments = cleanPathname.split("/").filter(Boolean);
    return segments.length > 0 ? `/${segments[0]}` : "/";
  };

  return (
    <div className="flex flex-col gap-2 p-3">
      {menu.map((item, index) => {
        const currentPathSegment = getFirstPathSegment(location.pathname);
        const menuPathSegment = getFirstPathSegment(item.item.path!);
        const isActive = currentPathSegment === menuPathSegment;
        return (
          <MenuItem
            key={index}
            item={item}
            onOpenDropdownMenu={handleOpenDropdownMenu}
            isActive={isActive}
          />
        );
      })}
    </div>
  );
};
