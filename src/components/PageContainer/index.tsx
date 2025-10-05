import type { ReactNode } from "react";

const PageContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="px-5 m-auto max-w-xl md:max-w-2xl xl:max-w-3xl">
      {children}
    </div>
  );
};

export default PageContainer;
