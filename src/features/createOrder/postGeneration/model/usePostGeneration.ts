import { useCallback, useEffect, useRef, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import {
  applyMultipostUpdate,
  ContentType,
  CreatePostFormData,
  ICreatePost,
  ICreatePostForm,
  IFile,
} from "@entities/project";
import { platformTypesNum, platformTypesStr } from "@entities/platform";
import {
  generatePostStream,
  IGeneratePostRequest,
  PostGenerationAbortError,
} from "@entities/postGeneration";
import { PostGenerationFormOutput } from "./schema";

interface UsePostGenerationArgs {
  formState: ICreatePostForm;
  setValue: UseFormSetValue<ICreatePostForm>;
  onStreamingChange?: (isStreaming: boolean) => void;
  onGenerated?: () => void;
  onError?: (message: string) => void;
}

const PLATFORM_NUM_TO_STR: Record<number, platformTypesStr> = {
  [platformTypesNum.telegram]: platformTypesStr.telegram,
  [platformTypesNum.instagram]: platformTypesStr.instagram,
  [platformTypesNum.youtube]: platformTypesStr.youtube,
  [platformTypesNum.site]: platformTypesStr.site,
};

/**
 * Модель отдаёт смешанный контент: HTML-теги (<b>) + сырые `\n` для разделения
 * параграфов. useTemplateEditor превращает `\n` в `<br>` ТОЛЬКО для plain text;
 * если он видит HTML — оставляет переносы как whitespace, и они теряются.
 * Поэтому нормализуем здесь:
 *   - literal `\\n` -> `\n` (на всякий случай, если модель выдаёт escape)
 *   - схлопываем 3+ подряд до 2 (максимум одна пустая строка между блоками)
 *   - финально `\n` -> `<br>`
 */
const normalizeAiHtml = (raw: string): string =>
  raw
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\n/g, "<br>");

const upsertTextInFiles = (
  files: IFile[] | undefined,
  html: string,
): IFile[] => {
  const list = files ?? [];
  const hasText = list.some((f) => f.content_type === ContentType.text);
  if (hasText) {
    return list.map((f) =>
      f.content_type === ContentType.text ? { ...f, content: html } : f,
    );
  }
  return [...list, { content_type: ContentType.text, content: html }];
};

/**
 * Возвращает контекст текущего поста для записи стрима AI.
 * Логика 1-в-1 с features/createOrder/postEditor (Editor) — пишем в правильную
 * платформу/тип/мультипост, чтобы текст автоматически попал в нужный TipTap.
 */
const getTargetContext = (form: ICreatePostForm) => {
  const platformId = form?.platformFilter?.id;
  const postType = form?.selectedPostType;

  if (form?.selectedMultiPostId) {
    return { mode: "multi" as const, platformId, postType };
  }
  return { mode: "single" as const, platformId, postType };
};

export const usePostGeneration = ({
  formState,
  setValue,
  onStreamingChange,
  onGenerated,
  onError,
}: UsePostGenerationArgs) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const accumulatedRef = useRef<string>("");
  const formRef = useRef<ICreatePostForm>(formState);

  useEffect(() => {
    formRef.current = formState;
  }, [formState]);

  const setStreamingState = useCallback(
    (next: boolean) => {
      setIsStreaming(next);
      onStreamingChange?.(next);
    },
    [onStreamingChange],
  );

  const writeContentToEditor = useCallback(
    (html: string) => {
      const form = formRef.current;
      const { mode, platformId, postType } = getTargetContext(form);
      if (platformId === undefined || postType === undefined) return;

      if (mode === "multi" && form.selectedMultiPostId) {
        const next = applyMultipostUpdate(
          form.multiposts || [],
          form.selectedMultiPostId,
          (leader) => ({
            ...leader,
            text: upsertTextInFiles(leader.text, html),
          }),
        );
        setValue(CreatePostFormData.multiposts, next);
        return;
      }

      const posts = form.posts || [];
      const current = posts.find(
        (p) => p.platform === platformId && p.post_type === postType,
      );
      const others = posts.filter(
        (p) => !(p.platform === platformId && p.post_type === postType),
      );

      const base: ICreatePost = current ?? {
        platform: platformId,
        post_type: postType,
      };

      const updated: ICreatePost = {
        ...base,
        text: upsertTextInFiles(base.text, html),
      };

      setValue(CreatePostFormData.posts, [...others, updated]);
    },
    [setValue],
  );

  const cancel = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  }, []);

  const generate = useCallback(
    async (data: PostGenerationFormOutput) => {
      cancel();
      setError(null);
      accumulatedRef.current = "";

      const controller = new AbortController();
      abortRef.current = controller;

      setStreamingState(true);
      writeContentToEditor("");

      const platformId = formRef.current?.platformFilter?.id;
      const platform =
        platformId !== undefined ? PLATFORM_NUM_TO_STR[platformId] : undefined;

      const payload: IGeneratePostRequest = {
        business_name: data.business_name,
        niche: data.niche,
        offer: data.offer || null,
        link: data.link || null,
        platform,
        language: data.language,
      };

      try {
        await generatePostStream(payload, {
          signal: controller.signal,
          onChunk: (chunk) => {
            accumulatedRef.current += chunk;
            writeContentToEditor(normalizeAiHtml(accumulatedRef.current));
          },
          onDone: () => {
            const cleaned = accumulatedRef.current
              .replace(/^```[a-zA-Z]*\r?\n?/, "")
              .replace(/\r?\n?```\s*$/, "")
              .trim();
            writeContentToEditor(normalizeAiHtml(cleaned));
          },
        });

        onGenerated?.();
      } catch (err) {
        if (err instanceof PostGenerationAbortError) {
          return;
        }
        const message =
          err instanceof Error ? err.message : "generation.errors.generic";
        setError(message);
        onError?.(message);
      } finally {
        abortRef.current = null;
        setStreamingState(false);
      }
    },
    [cancel, writeContentToEditor, setStreamingState, onGenerated, onError],
  );

  useEffect(
    () => () => {
      abortRef.current?.abort();
    },
    [],
  );

  return {
    generate,
    cancel,
    isStreaming,
    error,
  };
};
