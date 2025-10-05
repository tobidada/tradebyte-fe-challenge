import { useState } from "react";
import type { User } from "../../types.ts";
import UserCard from "../UserCard";
import Message from "../Message";

type UserListProps = {
  searchTerm: string;
  users: User[];
};

const UserList = ({ users, searchTerm }: UserListProps) => {
  const [currentUser, setCurrentUser] = useState<User>();

  const handleUserClick = (user: User) => {
    const value = user.id === currentUser?.id ? undefined : user;
    setCurrentUser(value);
  };

  return (
    <div data-testid="user-list" className="flex flex-col gap-y-4">
      <Message>
        Showing results matching: <b>"{searchTerm}"</b>
      </Message>
      <div className="flex flex-col gap-y-2">
        {users.map((user: User) => (
          <div key={user.id} onClick={() => handleUserClick(user)}>
            <UserCard user={user} selectedUser={currentUser} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
