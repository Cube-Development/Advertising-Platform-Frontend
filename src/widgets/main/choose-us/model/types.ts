export interface CardData {
  chaosLabel: string;
  systemLabel: string;
  chaosIcon: React.ReactNode;
  systemIcon: React.ReactNode;
  phase: number;
}

export interface CardState extends CardData {
  index: number;
  baseAngle: number;
  baseDist: number;
  px: number;
  py: number;
  rotation: number;
  /** Момент времени (t), когда карточка «подключилась» к орбите */
  connectTime: number;
  /** Флаг: карточка уже прошла порог подключения */
  connected: boolean;
  /** Порядковый номер для поочередного рандомного подключения */
  connectOrder: number;
}

export type HeroMode = "chaos" | "system";
