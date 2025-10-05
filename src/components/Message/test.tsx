import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Message from "./index.tsx";

describe("Message", () => {
  it("renders children inside a div", () => {
    render(<Message>Test message</Message>);

    const messageElement = screen.getByText("Test message");
    expect(messageElement).toBeInTheDocument();
  });
});
