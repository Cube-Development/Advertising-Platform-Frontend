import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FC, useMemo } from "react";
import { Info, Loader } from "lucide-react";

import { StarIcon } from "@shared/assets";
import { cn, MyButton, MyInput, SegmentSwitcher, Textarea } from "@shared/ui";
import {
  DEFAULT_GENERATION_LANGUAGE,
  EGenerationLanguage,
  GENERATION_LANGUAGES,
} from "@entities/postGeneration";
import { platformTypesStr } from "@entities/platform";
import { ICreatePostForm } from "@entities/project";
import { UseFormSetValue } from "react-hook-form";

import {
  postGenerationSchema,
  PostGenerationFormInput,
  PostGenerationFormOutput,
  usePostGeneration,
} from "../model";
import styles from "./styles.module.scss";

interface PostGenerationFormProps {
  formState: ICreatePostForm;
  setValue: UseFormSetValue<ICreatePostForm>;
  onStreamingChange?: (isStreaming: boolean) => void;
  onGenerated?: () => void;
}

export const PostGenerationForm: FC<PostGenerationFormProps> = ({
  formState,
  setValue,
  onStreamingChange,
  onGenerated,
}) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PostGenerationFormInput, any, PostGenerationFormOutput>({
    resolver: zodResolver(postGenerationSchema),
    defaultValues: {
      business_name: "",
      niche: "",
      offer: "",
      link: "",
      language: DEFAULT_GENERATION_LANGUAGE,
    },
  });

  const linkHintPlatform = useMemo(() => {
    const type = formState.platformFilter?.type;
    const supported: platformTypesStr[] = [
      platformTypesStr.telegram,
      platformTypesStr.instagram,
      platformTypesStr.youtube,
    ];

    if (!type || !supported.includes(type)) {
      return null;
    }

    return t(`create_order.create.filter.${type}`);
  }, [formState.platformFilter?.type, t]);

  const { generate, cancel, isStreaming } = usePostGeneration({
    formState,
    setValue,
    onStreamingChange,
    onGenerated,
  });

  const onSubmit = async (data: PostGenerationFormOutput) => {
    await generate(data);
  };

  // NOTE: нельзя оборачивать в <form>, т.к. CreateOrderBlock уже рендерит
  // внешний <form> вокруг всего CreateOrderPost. Вложенные формы запрещены
  // HTML5 — браузер их «выпрямляет» и любой submit улетает во внешний onSubmit
  // (страница перезагружается + поля попадают в query). Сабмитим вручную.
  const triggerGenerate = (e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    handleSubmit(onSubmit)();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Enter в input внутри внешней <form> сабмитит внешнюю — перехватываем
    if (e.key === "Enter") {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT") {
        e.preventDefault();
        e.stopPropagation();
        triggerGenerate();
      }
    }
  };

  return (
    <div className={styles.form} onKeyDown={handleKeyDown}>
      <div className={styles.field}>
        <label className={styles.label}>
          {t("create_order.generation.business_name")}
          <span className={styles.required}>*</span>
        </label>
        <MyInput
          type="text"
          autoComplete="off"
          disabled={isStreaming}
          className={styles.input}
          placeholder={t("create_order.generation.business_name_placeholder")}
          {...register("business_name")}
        />
        {errors.business_name && (
          <p className={styles.error}>
            {t(errors.business_name.message || "")}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>
          {t("create_order.generation.niche")}
          <span className={styles.required}>*</span>
        </label>
        <MyInput
          type="text"
          autoComplete="off"
          disabled={isStreaming}
          className={styles.input}
          placeholder={t("create_order.generation.niche_placeholder")}
          {...register("niche")}
        />
        {errors.niche && (
          <p className={styles.error}>{t(errors.niche.message || "")}</p>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>
          {t("create_order.generation.offer")}
        </label>
        <Textarea
          rows={3}
          disabled={isStreaming}
          placeholder={t("create_order.generation.offer_placeholder")}
          {...register("offer")}
          className={cn(
            styles.textarea,
            "placeholder:!text-black/25 focus-visible:!ring-0 focus-visible:!ring-offset-0 focus-visible:!shadow-none focus:placeholder:!text-transparent focus-visible:placeholder:!text-transparent",
          )}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>
          {t("create_order.generation.link")}
        </label>
        {linkHintPlatform && (
          <div className={styles.hint} role="note">
            <span className={styles.hint_icon} aria-hidden>
              <Info strokeWidth={2} />
            </span>
            <p className={styles.hint_text}>
              {t("create_order.generation.link_hint", {
                platform: linkHintPlatform,
              })}
            </p>
          </div>
        )}
        <MyInput
          type="text"
          autoComplete="off"
          disabled={isStreaming}
          className={styles.input}
          placeholder={t("create_order.generation.link_placeholder")}
          {...register("link")}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>
          {t("create_order.generation.language")}
        </label>
        <Controller
          control={control}
          name="language"
          render={({ field }) => (
            <SegmentSwitcher
              value={field.value}
              options={GENERATION_LANGUAGES.map((lang) => ({
                value: lang.value,
                label: t(lang.labelKey),
              }))}
              onChange={(next) => field.onChange(next as EGenerationLanguage)}
              disabled={isStreaming}
            />
          )}
        />
      </div>

      <div className={styles.actions}>
        {isStreaming ? (
          <MyButton type="button" buttons_type="button__white" onClick={cancel}>
            <Loader className="animate-spin" width={18} height={18} />
            <p className="truncate">{t("create_order.generation.cancel")}</p>
          </MyButton>
        ) : (
          <MyButton
            type="button"
            buttons_type="button__blue"
            onClick={triggerGenerate}
          >
            <span className={styles.btn_icon}>
              <StarIcon />
            </span>
            <p className="truncate">{t("create_order.generation.submit")}</p>
          </MyButton>
        )}
      </div>
    </div>
  );
};
