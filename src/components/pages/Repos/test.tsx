import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Repos from "./index.tsx";
import { useQuery } from "@tanstack/react-query";
import { getMockRepoData } from "../../../test/helper.ts";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ username: "test-user" }),
  };
});

jest.mock("@tanstack/react-query");
jest.mock("react-intersection-observer", () => ({
  useInView: () => ({
    ref: jest.fn(),
    inView: false,
  }),
}));

describe("Repos Page", () => {
  beforeEach(() => {
    mockNavigate.mockClear();

    (useQuery as jest.Mock).mockReturnValue({
      isFetched: true,
      data: getMockRepoData(1),
      error: null,
    });
  });

  it("renders the 'Previous Search' button", () => {
    render(
      <BrowserRouter>
        <Repos />
      </BrowserRouter>,
    );

    expect(
      screen.getByRole("button", { name: /previous search/i }),
    ).toBeInTheDocument();
  });

  it("renders RepoList with correct props", () => {
    render(
      <BrowserRouter>
        <Repos />
      </BrowserRouter>,
    );

    expect(screen.queryByTestId("repo-list")).toBeInTheDocument();
  });
});
