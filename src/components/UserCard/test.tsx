import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UserCard from "./index.tsx";
import { useQuery } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import { getMockRepoData } from "../../test/helper.ts";

const mockUser = {
  id: 1,
  login: `login-id`,
  avatar_url: `https://avatar-url}`,
  url: `https://url}`,
  repos_url: `https://repos-url`,
};

jest.mock("@tanstack/react-query");
jest.mock("react-intersection-observer", () => ({
  useInView: () => ({
    ref: jest.fn(),
    inView: false,
  }),
}));

describe("UserCard", () => {
  test("renders user avatar, login, and ChevronRight when not selected", () => {
    render(<UserCard user={mockUser} selectedUser={undefined} />);

    const avatar = screen.getByAltText("login-id");
    const name = screen.getByText(/login-id/i);
    const arrowRight = screen.getByTestId("right-arrow");

    expect(avatar).toHaveAttribute("src", mockUser.avatar_url);
    expect(name).toBeInTheDocument();
    expect(arrowRight).toBeInTheDocument();
    expect(screen.queryByTestId("repo-list")).not.toBeInTheDocument();
  });

  test("shows RepoList and correct arrow when selected", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isFetched: true,
      data: getMockRepoData(2),
      error: null,
    });

    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    render(
      <BrowserRouter>
        <UserCard user={mockUser} selectedUser={mockUser} />
      </BrowserRouter>,
    );

    expect(screen.getByTestId("down-arrow")).toBeInTheDocument();
    expect(screen.queryByTestId("repo-list")).toBeInTheDocument();
  });

  test("does not show RepoList when another user is selected", () => {
    const anotherUser = { ...mockUser, id: 2, login: "another-login" };

    render(<UserCard user={mockUser} selectedUser={anotherUser} />);

    expect(screen.queryByTestId("repo-list")).not.toBeInTheDocument();
    expect(screen.getByTestId("right-arrow")).toBeInTheDocument();
  });
});
