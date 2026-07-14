import { FC, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { parseTelegramLink } from "../helpers";

interface LinkPreviewProps {
  url: string;
}

/**
 * Natural width the Telegram widget will be told to render at.
 * Wider than the bubble so the post lays out compactly (less text wrapping
 * = less vertical overflow). We then scale the whole thing down with a CSS
 * transform to fit the bubble width.
 */
const TG_NATURAL_WIDTH = 480;

/**
 * How long we wait for Telegram's embed to report its size. If no resize
 * message arrives (post doesn't exist, private channel, network/CSP blocked),
 * we give up on the rich embed and show the generic link card instead.
 */
const TG_EMBED_TIMEOUT_MS = 4000;

const FallbackCard: FC<{ url: string }> = ({ url }) => {
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

const TelegramEmbed: FC<{ post: string; url: string }> = ({ post, url }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    setFailed(false);

    // Build the embed iframe ourselves instead of loading telegram-widget.js.
    // The official loader relies on document.currentScript to locate its own
    // <script> tag and inject the iframe next to it — which breaks under
    // StrictMode double-mount / portal remounts and when the (cached) script
    // isn't re-executed. Constructing the iframe directly is what the loader
    // does internally, minus the fragile timing.
    inner.replaceChildren();

    // Keep whatever Telegram host the user actually pasted (t.me / telegram.me)
    // instead of forcing one canonical domain.
    let host = "t.me";
    try {
      host = new URL(url).hostname.replace(/^www\./, "");
    } catch {
      /* keep default */
    }

    const iframe = document.createElement("iframe");
    const params = new URLSearchParams({
      embed: "1",
      dark: "1",
      userpic: "false",
      width: `${TG_NATURAL_WIDTH}px`,
    });
    iframe.src = `https://${host}/${post}?${params.toString()}`;
    iframe.width = `${TG_NATURAL_WIDTH}`;
    iframe.frameBorder = "0";
    iframe.scrolling = "no";
    iframe.style.border = "0";
    iframe.style.width = `${TG_NATURAL_WIDTH}px`;
    iframe.style.minHeight = "60px";
    inner.appendChild(iframe);

    // If Telegram never reports a size, the embed is empty (missing/private
    // post, blocked frame) — fall back to the generic link card.
    const timeout = window.setTimeout(
      () => setFailed(true),
      TG_EMBED_TIMEOUT_MS,
    );

    // Telegram's embed posts {event:"resize", height:N} messages to the parent
    // window. Match by source frame and apply the height so our scale logic
    // (which reads inner.offsetHeight) can size the bubble correctly.
    const onMessage = (event: MessageEvent) => {
      if (event.source !== iframe.contentWindow) return;
      let data: unknown = event.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }
      if (
        data &&
        typeof data === "object" &&
        (data as { event?: string }).event === "resize"
      ) {
        const height = (data as { height?: number }).height;
        if (typeof height === "number" && height > 0) {
          window.clearTimeout(timeout);
          iframe.style.height = `${height}px`;
        }
      }
    };
    window.addEventListener("message", onMessage);

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("message", onMessage);
      inner.replaceChildren();
    };
  }, [post, url]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner || failed) return;

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
  }, [failed]);

  if (failed) return <FallbackCard url={url} />;

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
    return <TelegramEmbed post={tg.post} url={url} />;
  }

  return <FallbackCard url={url} />;
};
