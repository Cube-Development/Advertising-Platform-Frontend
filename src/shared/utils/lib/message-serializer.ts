import { ContentType } from "@entities/project/config/createPostData";
import { IMess } from "@entities/communication/types/chat";

/**
 * Сериализует объект IMess в JSON-строку для передачи через WebSocket
 */
export const serializeMessage = (message: IMess): string => {
  return JSON.stringify(message);
};

/**
 * Десериализует данные из WebSocket в объект IMess
 * Обеспечивает обратную совместимость со старыми строковыми сообщениями
 */
export const deserializeMessage = (data: string | IMess): IMess => {
  // Если уже объект - возвращаем как есть
  if (typeof data === "object" && data !== null) {
    return data;
  }

  // Пытаемся распарсить JSON
  try {
    const parsed = JSON.parse(data);

    // Проверяем что это валидный IMess объект
    if (
      parsed &&
      typeof parsed === "object" &&
      "content_type" in parsed &&
      "content" in parsed
    ) {
      return parsed as IMess;
    }

    // Если JSON валиден, но не IMess - оборачиваем в IMess
    return {
      content_type: ContentType.text,
      content: data,
    };
  } catch {
    // Если не JSON - это старое строковое сообщение
    return {
      content_type: ContentType.text,
      content: data,
    };
  }
};
