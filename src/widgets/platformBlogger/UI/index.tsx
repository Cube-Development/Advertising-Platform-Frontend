import React, { FC } from "react";

interface PlatformBloggerProps {
  children: React.ReactNode;
}

export const PlatformBlogger: FC<PlatformBloggerProps> = ({ children }) => {
  return <div>{children}</div>;
};
