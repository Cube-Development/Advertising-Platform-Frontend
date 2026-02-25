import { useEffect } from "react";

export const withHeight = (Component: React.FC) => {
  const WithHeightWrapper: React.FC = (props) => {
    const setFullHeight = () => {
      const vh = window.innerHeight * 0.01;
      window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      });
    };

    useEffect(() => {
      setFullHeight();
      window.addEventListener("resize", setFullHeight);

      return () => {
        window.removeEventListener("resize", setFullHeight);
      };
    }, []);

    useEffect(() => {
      const metaViewport = document.querySelector('meta[name="viewport"]');
      if (metaViewport) {
        metaViewport.setAttribute(
          "content",
          "width=device-width, initial-scale=1.0",
        );
      }
    }, []);

    return (
      <div style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}>
        <Component {...props} />
      </div>
    );
  };

  return WithHeightWrapper;
};
