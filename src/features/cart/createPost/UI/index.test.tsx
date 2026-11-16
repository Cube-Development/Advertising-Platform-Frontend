import { ENUM_ROLES } from "@entities/user";
import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { CreatePost } from "./index";

const createPostAdvertiser = vi.fn(async () => undefined);

vi.mock("../model", () => ({
  useCreatePostAdvertiser: () => ({ createPostAdvertiser, isLoading: false }),
  useCreatePostManager: () => ({
    createPostManager: async () => undefined,
    isLoading: false,
  }),
}));

vi.mock("@features/user", () => ({
  LoginModal: ({ trigger }: { trigger: ReactNode }) => trigger,
}));

vi.mock("@shared/assets", () => ({ ArrowLongHorizontalIcon: () => null }));

vi.mock("@shared/hooks", async () => {
  const redux = await import("react-redux");
  return { useAppSelector: redux.useSelector };
});

// Настоящая кнопка без барреля shared/ui
vi.mock("@shared/ui", async () => ({
  MyButton: (await import("@shared/ui/MyBtn")).MyButton,
  AccountsLoader: () => null,
  useToast: () => ({ toast: vi.fn() }),
}));

const renderButton = (disabled?: boolean) =>
  render(
    <Provider
      store={configureStore({
        reducer: {
          user: () => ({ isAuth: true, role: ENUM_ROLES.ADVERTISER }),
        },
      })}
    >
      <CreatePost disabled={disabled} />
    </Provider>,
  );

const getButton = () =>
  screen.getByText("cart_btn.create_post").closest("button")!;

beforeEach(() => {
  createPostAdvertiser.mockClear();
});

describe("CreatePost (кнопка) — недоступна, пока ждём промокод", () => {
  test("disabled: кнопка выключена, нажатие проект не создаёт", () => {
    renderButton(true);

    expect(getButton().disabled).toBe(true);
    fireEvent.click(getButton());
    expect(createPostAdvertiser).not.toHaveBeenCalled();
  });

  test("без disabled кнопка создаёт проект", () => {
    renderButton();

    expect(getButton().disabled).toBe(false);
    fireEvent.click(getButton());
    expect(createPostAdvertiser).toHaveBeenCalled();
  });
});
