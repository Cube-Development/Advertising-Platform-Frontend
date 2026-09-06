import { describe, expect, test } from "vitest";
import {
  EXECUTOR_TYPE,
  MANAGE_EXECUTOR_TYPE_DEFAULT,
} from "../config/executorType";
import { buildManageProjectsBody } from "./buildManageProjectsBody";

describe("buildManageProjectsBody", () => {
  test("default executor_type = all", () => {
    const body = buildManageProjectsBody({
      page: 1,
      elements_on_page: 10,
      status: [6],
    });

    expect(body.executor_type).toBe(MANAGE_EXECUTOR_TYPE_DEFAULT);
    expect(body.executor_type).toBe(EXECUTOR_TYPE.ALL);
  });

  test("включает project_id и url только если заданы", () => {
    expect(
      buildManageProjectsBody({
        page: 1,
        elements_on_page: 10,
        status: [6],
        project_id: "proj-1",
        url: "https://t.me/x",
        executor_type: EXECUTOR_TYPE.ALL,
      }),
    ).toEqual({
      page: 1,
      elements_on_page: 10,
      status: [6],
      project_id: "proj-1",
      url: "https://t.me/x",
      executor_type: EXECUTOR_TYPE.ALL,
    });

    expect(
      buildManageProjectsBody({
        page: 1,
        elements_on_page: 10,
        status: [2],
      }),
    ).not.toHaveProperty("project_id");
  });
});
