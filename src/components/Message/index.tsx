import type { ReactNode } from "react";

type MessageProps = {
  children: ReactNode;
};

const Message = ({ children }: MessageProps) => {
  return (
    <div data-testid="message-box" className="md:text-lg">
      {children}
    </div>
  );
};

export default Message;
