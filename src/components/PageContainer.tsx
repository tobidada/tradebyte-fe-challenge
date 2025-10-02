import type { ReactElement } from "react";

const PageContainer = ({ children }: { children: ReactElement }) => {
  return <div className="px-2">{children}</div>;
};

export default PageContainer;
