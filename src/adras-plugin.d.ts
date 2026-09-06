import type { DetailedHTMLProps, HTMLAttributes } from "react";

type CustomElement<T = object> = DetailedHTMLProps<
  HTMLAttributes<HTMLElement> & T,
  HTMLElement
>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      /**
       * Adras AI chat widget. Attribute names are intentionally lowercase:
       * React sets unknown props on custom elements via `setAttribute`, and
       * HTML lowercases qualified attribute names, so `bgColor` would land as
       * `bgcolor` anyway. Writing them lowercase removes the ambiguity.
       */
      "adras-plugin": CustomElement<{
        org?: string;
        apitoken?: string;
        apidomain?: string;
        name?: string;
        bgcolor?: string;
        textcolor?: string;
        cursorcolor?: string;
        accent?: string;
        surface?: string;
        panelbg?: string;
        messagebubblebg?: string;
        senderbubblebg?: string;
        openondefault?: string;
        "display-typ"?: string;
        "widget-arg-float"?: string;
        "widget-arg-auto-open"?: string;
        "widget-arg-auto-open-in"?: string;
        "inline-arg-action-display"?: string;
        "inline-arg-message-display"?: string;
        "inline-arg-slot-max"?: string;
        "inline-arg-composer-max"?: string;
        "inline-arg-widget-fallback"?: string;
        "inline-arg-greeting"?: string;
        "inline-arg-hints"?: string;
        "inline-arg-headline"?: string;
        "inline-arg-greeting-cb"?: string;
        "inline-arg-hints-cb"?: string;
        "inline-arg-headline-cb"?: string;
      }>;
      "adras-action": CustomElement<{
        /** Unique id the AI references to trigger this action. */
        name?: string;
        /** Short description of what this action shows — sent to the AI. */
        description?: string;
        /** "off" tells the plugin not to serialize the inner markup to the AI. */
        content?: string;
      }>;
    }
  }
}

export {};
