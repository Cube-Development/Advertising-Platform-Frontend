// Сгенерировано из blogix-analytics@bb495bc, не редактировать
// POST of one batch body (FR-014, research R9): sendBeacon when the tab hides or the page unloads,
// otherwise (or when the beacon is refused or missing) fetch with keepalive. text/plain avoids a CORS
// preflight.
import { safe } from "./storage";

/** true — done (2xx, 4xx, beacon accepted); false — keep the events in the reserve (5xx, network). */
export function sendBody(
  url: string,
  body: string,
  beacon: boolean,
): Promise<boolean> {
  if (beacon && safe(() => navigator.sendBeacon(url, body), false))
    return Promise.resolve(true);
  return Promise.resolve()
    .then(() =>
      fetch(url, {
        method: "POST",
        body,
        keepalive: true,
        headers: { "Content-Type": "text/plain" },
      }),
    )
    .then(
      (response) => response.status < 500,
      () => false,
    );
}
