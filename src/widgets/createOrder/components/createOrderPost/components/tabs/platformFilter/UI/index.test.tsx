import {
  platformTypes,
  platformTypesNum,
  PostTypesNum,
} from "@entities/platform";
import { render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { PlatformFilter } from "./index";

// Баррель платформы тянет UI превью и через него API по кругу — нужен только конфиг
vi.mock("@entities/platform", () => import("@entities/platform/config/config"));

const site = platformTypes.find((item) => item.id === platformTypesNum.site)!;

describe("PlatformFilter", () => {
  test("site orders (post_type 5) select the site post type", () => {
    const setValue = vi.fn();

    render(
      <PlatformFilter
        platforms={[platformTypesNum.site]}
        setValue={setValue}
        formats={[
          { platform: platformTypesNum.site, post_types: [PostTypesNum.site] },
        ]}
        platformFilter={site}
      />,
    );

    // Без site = 5 в конфиге платформы список типов пуст и тип поста —
    // undefined: редактор поста для сайта не появляется
    expect(setValue).toHaveBeenCalledWith(
      "selectedPostType",
      PostTypesNum.site,
    );
  });
});
