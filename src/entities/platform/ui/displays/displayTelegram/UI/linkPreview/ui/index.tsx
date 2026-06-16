import { FC, useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import { parseTelegramLink } from "../helpers";

interface LinkPreviewProps {
  url: string;
}

const TELEGRAM_WIDGET_SRC = "https://telegram.org/js/telegram-widget.js?23";
/**
 * Natural width the Telegram widget will be told to render at.
 * Wider than the bubble so the post lays out compactly (less text wrapping
 * = less vertical overflow). We then scale the whole thing down with a CSS
 * transform to fit the bubble width.
 */
const TG_NATURAL_WIDTH = 480;

const TelegramEmbed: FC<{ post: string }> = ({ post }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    inner.replaceChildren();
    const script = document.createElement("script");
    script.async = true;
    script.src = TELEGRAM_WIDGET_SRC;
    script.setAttribute("data-telegram-post", post);
    script.setAttribute("data-width", `${TG_NATURAL_WIDTH}px`);
    script.setAttribute("data-dark", "1");
    script.setAttribute("data-userpic", "false");
    inner.appendChild(script);

    return () => {
      inner.replaceChildren();
    };
  }, [post]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;

    let rafId = 0;
    let retries = 0;
    const applied = { scale: 0, height: 0 };

    const applyNow = () => {
      const containerWidth = wrapper.offsetWidth;
      if (containerWidth <= 0) {
        // Modal portals can mount us before they have any width.
        if (retries++ < 30) rafId = requestAnimationFrame(scheduleApply);
        return;
      }
      retries = 0;
      const scale = Math.min(1, containerWidth / TG_NATURAL_WIDTH);
      const naturalHeight = inner.offsetHeight;
      const height = naturalHeight ? Math.ceil(naturalHeight * scale) : 0;

      if (
        Math.abs(applied.scale - scale) < 0.001 &&
        Math.abs(applied.height - height) < 1
      ) {
        return;
      }

      applied.scale = scale;
      applied.height = height;
      inner.style.transform = `scale(${scale})`;
      inner.style.transformOrigin = "top left";
      wrapper.style.height = height ? `${height}px` : "0px";
    };

    const scheduleApply = () => {
      rafId = 0;
      applyNow();
    };

    const onResize = () => {
      if (!rafId) rafId = requestAnimationFrame(scheduleApply);
    };

    applyNow();

    const ro = new ResizeObserver(onResize);
    ro.observe(wrapper);
    ro.observe(inner);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={wrapperRef} className={styles.preview}>
      <div
        ref={innerRef}
        className={styles.previewInner}
        style={{ width: `${TG_NATURAL_WIDTH}px` }}
      />
    </div>
  );
};

export const LinkPreview: FC<LinkPreviewProps> = ({ url }) => {
  const tg = parseTelegramLink(url);

  if (tg) {
    return <TelegramEmbed post={tg.post} />;
  }

  let domain = url;
  try {
    domain = new URL(url).hostname.replace(/^www\./, "");
  } catch {
    /* keep raw */
  }

  const favicon = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.fallback}
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={favicon}
        alt={domain}
        className={styles.favicon}
        loading="lazy"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
        }}
      />
      <div className={styles.text}>
        <span className={styles.title}>{domain}</span>
        <span className={styles.url}>{url}</span>
      </div>
    </a>
  );
};
