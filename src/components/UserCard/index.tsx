import { twMerge } from "tailwind-merge";
import type { User } from "../../types.ts";
import RepoList from "../RepoList";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";

type UserCardProps = {
  user: User;
  selectedUser?: User;
};

const UserCard = ({ user, selectedUser }: UserCardProps) => {
  const { id, login, avatar_url } = user;
  const isSelected = selectedUser?.id === id;
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef?.current && isSelected) {
      cardRef.current.scrollIntoView();
    }
  }, [cardRef, isSelected]);

  return (
    <div
      data-testid="user-card"
      className="bg-autumn-300 rounded-md"
      ref={cardRef}
    >
      <button className="flex items-center gap-x-2 cursor-pointer outline-none h-18 w-full p-2">
        <div className="w-6">
          {isSelected ? (
            <ChevronDown data-testid="down-arrow" size={26} />
          ) : (
            <ChevronRight data-testid="right-arrow" size={26} />
          )}
        </div>
        <div className="flex items-center gap-x-4 w-10/12">
          <img
            src={avatar_url}
            className="h-12 w-12 rounded-full border-1 border-autumn-500"
            alt={login}
          />
          <div className="capitalize font-semibold text-xl line-clamp-1">
            {login}
          </div>
        </div>
      </button>
      <div
        className={twMerge("p-6 hidden overflow-hidden", isSelected && "block")}
      >
        {isSelected && <RepoList username={login} />}
      </div>
    </div>
  );
};

export default UserCard;
