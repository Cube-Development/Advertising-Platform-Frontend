export interface ChatInputEditorProps {
  content: string;
  onChange: (content: string) => void;
  onSend: () => void;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  /** При открытии/смене чата — автофокус в инпут (передай order_id или project_id) */
  chatKey?: string | number;
}

export interface LinkModalState {
  isOpen: boolean;
  url: string;
  text: string;
}
