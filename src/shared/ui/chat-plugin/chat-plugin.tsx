/**
 * Aidirekt AI chat widget (Web Component).
 * The custom element is registered by the loader script in index.html:
 *   <script defer src="https://plugin.aidirekt.uz/chat-plugin.js"></script>
 * Rendered inside RootLayout, so it appears on every non-admin page.
 */
export const ChatPlugin = () => (
  <chat-plugin
    org="Blogix"
    bgColor="#0ed8d4"
    textColor="#ffffff"
    name="Blogix"
  />
);
