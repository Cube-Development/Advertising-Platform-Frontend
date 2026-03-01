import {
  ENUM_ADV_MANAGER_PROJECT_STATUS,
  FILES,
  ENUM_PROJECT_TYPES,
  tariffData,
} from "@entities/project";
import { LoginModal } from "@features/user";
import { WalletsBar } from "@features/wallet";
import {
  AddFileIcon,
  ArrowLongHorizontalIcon,
  CancelIcon2,
  HandshakeIcon2,
  SadSmileIcon,
  TrashBasketIcon,
  YesIcon,
} from "@shared/assets";
import { useAppSelector } from "@shared/hooks";
import { ENUM_PATHS } from "@shared/routing";
import { ITariffInfo } from "@shared/types";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
  formatFileSize,
  MyButton,
  MyProgressBar,
  ScrollArea,
  useToast,
} from "@shared/ui";
import { buildPathWithQuery, queryParamKeys } from "@shared/utils";
import { FileIcon, InfoIcon, Loader } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  useBuyTariff,
  useBuyTariffForm,
  useUploadFilesAndMedia,
} from "../model";
import styles from "./styles.module.scss";

interface BuyTariffProps {
  tariff: number;
  tariffInfo: ITariffInfo;
}

export const BuyTariff: FC<BuyTariffProps> = ({ tariff, tariffInfo }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { isAuth } = useAppSelector((state) => state.user);

  const { buyNewTariff, isLoading } = useBuyTariff();
  const {
    formState,
    setValue,
    resetForm,
    tariffPrice,
    currentBalance: balance,
  } = useBuyTariffForm(tariff);

  const { uploadFilesAndMedia } = useUploadFilesAndMedia(formState, setValue);

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const comment = e.target.value;
    setValue(tariffData.comment, comment);
  };

  const handleChangeUrl = () => {
    if (formState?.url) {
      formState?.links.push(formState?.url);
      setValue(tariffData.url, "");
    }
  };

  const handleDeleteUrl = (urlDelete: string) => {
    const updatedLinks = formState?.links.filter((url) => url !== urlDelete);
    setValue(tariffData.links, updatedLinks);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(tariffData.isDropFile, true);
    if (e.target.files && e.target.files[0]) {
      setValue(tariffData.files, [e.target.files[0]]);
      await uploadFilesAndMedia([e.target.files[0]]);
    }
    setValue(tariffData.isDropFile, false);
  };

  const handleReset = () => {
    setValue(tariffData.files, []);
    setValue(tariffData.attached_files, []);
  };

  const handleDrag = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setValue(tariffData.dragActive, true);
  };

  const handleLive = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setValue(tariffData.dragActive, false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(tariffData.isDropFile, true);
    setValue(tariffData.dragActive, false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setValue(tariffData.files, [e.dataTransfer.files[0]]);
      await uploadFilesAndMedia([e.dataTransfer.files[0]]);
    }
    setValue(tariffData.isDropFile, false);
  };

  const handleRemoveFile = (file: File) => {
    setValue(
      tariffData.files,
      formState?.files.filter((item) => item !== file),
    );
    setValue(tariffData.attached_files, []);
  };

  const handleSubmit = async () => {
    if (!formState?.wallet_type) {
      toast({
        variant: "error",
        title: t("toasts.turnkey.error_wallet"),
      });
      return;
    }

    if (
      (formState?.attached_files.length ||
        formState?.comment ||
        formState?.links.length) &&
      !formState?.isDropFile &&
      !!formState?.wallet_type
    ) {
      const res = await buyNewTariff(formState);

      if (!res) return;

      resetForm();
    }
  };

  const handleClose = () => {
    setValue(tariffData?.isTarifBought, false);
  };

  if (!isAuth) {
    return (
      <LoginModal
        trigger={<button className={styles.button}>{t(`buy`)}</button>}
      />
    );
  }

  const sendToastMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toast({
      variant: "warning",
      title: t("toasts.cart.save_cart_temporary_error"),
    });
  };

  return (
    <Drawer>
      <DrawerTrigger className={styles.button} onClick={sendToastMessage}>
        {t(`buy`)}
      </DrawerTrigger>
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
                  <p className={styles.tarif__name}>{tariffInfo.name}</p>
                  <p className={styles.tarif__views}>{tariffInfo.views}</p>
                  <p className={styles.tarif__price}>{tariffInfo.price}</p>
                </div>
                <div className={styles.wallets_choose}>
                  <p className={styles.subtitle}>
                    {t("create_order.payment.choose_wallet")}
                  </p>
                  <WalletsBar
                    walletType={formState?.wallet_type}
                    setWalletType={(type) => {
                      setValue("wallet_type", type);
                    }}
                    totalAmount={tariffPrice}
                  />
                </div>
                <div className={styles.menu__block}>
                  <div className={styles.text}>
                    <p>{t("turnkey.chain.have_balance.comment.title")}</p>
                    <span>{t("turnkey.chain.have_balance.comment.text")}</span>
                  </div>
                  <textarea
                    id="input"
                    rows={10}
                    onChange={handleChangeComment}
                    maxLength={1000}
                    value={formState?.comment}
                    placeholder={t("turnkey.chain.have_balance.comment.value")}
                  />
                </div>
                <div className={styles.menu__block}>
                  <div className={styles.text}>
                    <p>{t("turnkey.chain.have_balance.url.title")}</p>
                    <span>{t("turnkey.chain.have_balance.url.text")}</span>
                  </div>
                  <div className={styles.menu__url_add}>
                    <input
                      placeholder={t("turnkey.chain.have_balance.url.value")}
                      onChange={(e) => {
                        setValue(tariffData.url, e.target.value);
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
                    {formState?.files.length === FILES.MAX_LENGTH ? (
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
                              {formState?.uploadProgress[file?.name] !== 100 ? (
                                <MyProgressBar
                                  progress={
                                    formState?.uploadProgress[file?.name] || 0
                                  }
                                />
                              ) : (
                                <YesIcon />
                              )}
                              <button
                                className={styles.delete}
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
                            <p>{t("turnkey.chain.have_balance.file.value")}</p>
                            <label className={styles.file__button}>
                              <span>
                                {t("turnkey.chain.have_balance.file.button")}
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
                                {t("turnkey.chain.have_balance.file.size.text")}
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
                to={buildPathWithQuery(ENUM_PATHS.ORDERS, {
                  [queryParamKeys.projectType]:
                    ENUM_PROJECT_TYPES.MANAGER_PROJECT,
                  [queryParamKeys.projectStatus]:
                    ENUM_ADV_MANAGER_PROJECT_STATUS.DEVELOP,
                })}
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
                            Math.abs(balance - tariffPrice),
                          ).toLocaleString()}{" "}
                          {t("symbol")}
                        </span>
                      </div>
                      <Link to={ENUM_PATHS.WALLET_TOP_UP}>
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
  );
};
