export interface ChatInputEditorProps {
  content: string;
  onChange: (content: string) => void;
  onSend: () => void;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
}

export interface LinkModalState {
  isOpen: boolean;
  url: string;
  text: string;
}
