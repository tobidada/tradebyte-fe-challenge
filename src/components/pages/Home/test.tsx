import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "./index.tsx";
import { BrowserRouter } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getMockUserData } from "../../../test/helper.ts";

jest.mock("@tanstack/react-query");

describe("Home Page", () => {
  test("renders search input with placeholder", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isFetched: true,
      data: { users: getMockUserData(1) },
      error: null,
    });

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
    const input = screen.getByPlaceholderText(/username/i);
    expect(input).toBeInTheDocument();
  });

  test("displays user list when data is fetched", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isFetched: true,
      data: { users: getMockUserData(1) },
      error: null,
    });

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
    const userList = screen.getByTestId("user-list");
    expect(userList).toHaveTextContent("login-");
  });

  test("show loader while fetching", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isFetched: false,
      isFetching: true,
      data: undefined,
      error: null,
    });

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
    const loader = screen.getByLabelText(/loading spinner/i);
    expect(loader).toBeInTheDocument();
  });

  test("shows failure count message", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isFetched: false,
      isFetching: true,
      failureCount: 1,
      data: undefined,
      error: null,
    });

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
    const message = screen.getByTestId("message-box");
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent("Taking longer than usual");
  });

  test("shows message when no users are found", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { users: [] },
      isFetching: false,
      isFetched: true,
      failureCount: 0,
    });

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
    const message = screen.getByTestId("message-box");
    expect(message).toHaveTextContent("No users found");
  });
});
