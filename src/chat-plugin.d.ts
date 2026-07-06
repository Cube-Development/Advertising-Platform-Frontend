import type { DetailedHTMLProps, HTMLAttributes } from "react";

type CustomElement<T = object> = DetailedHTMLProps<
  HTMLAttributes<HTMLElement> & T,
  HTMLElement
>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "chat-plugin": CustomElement<{
        org?: string;
        bgColor?: string;
        textColor?: string;
        greeting?: string;
        name?: string;
      }>;
      "chat-action": CustomElement<{
        name?: string;
        description?: string;
        /** "off" tells the plugin not to serialize the inner markup to the AI. */
        content?: string;
      }>;
    }
  }
}

export {};
