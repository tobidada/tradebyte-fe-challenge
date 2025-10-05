import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "./index";

describe("Footer", () => {
  it("shows the current year and site name", () => {
    const currentYear = new Date().getFullYear();

    render(<Footer />);

    const text = screen.getByText(`© ${currentYear} Git Search`);
    expect(text).toBeInTheDocument();
  });
});
