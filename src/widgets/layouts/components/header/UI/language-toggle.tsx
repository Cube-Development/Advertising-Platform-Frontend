import { useChangeLanguageMutation, useFindLanguage } from "@entities/user";
import { ILanguage, USER_LANGUAGES_LIST } from "@shared/languages";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shared/ui";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const LanguageToggle: FC = () => {
  const { i18n } = useTranslation();
  const currentLang = useFindLanguage();
  const [language, setLanguage] = useState(currentLang);

  useEffect(() => {
    setLanguage(currentLang);
  }, [currentLang]);

  const [changeLanguage] = useChangeLanguageMutation();

  const handleLanguageSelect = (lang: ILanguage) => {
    i18n.changeLanguage(lang.name.toLocaleLowerCase());
    setLanguage(lang);
    changeLanguage({ language: lang.id });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 border rounded-full">
        <img
          src={`/images/${language.icon}.svg`}
          className="w-6 h-6"
          alt="current lang"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="!p-0 !rounded-[12px] frame !min-w-[1rem]"
        align="center"
      >
        <DropdownMenuGroup>
          {USER_LANGUAGES_LIST.map((lang) => (
            <DropdownMenuItem
              key={lang?.id}
              onClick={() => handleLanguageSelect(lang)}
              className="flex items-center gap-2 px-3 py-2 cursor-pointer"
            >
              <img
                src={`/images/${lang.icon}.svg`}
                className="w-6 h-6"
                alt={lang?.name}
              />
              <span>{lang?.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
