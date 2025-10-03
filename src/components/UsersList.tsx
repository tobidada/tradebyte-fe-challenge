import { useState } from "react";
import type { User } from "../types.ts";
import UserCard from "./UserCard.tsx";

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
    <div className="flex flex-col gap-y-4">
      <div>Showing results matching: "{searchTerm}"</div>
      <div className="flex flex-col gap-y-2">
        {users.map((user: User) => (
          <div onClick={() => handleUserClick(user)}>
            <UserCard key={user.id} user={user} selectedUser={currentUser} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
