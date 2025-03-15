import {
  advManagerProjectStatusFilter,
  ContentType,
  FILES,
  IBuyTarif,
  projectTypesFilter,
  tarifData,
  TarifParameters,
  useGetUploadLinkMutation,
  usePostBuyTarifMutation,
} from "@entities/project";
import {
  AddFileIcon,
  ArrowLongHorizontalIcon,
  CancelIcon2,
  HandshakeIcon2,
  LoginIcon,
  SadSmileIcon,
  TrashBasketIcon,
  YesIcon,
} from "@shared/assets";
import { useAppSelector, useCurrentPathEnum } from "@shared/hooks";
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
  MyButton,
  ScrollArea,
  ToastAction,
  useToast,
} from "@shared/ui";
import { getFileExtension, queryParamKeys } from "@shared/utils";
import { CircleX, FileIcon, InfoIcon, Loader } from "lucide-react";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

interface BuyTarifProps {
  tarif: number;
  tarifInfo: ITarifInfo;
}

interface IBuyTariffForm extends IBuyTarif {
  url: string;
  files: File[];
  dragActive: boolean;
  isTarifBought: boolean;
  isHaveBalance: boolean;
}

export const BuyTarif: FC<BuyTarifProps> = ({ tarif, tarifInfo }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { isAuth } = useAppSelector((state) => state.user);
  const { balance } = useAppSelector((state) => state.wallet);
  const [buyTarif, { isLoading }] = usePostBuyTarifMutation();
  const [getUploadLink] = useGetUploadLinkMutation();

  const tarifPrice =
    TarifParameters.find((item) => item.index === tarif)?.price || 0;

  const { setValue, watch, reset } = useForm<IBuyTariffForm>({
    defaultValues: {
      tariff_ident: tarif,
      comment: "",
      links: [],
      attached_files: [],
      url: "",
      files: [],
      dragActive: false,
      isTarifBought: false,
      isHaveBalance: tarifPrice <= balance,
    },
  });
  const formState = watch();

  useEffect(() => {
    if (balance) {
      setValue(tarifData.isHaveBalance, tarifPrice <= balance);
    }
  }, [balance]);
  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const comment = e.target.value;
    setValue(tarifData.comment, comment);
  };

  const handleChangeUrl = () => {
    if (formState?.url) {
      formState?.links.push(formState?.url);
      setValue(tarifData.url, "");
    }
  };

  const handleDeleteUrl = (urlDelete: string) => {
    const updatedLinks = formState?.links.filter((url) => url !== urlDelete);
    setValue(tarifData.links, updatedLinks);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setValue(tarifData.files, [e.target.files[0]]);
      try {
        await uploadFilesAndMedia([e.target.files[0]]);
      } finally {
        console.log("finally buy tarif component");
      }
    }
  };

  const handleReset = () => {
    setValue(tarifData.files, []);
    setValue(tarifData.attached_files, []);
  };

  const handleDrag = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setValue(tarifData.dragActive, true);
  };

  const handleLive = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setValue(tarifData.dragActive, false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(tarifData.dragActive, false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setValue(tarifData.files, [e.dataTransfer.files[0]]);
      try {
        await uploadFilesAndMedia([e.dataTransfer.files[0]]);
      } finally {
        console.log("finally buy tarif component");
      }
    }
  };

  const handleRemoveFile = (file: File) => {
    setValue(
      tarifData.files,
      formState?.files.filter((item) => item !== file),
    );
    setValue(tarifData.attached_files, []);
  };

  const handleSubmit = () => {
    if (
      formState?.attached_files.length ||
      formState?.comment ||
      formState?.links.length
    ) {
      !isLoading &&
        buyTarif({
          // only back data
          tariff_ident: formState?.tariff_ident,
          comment: formState?.comment,
          links: formState?.links,
          attached_files: formState?.attached_files,
        })
          .unwrap()
          .then(() => {
            toast({
              variant: "success",
              title: t("toasts.turnkey.success"),
            });
            reset({
              tariff_ident: tarif,
              comment: "",
              links: [],
              attached_files: [],
              url: "",
              files: [],
              dragActive: false,
              isTarifBought: true,
              isHaveBalance: tarifPrice <= balance,
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
        if (!formState?.attached_files) {
          formState.attached_files = [];
        }
        formState?.attached_files.push({
          content_type: ContentType.file,
          content: data.file_name,
          name: file.name,
        });
      }),
    );
  };

  const handleClose = () => {
    setValue(tarifData?.isTarifBought, false);
  };

  const currentPath = useCurrentPathEnum();

  return (
    <>
      {isAuth ? (
        <Drawer>
          <DrawerTrigger className={styles.button}>{t(`buy`)}</DrawerTrigger>
          <DrawerContent className={styles.menu}>
            <DrawerTitle className="sr-only" />
            <DrawerDescription className="sr-only" />
            {!formState?.isTarifBought && formState?.isHaveBalance ? (
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
                        value={formState?.comment}
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
                            setValue(tarifData.url, e.target.value);
                          }}
                          value={formState?.url}
                        />
                        <button onClick={handleChangeUrl}>
                          <p>{t("turnkey.chain.have_balance.url.button")}</p>
                        </button>
                      </div>
                      {formState?.links.length !== 0 && (
                        <div className={styles.menu__all_url}>
                          {formState?.links.map((url, index) => (
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
                        className={`${styles.files__wrapper} ${formState?.dragActive ? styles.drag : ""}`}
                        onReset={handleReset}
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleLive}
                        onDrop={handleDrop}
                      >
                        {formState?.files.length === FILES.maxLenght ? (
                          <div className={styles.items}>
                            {formState?.files.map((file, id) => (
                              <div key={id} className={styles.item}>
                                <div className={styles.item__left}>
                                  <FileIcon />

                                  <div className={styles.item__text}>
                                    <p className="truncate">{file?.name}</p>
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
                  <MyButton className={styles.payment} onClick={handleSubmit}>
                    <p>{t("turnkey.chain.have_balance.button")}</p>
                    {isLoading && (
                      <Loader
                        className="animate-spin"
                        stroke="#fff"
                        width={20}
                        height={20}
                      />
                    )}
                  </MyButton>
                </div>
              </>
            ) : formState?.isTarifBought && formState?.isHaveBalance ? (
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
                    <p className="text-sm">
                      {t("turnkey.chain.success.help.text1")}{" "}
                      <span className="text-indigo-600 underline">
                        {t("turnkey.chain.success.help.text2")}
                      </span>
                    </p>
                  </div>
                  <Link
                    to={`${paths.orders}?${queryParamKeys.projectType}=${projectTypesFilter.managerProject}&${queryParamKeys.projectStatus}=${advManagerProjectStatusFilter.develop}`}
                    className="h-full"
                  >
                    <MyButton
                      buttons_type="button__blue"
                      className={`${styles.go_to_order_button} truncate h-full w-fit mx-auto`}
                    >
                      {t("turnkey.chain.success.go_to_order")}
                      <div>
                        <ArrowLongHorizontalIcon className="icon__white" />
                      </div>
                    </MyButton>
                  </Link>
                </ScrollArea>
              </>
            ) : (
              !formState?.isHaveBalance && (
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
                to={`${paths.login}${currentPath}`}
                className={`${styles.btns__login} truncate`}
              >
                {t("login")}
                <LoginIcon />
              </Link>
              <Link
                to={`${paths.registration}${currentPath}`}
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
