import type { ReactNode } from "react";

type TaglineProps = {
  text?: string;
  children?: ReactNode;
};

const Tagline = ({ text, children }: TaglineProps) => {
  return (
    <h1 className="text-3xl md:text-4xl text-center italic my-6 m-auto max-w-md md:max-w-lg">
      {text || children}
    </h1>
  );
};

export default Tagline;
