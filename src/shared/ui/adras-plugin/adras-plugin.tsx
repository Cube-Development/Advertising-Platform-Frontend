/**
 * Adras AI chat widget (Web Component).
 *
 * The custom element is registered by the loader script in index.html:
 *   <script defer src="https://plugin.adras.ai/plugin.js"></script>
 *
 * That loader only auto-inserts an <adras-plugin> of its own when the script
 * tag carries `data-org` / `data-api-token`. Ours carries neither, so React is
 * the sole owner of the element — which is what keeps the widget off /admin
 * and off the maintenance page (neither layout renders this component).
 *
 * Rendered inside RootLayout, so it appears on every non-admin page.
 */
export const AdrasPlugin = () => (
  <adras-plugin
    org="Blogix"
    name="Blogix"
    bgcolor="#7febe8"
    textcolor="#ffffff"
    accent="#7febe8"
  />
);
