import { getUserRepos } from "../utils/apiAdapter.ts";
import { useQuery } from "@tanstack/react-query";
import { type MouseEvent, useState } from "react";
import { Avatar } from "primereact/avatar";
import { Accordion, AccordionTab } from "primereact/accordion";
import RepoList from "./ReposList.tsx";
import { HashLoader } from "react-spinners";
import type { User } from "../types.ts";

type UserListProps = {
  searchTerm: string;
  users: User[];
};

const UserList = ({ users, searchTerm }: UserListProps) => {
  const [currentUser, setCurrentUser] = useState<User>();

  const { data, isFetching, isFetched } = useQuery({
    queryKey: ["user-repos", currentUser?.id || ""],
    queryFn: () => getUserRepos({ repos_url: currentUser?.repos_url || "" }),
    enabled: !!currentUser?.repos_url,
  });

  const handleUserClick = (_: MouseEvent<Element>, user: User) => {
    setCurrentUser(user);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div>Showing results matching: "{searchTerm}"</div>
      <Accordion>
        {users.map((user: User) => (
          <AccordionTab
            key={user.id}
            header={
              <span
                onClick={(e) => handleUserClick(e, user)}
                className="flex items-center gap-2 w-full"
              >
                <Avatar image={user.avatar_url} shape="circle" />
                <span className="capitalize">{user.login}</span>
              </span>
            }
          >
            <div>
              <HashLoader
                loading={isFetching}
                size={20}
                aria-label="Loading Spinner"
                cssOverride={{ display: "block", margin: "20px auto" }}
              />
              {isFetched && data && data?.length > 0 && (
                <RepoList repos={data} username={user.login} />
              )}
            </div>
          </AccordionTab>
        ))}
      </Accordion>
    </div>
  );
};

export default UserList;
