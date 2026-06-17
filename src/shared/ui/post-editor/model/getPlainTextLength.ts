import { Editor } from "@tiptap/react";
import { Node as ProseMirrorNode } from "@tiptap/pm/model";

const LEAF_SEPARATOR = "\n";

export const normalizePlainText = (text: string): string =>
  text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

export const getPlainTextLengthFromString = (text: string): number =>
  normalizePlainText(text).length;

export const truncatePlainText = (text: string, maxLength: number): string => {
  const normalized = normalizePlainText(text);
  if (normalized.length <= maxLength) return normalized;
  return normalized.slice(0, maxLength);
};

export const plainTextToEditorHtml = (text: string): string =>
  normalizePlainText(text).replace(/\n/g, "<br>");

export const getPlainTextLengthFromDoc = (doc: ProseMirrorNode): number =>
  doc.textBetween(0, doc.content.size, LEAF_SEPARATOR, LEAF_SEPARATOR).length;

export const getPlainTextLength = (editor: Editor): number =>
  getPlainTextLengthFromDoc(editor.state.doc);

export const truncateEditorToMaxLength = (
  editor: Editor,
  maxLength: number,
): void => {
  let guard = 0;
  const maxIterations = 10000;

  while (getPlainTextLength(editor) > maxLength && guard < maxIterations) {
    guard += 1;
    const { doc } = editor.state;
    let pos = doc.content.size - 1;
    let deleted = false;

    while (pos > 0 && !deleted) {
      const $pos = doc.resolve(pos);
      const nodeBefore = $pos.nodeBefore;

      if (nodeBefore?.isText && nodeBefore.text && nodeBefore.text.length > 0) {
        editor.commands.deleteRange({ from: pos - 1, to: pos });
        deleted = true;
      } else if (nodeBefore?.type.name === "hardBreak") {
        editor.commands.deleteRange({ from: pos - 1, to: pos });
        deleted = true;
      } else {
        pos -= 1;
      }
    }

    if (!deleted) break;
  }
};
