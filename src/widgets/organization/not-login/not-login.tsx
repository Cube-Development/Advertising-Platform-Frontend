import { LoginModal } from "@features/organization";
import { Building2 } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface INotLoginProps extends React.HTMLAttributes<HTMLDivElement> {}

export const NotLogin: FC<INotLoginProps> = ({
  className = "container",
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <div className={className} {...props}>
      <div className="justify-center page_wrapper h-[50vh] items-center">
        <div className="flex flex-col items-center justify-center space-y-5 text-center md:space-y-10">
          <div className="space-y-2 md:space-y-4">
            <div>
              <Building2
                size={64}
                className="mx-auto mb-4 text-[var(--Personal-colors-main)]"
              />
            </div>

            <h1 className="text-lg md:text-xl  lg:text-2xl font-semibold text-[var(--Personal-colors-black)]">
              {t("organization.not_login.title")}
            </h1>

            <p className="text-sm text-gray-600 md:text-md lg:text-lg">
              {t("organization.not_login.description")}
            </p>
          </div>
          <div>
            <LoginModal open />
          </div>
        </div>
      </div>
    </div>
  );
};
