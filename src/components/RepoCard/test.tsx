import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RepoCard from "./index";
import { BrowserRouter } from "react-router";

const mockData = {
  id: 1,
  name: `Repo name`,
  description: `Repo description`,
  url: `https://repo-url`,
  html_url: `https://repo-html-url`,
  forks_count: 113,
  stargazers_count: 131,
  watchers_count: 311,
};

describe("RepoCard", () => {
  test("shows repo name and description when available", () => {
    render(
      <BrowserRouter>
        <RepoCard repo={mockData} />
      </BrowserRouter>,
    );

    expect(screen.getByText(/Repo name/i)).toBeInTheDocument();
    expect(screen.getByText(/Repo description/i)).toBeInTheDocument();
  });

  test("shows correct numbers for forks, watchers and stars", () => {
    render(
      <BrowserRouter>
        <RepoCard repo={mockData} />
      </BrowserRouter>,
    );

    expect(screen.getByText("113")).toBeInTheDocument();
    expect(screen.getByText("131")).toBeInTheDocument();
    expect(screen.getByText("311")).toBeInTheDocument();
  });

  it("renders repo cards as links with correct href and target", () => {
    render(
      <BrowserRouter>
        <RepoCard repo={mockData} />
      </BrowserRouter>,
    );

    const link = screen.getByTestId("repo-card");
    expect(link).toHaveAttribute("href", mockData.html_url);
    expect(link).toHaveAttribute("target", "_blank");
  });
});
