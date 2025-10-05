import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UserList from "./index.tsx";
import { getMockUserData } from "../../test/helper.ts";

describe("UsersList", () => {
  test("displays the search term in the message", () => {
    render(<UserList users={getMockUserData(1)} searchTerm="testquery" />);

    expect(screen.getByTestId("message-box")).toHaveTextContent(
      'Showing results matching: "testquery"',
    );
  });

  test("renders a UserCard for each user", () => {
    const users = getMockUserData(2);
    render(<UserList users={users} searchTerm="test" />);

    const userCards = screen.getAllByTestId("user-card");
    expect(userCards).toHaveLength(users.length);
    expect(userCards[0]).toHaveTextContent("login-0");
    expect(userCards[1]).toHaveTextContent("login-1");
  });
});
