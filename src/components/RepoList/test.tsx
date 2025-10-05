import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import RepoList, { MAX_LIMIT } from "./index";
import { useQuery } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import { getMockRepoData } from "../../test/helper.ts";

jest.mock("@tanstack/react-query");
jest.mock("react-intersection-observer", () => ({
  useInView: () => ({
    ref: jest.fn(),
    inView: false,
  }),
}));

describe("RepoList", () => {
  test("renders loading spinner initially", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isFetched: false,
      data: undefined,
      error: null,
    });

    render(<RepoList username="testuser" />);
    expect(screen.getByLabelText(/loading spinner/i)).toBeInTheDocument();
  });

  describe("Error message", () => {
    test("shows rate limit error message when limit error is thrown", () => {
      (useQuery as jest.Mock).mockReturnValue({
        isFetched: true,
        data: undefined,
        error: { message: "RATE_LIMIT_ERROR" },
      });

      render(<RepoList username="testuser" />);

      expect(
        screen.getByText(/we seemed to have reached our limit for now/i),
      ).toBeInTheDocument();
    });

    test("shows default error message when error occurs", () => {
      (useQuery as jest.Mock).mockReturnValue({
        isFetched: true,
        data: undefined,
        error: { message: "ERROR" },
      });

      render(<RepoList username="testuser" />);

      expect(screen.getByText(/please try again later/i)).toBeInTheDocument();
    });
  });

  test("shows empty list message when data is empty", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isFetched: true,
      data: [],
      error: null,
    });

    render(<RepoList username="testuser" />);
    expect(screen.getByText(/No Public repos found/i)).toBeInTheDocument();
  });

  test("shows repo list when data is available", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      isFetched: true,
      data: getMockRepoData(2),
      error: null,
    });

    render(
      <BrowserRouter>
        <RepoList username="testuser" />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("repo-card")).toHaveLength(2);
    });
  });

  describe('"See all" Link', () => {
    test(`shows 'See all' link when repos exceeds ${MAX_LIMIT} and fullList is set to false`, async () => {
      (useQuery as jest.Mock).mockReturnValue({
        isFetched: true,
        data: getMockRepoData(11),
        error: null,
      });

      render(
        <BrowserRouter>
          <RepoList username="testuser" />
        </BrowserRouter>,
      );
      expect(screen.getByText("See all")).toBeInTheDocument();
    });

    test(`hides 'See all' link when repos exceeds ${MAX_LIMIT} and fullList is set to true`, async () => {
      (useQuery as jest.Mock).mockReturnValue({
        isFetched: true,
        data: getMockRepoData(11),
        error: null,
      });

      render(
        <BrowserRouter>
          <RepoList username="testuser" fullList />
        </BrowserRouter>,
      );
      expect(screen.queryByText(/see all/i)).not.toBeInTheDocument();
    });
  });
});
