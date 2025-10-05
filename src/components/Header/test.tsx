import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "./index";
import { BrowserRouter } from "react-router";

describe("Header", () => {
  it("renders a header element", () => {
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();
  });

  it("links correctly to the homepage", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    const homeLink = screen.getByRole("link", { name: /go to homepage/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
