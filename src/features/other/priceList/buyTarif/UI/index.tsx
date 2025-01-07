import {
  ContentType,
  FILES,
  IBuyTarif,
  tarifData,
  TarifParameters,
  useGetUploadLinkMutation,
  usePostBuyTarifMutation,
} from "@entities/project";
import {
  AddFileIcon,
  CancelIcon2,
  HandshakeIcon2,
  LoginIcon,
  SadSmileIcon,
  TrashBasketIcon,
  YesIcon,
} from "@shared/assets";
import { useAppSelector } from "@shared/hooks";
import { paths } from "@shared/routing";
import { ITarifInfo } from "@shared/types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
  formatFileSize,
  ScrollArea,
  ToastAction,
  useToast,
} from "@shared/ui";
import { getFileExtension } from "@shared/utils";
import { CircleX, FileIcon, InfoIcon } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

interface BuyTarifProps {
  tarif: number;
  tarifInfo: ITarifInfo;
}

export const BuyTarif: FC<BuyTarifProps> = ({ tarif, tarifInfo }) => {
  const { t } = useTranslation();
  const { isAuth } = useAppSelector((state) => state.user);
  const { toast } = useToast();
  const [buyTarif] = usePostBuyTarifMutation();
  const [url, setUrl] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [isTarifBought, setIsTarifBought] = useState<boolean>(false);
  const [getUploadLink] = useGetUploadLinkMutation();

  const tarifPrice =
    TarifParameters.find((item) => item.index === tarif)?.price || 0;
  const { balance } = useAppSelector((state) => state.wallet);

  const [isHaveBalance, setIsHaveBalance] = useState<boolean>(
    tarifPrice <= balance,
  );

  useEffect(() => {
    if (balance) {
      setIsHaveBalance(tarifPrice <= balance);
    }
  }, [balance]);

  const { setValue, watch, reset } = useForm<IBuyTarif>({
    defaultValues: {
      tariff_ident: tarif,
      comment: "",
      links: [],
      attached_files: [],
    },
  });
  const formState = watch();

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
    const updatedLinks = formState.links.filter((url) => url !== urlDelete);
    setValue(tarifData.links, updatedLinks);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFiles([...e.target.files]);
      try {
        await uploadFilesAndMedia([...e.target.files]);
      } finally {
        console.log("finally buy tarif component");
      }
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
    setValue(tarifData.attached_files, []);
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
          reset({
            tariff_ident: tarif,
            comment: "",
            links: [],
            attached_files: [],
          });
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

  const uploadFilesAndMedia = async (files: File[]) => {
    await Promise.all(
      files.map(async (file) => {
        const data = await getUploadLink({
          extension: getFileExtension(file),
          content_type: ContentType.file,
        }).unwrap();
        await fetch(data?.url, {
          method: "PUT",
          body: file,
        });
        if (!formState.attached_files) {
          formState.attached_files = [];
        }
        formState.attached_files.push({
          content_type: ContentType.file,
          content: data.file_name,
          name: file.name,
        });
      }),
    );
  };

  const handleClose = () => {
    setIsTarifBought(false);
  };

  return (
    <>
      {isAuth ? (
        <Drawer>
          <DrawerTrigger className={styles.button}>{t(`buy`)}</DrawerTrigger>
          <DrawerContent className={styles.menu}>
            <DrawerTitle className="sr-only" />
            <DrawerDescription className="sr-only" />
            {!isTarifBought && isHaveBalance ? (
              <>
                <div className={styles.menu__top}>
                  <p>{t("turnkey.chain.have_balance.title")}</p>
                  <DrawerClose onClick={handleClose}>
                    <div className={styles.close}>
                      <CancelIcon2 />
                    </div>
                  </DrawerClose>
                </div>
                <ScrollArea>
                  <div className={styles.menu__content}>
                    <div className={styles.tarif}>
                      <p className={styles.tarif__name}>{tarifInfo.name}</p>
                      <p className={styles.tarif__views}>{tarifInfo.views}</p>
                      <p className={styles.tarif__price}>{tarifInfo.price}</p>
                    </div>
                    <div className={styles.menu__block}>
                      <div className={styles.text}>
                        <p>{t("turnkey.chain.have_balance.comment.title")}</p>
                        <span>
                          {t("turnkey.chain.have_balance.comment.text")}
                        </span>
                      </div>
                      <textarea
                        id="input"
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
                        <span>{t("turnkey.chain.have_balance.url.text")}</span>
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
                                <span className="truncate">{url}</span>
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
                        <span>{t("turnkey.chain.have_balance.file.text")}</span>
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
                              <div className={styles.files__text}>
                                <p>
                                  {t("turnkey.chain.have_balance.file.value")}
                                </p>
                                <label className={styles.file__button}>
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
                  <p>{t("turnkey.chain.success.title")}</p>
                  <DrawerClose onClick={handleClose}>
                    <div className={styles.close}>
                      <CancelIcon2 />
                    </div>
                  </DrawerClose>
                </div>
                <ScrollArea>
                  <div className={styles.menu__middle}>
                    <div className={styles.success__wrapper}>
                      <div className={styles.success__title}>
                        <HandshakeIcon2 />
                        <p>{t("turnkey.chain.success.info")}</p>
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
                </ScrollArea>
              </>
            ) : (
              !isHaveBalance && (
                <>
                  <div className={styles.menu__top}>
                    <p>{t("turnkey.chain.no_balance.title")}</p>
                    <DrawerClose onClick={handleClose}>
                      <div className={styles.close}>
                        <CancelIcon2 />
                      </div>
                    </DrawerClose>
                  </div>
                  <ScrollArea>
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
                  </ScrollArea>
                </>
              )
            )}
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <button className={styles.button}>{t(`buy`)}</button>
          </DialogTrigger>
          <DialogContent className={`${styles.content} gap-[0px]`}>
            <DialogTitle className="sr-only" />
            <DialogDescription className="sr-only" />
            <DialogClose onClick={handleClose}>
              <p className={styles.close}>
                <CircleX
                  width={30}
                  height={30}
                  stroke="rgba(0,0,0,0.5)"
                  strokeWidth={1.5}
                />
              </p>
            </DialogClose>
            <div className={styles.text}>
              <p className={styles.text__title}>
                {t("registration_alert.title")}
              </p>
              <p className={styles.text__description}>
                {t("registration_alert.description")}
              </p>
              <p className={styles.text__call_to_action}>
                {t("registration_alert.call_to_action")}
              </p>
            </div>
            <DialogFooter className="pt-[20px]">
              <Link
                to={paths.login}
                className={`${styles.btns__login} truncate`}
              >
                {t("login")}
                <LoginIcon />
              </Link>
              <Link
                to={paths.registration}
                className={`${styles.btns__register} truncate`}
              >
                {t("registration")}
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
