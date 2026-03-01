import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { FOOTER_NAV_ITEMS } from "./config";
import { Link, useLocation } from "react-router-dom";
import {
  LineInstagramIcon,
  LineTelegramIcon,
  LocationIcon,
} from "@shared/assets";
import { ENUM_PATHS } from "@shared/routing";
import { useBackendErrors } from "@shared/api/errorStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shared/ui/shadcn-ui/ui/accordion";
import { ChevronDown } from "lucide-react";
import { useToast } from "@shared/ui";

export const Footer: FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const pathname = useLocation();
  const errors = useBackendErrors();
  const isCreateOrderPage =
    pathname.pathname === ENUM_PATHS.CREATE_ORDER || false;

  const isProjectPage = pathname.pathname.startsWith("/project/") || false;

  const handleCopyError = (error: any) => {
    navigator.clipboard.writeText(JSON.stringify(error, null, 2));
    toast({
      variant: "success",
      title: "Error details copied to clipboard",
    });
  };

  return (
    <footer
      className={`${styles.wrapper} ${isCreateOrderPage && styles.create_order_bg} relative`}
    >
      <section className="container">
        {isProjectPage ? (
          <div className="text-center md:text-base text-sm font-semibold tracking-wider text-white">
            Created by Blogix
          </div>
        ) : (
          <>
            <div className={styles.results__wrapper}>
              <div className={styles.logo}>Blogix</div>
              <div className={styles.results}>
                {/* ... existing code ... */}
              </div>
            </div>
            <div className={styles.content}>
              {/* ... existing navigation and contacts ... */}
              <div className={styles.nav}>
                {FOOTER_NAV_ITEMS.map((block, index) => (
                  <div key={index} className={styles.nav__block}>
                    <h4>{t(`${block.name}`)}</h4>
                    <ul>
                      {block.items.map((item, index) => (
                        <Link to={item.path} key={index}>
                          {t(`${item.name}`)}
                        </Link>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className={styles.contacts}>
                <div className={styles.contacts__item}>
                  <h4 className="!underline">
                    <Link to="https://t.me/blogix_support" target="_blank">
                      {t("footer.contacts.advertiser_contact")}
                    </Link>
                  </h4>
                  <p>{t("footer.contacts.advertiser_title")}</p>
                </div>
                <div className={styles.contacts__item}>
                  <h4 className="!underline">
                    <Link
                      to="https://t.me/blogix_support_bloggers"
                      target="_blank"
                    >
                      {t("footer.contacts.blogger_contact")}
                    </Link>
                  </h4>
                  <p>{t("footer.contacts.blogger_title")}</p>
                </div>
                <div className={styles.contacts__item}>
                  <h4 className="!underline">
                    <Link to="https://t.me/blogix_support" target="_blank">
                      {t("footer.contacts.cooperation_contact")}
                    </Link>
                  </h4>
                  <p>{t("footer.contacts.cooperation_title")}</p>
                </div>
                <div className={styles.contacts__item}>
                  <h4 className="!underline">
                    <Link to="https://t.me/blogix_support" target="_blank">
                      {t("footer.contacts.email")}
                    </Link>
                  </h4>
                  <p>{t("footer.contacts.email_title")}</p>
                </div>
                <div className={styles.contacts__address}>
                  <div>
                    <LocationIcon />
                  </div>
                  <p>{t("footer.contacts.address")}</p>
                  <div>
                    <LineInstagramIcon />
                  </div>
                  <div>
                    <LineTelegramIcon />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <div className={styles.all_rights}>{t("footer.all_rights")}</div>

        {/* Debug Overlay - Now in flux, expanding footer height */}
        {errors.length > 0 && (
          <div className="mt-4 pt-4 border-t border-white/10 w-full">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="debug" className="border-none">
                <AccordionTrigger className="py-2 hover:no-underline flex justify-center opacity-30 hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white">
                    <span>Debug Logs</span>
                    <ChevronDown className="h-3 w-3 transition-transform duration-200" />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white pt-2 overflow-auto text-[10px] space-y-3">
                  {errors.map((error, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleCopyError(error)}
                      className="bg-black/40 p-3 rounded-lg border border-white/5 cursor-pointer hover:bg-black/60 transition-colors"
                      title="Click to copy full error info"
                    >
                      <div className="flex justify-between items-start mb-2 font-bold">
                        <span className="text-red-400 px-1.5 py-0.5 bg-red-400/10 rounded">
                          HTTP {error.status}
                        </span>
                        <span className="opacity-50">{error.time}</span>
                      </div>
                      <div className="break-all opacity-60 mb-2 font-mono">
                        {error.url}
                      </div>

                      {error.params && (
                        <div className="mb-2 p-1.5 bg-white/5 rounded border-l-2 border-blue-400">
                          <span className="font-bold opacity-50 block mb-1">
                            QUERY:
                          </span>
                          <div className="break-all font-mono opacity-80">
                            {JSON.stringify(error.params)}
                          </div>
                        </div>
                      )}

                      {error.body && (
                        <div className="mb-2 p-1.5 bg-white/5 rounded border-l-2 border-purple-400">
                          <span className="font-bold opacity-50 block mb-1">
                            BODY:
                          </span>
                          <div className="break-all font-mono opacity-80">
                            {JSON.stringify(error.body)}
                          </div>
                        </div>
                      )}

                      <div className="p-1.5 bg-red-400/5 rounded border-l-2 border-red-400 mt-2">
                        <span className="font-bold opacity-50 block mb-1">
                          RESPONSE:
                        </span>
                        <div className="break-all text-white/90 whitespace-pre-wrap">
                          {error.message}
                        </div>
                      </div>

                      <div className="mt-2 p-1.5 bg-white/5 rounded border-l-2 border-gray-400">
                        <span className="font-bold opacity-50 block mb-1">
                          RAW ERROR:
                        </span>
                        <div className="break-all font-mono opacity-60">
                          {JSON.stringify(error.raw)}
                        </div>
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </section>
    </footer>
  );
};
