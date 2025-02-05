import {
  FILES,
  tarifData,
  TarifParameters,
  usePostBuyTarifMutation,
} from "@entities/project";
import { IBuyTarif } from "@entities/project/types/turnkey";
import {
  AddFileIcon,
  HandshakeIcon2,
  SadSmileIcon,
  TrashBasketIcon,
  YesIcon,
} from "@shared/assets";
import { useAppSelector } from "@shared/hooks";
import { formatFileSize, ScrollArea, ToastAction, useToast } from "@shared/ui";
import { AnimatePresence, motion } from "framer-motion";
import { FileIcon, InfoIcon } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { paths } from "@shared/routing";

interface BuySidebarProps {
  isOpen: boolean;
  onChange: (tarif: number | null, toggle: boolean) => void;
  tarif: number;
}

export const BuySidebar: FC<BuySidebarProps> = ({
  isOpen,
  onChange,
  tarif,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [buyTarif] = usePostBuyTarifMutation();
  const menuRef = useRef<HTMLDivElement>(null);
  const [url, setUrl] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [isTarifBought, setIsTarifBought] = useState<boolean>(false);

  const tarifPrice =
    TarifParameters.find((item) => item.index === tarif)?.price || 0;
  const { balance } = useAppSelector((state) => state.wallet);
  const [isHaveBalance, setIsHaveBalance] = useState<boolean>(
    tarifPrice <= balance,
  );

  const { setValue, watch } = useForm<IBuyTarif>({
    defaultValues: {
      tariff_ident: tarif,
      comment: "",
      links: [],
      attached_files: [],
    },
  });
  const formState = watch();

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      onChange(null, false);
    }
  };

  useEffect(() => {
    // document.addEventListener("click", handleClickOutside);
    if (isOpen) {
      document.body.classList.add("sidebar-open-2");
    } else {
      document.body.classList.remove("sidebar-open-2");
    }
    return () => {
      document.body.classList.remove("sidebar-open-2");
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const divVariants = {
    close: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: "0%" },
    transition: { transition: { duration: 0.25 } },
  };

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const comment = e.target.value;
    setValue(tarifData.comment, comment);
  };

  const handleChangeUrl = () => {
    if (url) {
      formState.links.push(url);
      setUrl("");
    }
  };

  const handleDeleteUrl = (urlDelete: string) => {
    formState.links = formState.links.filter((url) => url !== urlDelete);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFiles([...e.target.files]);
      // onChange([...e.target.files]);
    }
  };

  const handleReset = () => {
    setFiles([]);
  };

  const handleDrag = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(true);
  };

  const handleLive = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = function (e: React.DragEvent<HTMLInputElement>) {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles([...e.dataTransfer.files]);
    }
  };

  const handleRemoveFile = (file: File) => {
    setFiles(files.filter((item) => item !== file));
  };

  const handleSubmit = () => {
    if (
      formState.attached_files.length ||
      formState.comment ||
      formState.links.length
    ) {
      buyTarif(formState)
        .unwrap()
        .then(() => {
          toast({
            variant: "success",
            title: t("toasts.turnkey.success"),
          });
          setIsTarifBought(true);
        })
        .catch((error) => {
          toast({
            variant: "error",
            title: t("toasts.turnkey.error"),
            action: <ToastAction altText="Ok">Ok</ToastAction>,
          });
          console.error("error: ", error);
        });
    }
  };

  return (
    <div className={styles.wrapper}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial="close"
            animate="open"
            exit="close"
            transition={divVariants.transition}
            className={styles.menu__wrapper}
            variants={divVariants}
          >
            <div className={styles.menu}>
              {!isTarifBought && isHaveBalance ? (
                <>
                  <div className={styles.menu__top}>
                    <p>{t("turnkey.chain.have_balance.title")}</p>
                    <button onClick={() => onChange(null, false)}>
                      <div className={styles.close__icon} />
                    </button>
                  </div>
                  <ScrollArea>
                    <div className={`${styles.menu__content}`}>
                      <div className={styles.menu__block}>
                        <div className={styles.text}>
                          <p>{t("turnkey.chain.have_balance.comment.title")}</p>
                          <span>
                            {t("turnkey.chain.have_balance.comment.text")}
                          </span>
                        </div>
                        <textarea
                          id="input"
                          // value={description}
                          rows={10}
                          onChange={handleChangeComment}
                          maxLength={1000}
                          placeholder={t(
                            "turnkey.chain.have_balance.comment.value",
                          )}
                        />
                      </div>
                      <div className={styles.menu__block}>
                        <div className={styles.text}>
                          <p>{t("turnkey.chain.have_balance.url.title")}</p>
                          <span>
                            {t("turnkey.chain.have_balance.url.text")}
                          </span>
                        </div>
                        <div className={styles.menu__url_add}>
                          <input
                            placeholder={t(
                              "turnkey.chain.have_balance.url.value",
                            )}
                            onChange={(e) => {
                              setUrl(e.target.value);
                            }}
                            value={url}
                          />
                          <button onClick={handleChangeUrl}>
                            <p>{t("turnkey.chain.have_balance.url.button")}</p>
                          </button>
                        </div>
                        {formState.links.length !== 0 && (
                          <div className={styles.menu__all_url}>
                            {formState.links.map((url, index) => (
                              <div key={index} className={styles.url__row}>
                                <div className={styles.url__text}>
                                  <p>№ {index + 1}</p>
                                  <span>{url}</span>
                                </div>
                                <button onClick={() => handleDeleteUrl(url)}>
                                  <TrashBasketIcon />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className={styles.menu__block}>
                        <div className={styles.text}>
                          <p>{t("turnkey.chain.have_balance.file.title")}</p>
                          <span>
                            {t("turnkey.chain.have_balance.file.text")}
                          </span>
                        </div>
                        <div
                          className={`${styles.files__wrapper} ${dragActive ? styles.drag : ""}`}
                          onReset={handleReset}
                          onDragEnter={handleDrag}
                          onDragOver={handleDrag}
                          onDragLeave={handleLive}
                          onDrop={handleDrop}
                        >
                          {files.length === FILES.maxLenght ? (
                            <div className={styles.items}>
                              {files.map((file, id) => (
                                <div key={id} className={styles.item}>
                                  <div className={styles.item__left}>
                                    <FileIcon />

                                    <div className={styles.item__text}>
                                      <p>{file?.name}</p>
                                      <span>{formatFileSize(file?.size)}</span>
                                    </div>
                                  </div>
                                  <div className={styles.item__right}>
                                    <YesIcon />
                                    <button
                                      onClick={() => handleRemoveFile(file)}
                                    >
                                      <TrashBasketIcon />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <>
                              <div className={styles.top}>
                                <div className={styles.logo}>
                                  <AddFileIcon />
                                </div>
                                <div className={styles.text}>
                                  <p>
                                    {t("turnkey.chain.have_balance.file.value")}
                                  </p>
                                  <label className={styles.button}>
                                    <span>
                                      {t(
                                        "turnkey.chain.have_balance.file.button",
                                      )}
                                    </span>
                                    <input
                                      type="file"
                                      multiple={true}
                                      onChange={handleChange}
                                      accept=".doc, .docx, .zip, .pdf, .xls, .xlsx, .txt"
                                    />
                                  </label>
                                </div>
                              </div>
                              <div className={styles.bottom}>
                                <div className={styles.bottom__column}>
                                  <div className={styles.logo}>
                                    <InfoIcon />
                                  </div>
                                </div>
                                <div className={styles.bottom__column}>
                                  <div className={styles.file}>
                                    <p>
                                      {t(
                                        "turnkey.chain.have_balance.file.formats.title",
                                      )}
                                    </p>
                                    <span>
                                      {t(
                                        "turnkey.chain.have_balance.file.formats.text",
                                      )}
                                    </span>
                                  </div>
                                  <div className={styles.size}>
                                    <p>
                                      {t(
                                        "turnkey.chain.have_balance.file.size.title",
                                      )}
                                    </p>
                                    <span>
                                      {t(
                                        "turnkey.chain.have_balance.file.size.text",
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                  <div className={styles.menu__bottom}>
                    <button className={styles.payment} onClick={handleSubmit}>
                      <p>{t("turnkey.chain.have_balance.button")}</p>
                    </button>
                  </div>
                </>
              ) : isTarifBought && isHaveBalance ? (
                <>
                  <div className={styles.menu__top}>
                    <button onClick={() => onChange(null, false)}>
                      <div className={styles.close__icon} />
                    </button>
                  </div>
                  <div className={styles.menu__middle}>
                    <div className={styles.success__wrapper}>
                      <div className={styles.success__title}>
                        <HandshakeIcon2 />
                        <p>{t("turnkey.chain.success.title")}</p>
                      </div>
                      <div className={styles.success__text}>
                        <p>
                          {t("turnkey.chain.success.text")}{" "}
                          <span>{t("turnkey.chain.success.project")}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.menu__help}>
                    <p>
                      {t("turnkey.chain.success.help.text1")}{" "}
                      <span>{t("turnkey.chain.success.help.text2")}</span>
                    </p>
                  </div>
                </>
              ) : (
                !isHaveBalance && (
                  <>
                    <div className={styles.menu__top}>
                      <p>{t("turnkey.chain.no_balance.title")}</p>
                      <button onClick={() => onChange(null, false)}>
                        <div className={styles.close__icon} />
                      </button>
                    </div>
                    <div className={styles.menu__middle}>
                      <div className={styles.no_balance__wrapper}>
                        <div className={styles.no_balance__title}>
                          <SadSmileIcon />
                          <p>{t("turnkey.chain.no_balance.text")}</p>
                        </div>
                        <div className={styles.no_balance__text}>
                          <div>
                            <p>{t("turnkey.chain.no_balance.remainder")}</p>
                            <span>
                              {Math.ceil(
                                Math.abs(balance - tarifPrice),
                              ).toLocaleString()}{" "}
                              {t("symbol")}
                            </span>
                          </div>
                          <Link to={paths.walletTopUp}>
                            <button>
                              <p>{t("turnkey.chain.no_balance.button")}</p>
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className={styles.menu__help}>
                      <p>
                        {t("turnkey.chain.success.help.text1")}{" "}
                        <span>{t("turnkey.chain.success.help.text2")}</span>
                      </p>
                    </div>
                  </>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
