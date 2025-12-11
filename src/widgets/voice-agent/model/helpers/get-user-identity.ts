// Получение userId или guestId из cookies
import Cookies from "js-cookie";

export function getUserIdentity(): string {
  const userId = Cookies.get("user_id");
  const guestId = Cookies.get("guest_id");

  return userId || guestId || `guest_${Math.floor(Math.random() * 10000)}`;
}
