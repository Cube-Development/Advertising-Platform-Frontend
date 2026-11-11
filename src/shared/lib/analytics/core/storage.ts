// Сгенерировано из blogix-analytics@bb495bc, не редактировать
// Storage access through safe() (FR-025): localStorage, document.cookie and JSON may throw (private
// mode, blocked storage, broken values); the tracker then works without them.

/** localStorage with a per-instance in-memory fallback. */
export interface Store {
  get(key: string): string | null;
  set(key: string, value: string): void;
  del(key: string): void;
}

/** Runs `fn`; any exception → `fallback`. */
export function safe<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch {
    return fallback;
  }
}

/** A failed write (blocked storage, full quota) stays in memory and is read from there (Q24). */
export function createStore(): Store {
  const memory = new Map<string, string>();
  return {
    get(key) {
      const kept = memory.get(key);
      return kept !== undefined
        ? kept
        : safe(() => localStorage.getItem(key), null);
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
        memory.delete(key);
      } catch {
        memory.set(key, value);
      }
    },
    del(key) {
      memory.delete(key);
      safe(() => localStorage.removeItem(key), undefined);
    },
  };
}

export function readJson<T>(store: Store, key: string): T | null {
  return safe(() => JSON.parse(store.get(key) ?? "null") as T | null, null);
}

export function writeJson(store: Store, key: string, value: unknown): void {
  store.set(key, JSON.stringify(value));
}

export function getCookie(name: string): string | null {
  return safe(() => {
    for (const part of document.cookie.split(";")) {
      const eq = part.indexOf("=");
      if (eq > 0 && part.slice(0, eq).trim() === name)
        return decodeURIComponent(part.slice(eq + 1).trim());
    }
    return null;
  }, null);
}

/** `name=value; Path=/; Max-Age=…; SameSite=Lax[; Secure]`: no Domain, no HttpOnly (FR-005). */
export function cookieString(
  name: string,
  value: string,
  maxAgeSec: number,
  secure: boolean,
): string {
  return `${name}=${value}; Path=/; Max-Age=${maxAgeSec}; SameSite=Lax${secure ? "; Secure" : ""}`;
}

export function setCookie(
  name: string,
  value: string,
  maxAgeSec: number,
  secure: boolean,
): void {
  safe(() => {
    document.cookie = cookieString(name, value, maxAgeSec, secure);
  }, undefined);
}
