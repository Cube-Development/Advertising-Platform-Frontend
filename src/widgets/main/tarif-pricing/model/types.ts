import type React from "react";

export interface Feature {
  id: string;
  name: string;
  sub: string;
  icon: React.ReactNode;
  min: number;
}

export type RectMap = Record<string, DOMRect>;
