import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PageContainer from "./index.tsx";

describe("Page Container", () => {
  it("renders children pased in", () => {
    render(
      <PageContainer>
        <div>Some random page content goes in here</div>
      </PageContainer>,
    );

    expect(screen.getByText(/random page content/i)).toBeInTheDocument();
  });
});
