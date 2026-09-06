import { useEffect, useState, type RefObject } from "react";

interface IUseInViewportOptions {
  /** Запас вокруг вьюпорта, чтобы анимация успела стартовать до появления. */
  rootMargin?: string;
  /** Считать элемент видимым, пока IntersectionObserver недоступен. */
  fallback?: boolean;
}

/**
 * Виден ли элемент на экране и активна ли вкладка.
 *
 * Нужен непрерывным анимациям. Без такой проверки requestAnimationFrame-цикл
 * и повторяющиеся анимации motion продолжают писать в DOM, когда секция давно
 * ушла за экран или вкладка свёрнута: браузер всё равно пересчитывает стили и
 * перерисовывает слои, а на слабых устройствах это заметная доля кадра.
 *
 * Возвращает false, когда элемент вне вьюпорта ИЛИ вкладка скрыта.
 */
export const useInViewport = (
  ref: RefObject<Element | null>,
  { rootMargin = "200px", fallback = true }: IUseInViewportOptions = {},
): boolean => {
  const [inViewport, setInViewport] = useState(fallback);
  const [pageVisible, setPageVisible] = useState(
    typeof document === "undefined" ? true : !document.hidden,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setInViewport(entry.isIntersecting),
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  useEffect(() => {
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return inViewport && pageVisible;
};
