import { FC, useState } from "react";
import { hideChatAction, showChatAction } from "../ui/use-chat-action-nav";

/**
 * Dev-only harness for driving action panels without an AI round trip.
 *
 * Mounted behind `import.meta.env.DEV`, which Vite folds to `false` in a
 * production build, so this file and everything it references is tree-shaken
 * out of the shipped bundle.
 *
 * The offline modes reproduce, by hand, exactly what the plugin does to the
 * `<adras-action>` host, so panels can be checked with plugin.adras.ai blocked.
 */

/** z-index of the panel the plugin opens; the harness must stay under it. */
const PLUGIN_PANEL_Z = 10000;

const findAction = (name: string) =>
  document.querySelector<HTMLElement>(`adras-action[name="${name}"]`);

/** Base inline styles the plugin applies in both placements. */
const applyBaseStyles = (el: HTMLElement) => {
  el.setAttribute("popover", "manual");
  Object.assign(el.style, {
    position: "fixed",
    margin: "0",
    display: "grid",
    placeItems: "safe center",
    overflowY: "auto",
    overscrollBehavior: "contain",
    boxSizing: "border-box",
    zIndex: String(PLUGIN_PANEL_Z),
    background: "transparent",
    border: "none",
    borderRadius: "11px",
  } satisfies Partial<CSSStyleDeclaration>);
};

const showOffline = (name: string, mode: "side" | "inline") => {
  const el = findAction(name);
  if (!el) return;
  applyBaseStyles(el);

  if (mode === "side") {
    Object.assign(el.style, {
      width: "672px",
      height: "620px",
      maxHeight: "",
      right: "472px",
      bottom: "24px",
      left: "",
      top: "",
      visibility: "visible",
    });
  } else {
    Object.assign(el.style, {
      width: `${Math.min(430, window.innerWidth - 18)}px`,
      height: "",
      maxHeight: "50vh",
      right: "8px",
      bottom: "80px",
      left: "",
      top: "",
      visibility: "visible",
    });
  }

  if (!el.matches(":popover-open")) el.showPopover();
};

/**
 * Replay the plugin's two-phase INLINE sizing and log what it would latch.
 *
 * A logged 0 means the sizer in chat-action-stage.module.scss regressed and the
 * panel would collapse to nothing in INLINE placement.
 */
const measurePass = (name: string) => {
  const el = findAction(name);
  if (!el) return;
  const cap = Math.round(window.innerHeight * 0.5);

  applyBaseStyles(el);
  Object.assign(el.style, {
    visibility: "hidden",
    left: "-9999px",
    top: "0",
    right: "",
    bottom: "",
    width: "430px",
    height: "auto",
    maxHeight: `${cap}px`,
  });
  if (!el.matches(":popover-open")) el.showPopover();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const measured = Array.from(el.children).reduce(
        (max, child) => Math.max(max, child.getBoundingClientRect().height),
        0,
      );
      // eslint-disable-next-line no-console
      console.log(
        `[chat-action:${name}] measured=${Math.round(measured)}px cap=${cap}px ` +
          `-> latched=${Math.round(Math.min(measured, cap))}px`,
      );
      el.style.visibility = "visible";
      el.style.left = "";
      el.style.right = "8px";
      el.style.bottom = "80px";
      el.style.top = "";
    });
  });
};

const STORAGE_KEY = "chatActionsDev";

/**
 * Включается вручную, чтобы не висеть поверх каждой страницы в разработке:
 *
 *   localStorage.chatActionsDev = "1"   (и перезагрузить)
 *   либо один раз открыть страницу с ?chat-actions-dev
 *
 * Выключить: delete localStorage.chatActionsDev
 */
const isEnabled = () => {
  try {
    if (new URLSearchParams(window.location.search).has("chat-actions-dev")) {
      localStorage.setItem(STORAGE_KEY, "1");
      return true;
    }
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
};

export const ChatActionsDevtools: FC<{ names: string[] }> = ({ names }) => {
  const [name, setName] = useState(names[0] ?? "");
  const [open, setOpen] = useState(false);

  if (names.length === 0 || !isEnabled()) return null;

  return (
    <div
      style={{ zIndex: PLUGIN_PANEL_Z - 1 }}
      className="fixed bottom-2 left-2 rounded-xl border border-gray-300 bg-white/95 p-2 text-[11px] shadow-lg backdrop-blur"
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="font-semibold text-gray-700"
      >
        chat-actions {open ? "▾" : "▸"}
      </button>

      {open && (
        <div className="mt-2 flex flex-col gap-1.5">
          <select
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="max-w-[220px] rounded border border-gray-300 px-1.5 py-1"
          >
            {names.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <div className="flex flex-wrap gap-1">
            <button
              type="button"
              onClick={() => showChatAction(name)}
              className="rounded border border-gray-300 px-1.5 py-1"
            >
              via plugin
            </button>
            <button
              type="button"
              onClick={() => showOffline(name, "side")}
              className="rounded border border-gray-300 px-1.5 py-1"
            >
              side
            </button>
            <button
              type="button"
              onClick={() => showOffline(name, "inline")}
              className="rounded border border-gray-300 px-1.5 py-1"
            >
              inline
            </button>
            <button
              type="button"
              onClick={() => measurePass(name)}
              className="rounded border border-gray-300 px-1.5 py-1"
            >
              measure
            </button>
            <button
              type="button"
              onClick={() => {
                hideChatAction();
                findAction(name)?.hidePopover();
              }}
              className="rounded border border-gray-300 px-1.5 py-1"
            >
              hide
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
