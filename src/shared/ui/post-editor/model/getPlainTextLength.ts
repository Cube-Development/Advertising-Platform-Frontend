import { Editor } from "@tiptap/react";
import { Node as ProseMirrorNode } from "@tiptap/pm/model";

const LEAF_SEPARATOR = "\n";

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
