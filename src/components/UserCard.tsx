import { twMerge } from "tailwind-merge";
import type { User } from "../types.ts";
import { useQuery } from "@tanstack/react-query";
import { getUserRepos } from "../utils/apiAdapter.ts";
import { HashLoader } from "react-spinners";
import RepoList from "./ReposList.tsx";
import { ChevronDown, ChevronRight } from "lucide-react";

type UserCardProps = {
  user: User;
  selectedUser?: User;
};

const UserCard = ({ user, selectedUser }: UserCardProps) => {
  const { id, login, avatar_url } = user;
  const isSelected = selectedUser?.id === id;

  const { data, isFetching, isFetched } = useQuery({
    queryKey: ["user-repos", selectedUser?.login || ""],
    queryFn: () => getUserRepos({ repos_url: selectedUser?.repos_url || "" }),
    enabled: !!selectedUser?.repos_url,
  });

  return (
    <div className="bg-autumn-300 rounded-md">
      <button className="flex items-center gap-x-2 cursor-pointer outline-none duration-500 h-18 w-full p-2">
        {isSelected ? <ChevronDown size={26} /> : <ChevronRight size={26} />}
        <span className="flex items-center gap-x-4 w-full">
          <img
            src={avatar_url}
            className="h-12 w-12 rounded-full border-1 border-autumn-500"
            alt={login}
          />
          <span className="capitalize font-semibold text-xl">{login}</span>
        </span>
      </button>
      <div
        className={twMerge("p-6 hidden overflow-hidden", isSelected && "block")}
      >
        <div>
          <HashLoader
            loading={isFetching}
            size={20}
            aria-label="Loading Spinner"
            cssOverride={{ display: "block", margin: "20px auto" }}
          />
          {data && data?.length > 0 && (
            <RepoList repos={data} username={login} />
          )}
          {isFetched && !data?.length && <span>No Public repos found </span>}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
