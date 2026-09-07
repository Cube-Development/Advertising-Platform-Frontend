const STORAGE_KEY = "edo-order-documents";
const TTL_MS = 7 * 24 * 60 * 60 * 1000;

export type EDOSignedDocKind = "invoice" | "act";

export type EDOOrderDocuments = {
  invoice?: {
    id: string;
    signedAt: string;
  };
  act?: {
    id: string;
    signedAt: string;
  };
};

type EDOStorage = Record<string, EDOOrderDocuments>;

const readAll = (): EDOStorage => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as EDOStorage;
  } catch {
    return {};
  }
};

const writeAll = (data: EDOStorage): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    return;
  }
};

const isExpired = (signedAt: string): boolean => {
  const signedAtMs = Date.parse(signedAt);
  if (Number.isNaN(signedAtMs)) return true;
  return Date.now() - signedAtMs > TTL_MS;
};

export const pruneExpired = (): void => {
  const all = readAll();
  let changed = false;

  for (const orderId of Object.keys(all)) {
    const docs = all[orderId];

    if (docs.invoice && isExpired(docs.invoice.signedAt)) {
      delete docs.invoice;
      changed = true;
    }

    if (docs.act && isExpired(docs.act.signedAt)) {
      delete docs.act;
      changed = true;
    }

    if (!docs.invoice && !docs.act) {
      delete all[orderId];
      changed = true;
    }
  }

  if (changed) writeAll(all);
};

export const get = (orderId: string): EDOOrderDocuments => {
  pruneExpired();
  return readAll()[orderId] ?? {};
};

export const setSigned = (
  orderId: string,
  kind: EDOSignedDocKind,
  id: string,
): void => {
  pruneExpired();
  const all = readAll();
  const current = all[orderId] ?? {};
  all[orderId] = {
    ...current,
    [kind]: {
      id,
      signedAt: new Date().toISOString(),
    },
  };
  writeAll(all);
};

export const clear = (orderId: string): void => {
  pruneExpired();
  const all = readAll();
  if (!(orderId in all)) return;
  delete all[orderId];
  writeAll(all);
};
