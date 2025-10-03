import type { ReactElement } from "react";

const PageContainer = ({ children }: { children: ReactElement }) => {
  return <div className="px-5">{children}</div>;
};

export default PageContainer;
