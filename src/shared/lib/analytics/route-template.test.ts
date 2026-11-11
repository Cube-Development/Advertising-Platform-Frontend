import { describe, expect, it } from "vitest";
import { ENUM_PATHS } from "@shared/routing";
import { toRouteTemplate } from "./route-template";

describe("toRouteTemplate (спека 005 FR-002)", () => {
  it.each([
    ["/", "/"],
    ["/catalog", "/catalog"],
    ["/channel/7", "/channel/:id"],
    ["/project/42", "/project/:project_id"],
    ["/project/42/report", "/project/:project_id/report"],
    ["/guide/first-steps", "/guide/:guide_id"],
    ["/fullService", "/fullService"],
    ["/no/such/page", "*"],
    ["/admin/users", "*"],
  ])("%s → %s", (path, template) => {
    expect(toRouteTemplate(path)).toBe(template);
  });

  it("every ENUM_PATHS outside /admin resolves to itself: the page type table covers it (SC-001)", () => {
    for (const template of Object.values(ENUM_PATHS)) {
      if (template.startsWith("/admin") || template === ENUM_PATHS.NOT_FOUND) {
        continue;
      }
      const path = template.replace(/:[^/]+/g, "1");
      expect(toRouteTemplate(path), template).toBe(template);
    }
  });
});
