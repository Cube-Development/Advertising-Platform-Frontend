// Сгенерировано из blogix-analytics@bb495bc, не редактировать
// Event environment by host, plan section 3 (FR-003).
import type { Env } from "./generated/contract-lite";

export const ENV_BY_HOST: Readonly<Record<string, Env>> = {
  "blogix.uz": "prod",
  "www.blogix.uz": "prod",
  "tdev.blogix.uz": "stage",
  "app.blogix.uz": "stage",
  localhost: "dev",
  "127.0.0.1": "dev",
};

/** `env` of `host`; a host outside the table → undefined (tracker off). */
export function resolveEnv(
  host: string,
  table: Readonly<Record<string, Env>> = ENV_BY_HOST,
): Env | undefined {
  return Object.prototype.hasOwnProperty.call(table, host)
    ? table[host]
    : undefined;
}
