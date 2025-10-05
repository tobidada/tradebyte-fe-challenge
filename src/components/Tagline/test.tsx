import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Tagline from "./index.tsx";

describe("Tagline", () => {
  it("renders the `text` prop when provided", () => {
    render(<Tagline text="Welcome to Git Search" />);

    const tagline = screen.getByRole("heading", { level: 1 });
    expect(tagline).toHaveTextContent("Welcome to Git Search");
  });

  it("renders children when `text` is not provided", () => {
    render(
      <Tagline>
        <span>Search your favorite repos</span>
      </Tagline>,
    );

    const tagline = screen.getByRole("heading", { level: 1 });
    expect(tagline).toHaveTextContent("Search your favorite repos");
  });
});
