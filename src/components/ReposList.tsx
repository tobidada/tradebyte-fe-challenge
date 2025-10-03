import type { Repo } from "../types.ts";
import { Link } from "react-router";
import { Star, GitFork, Eye, ArrowRight } from "lucide-react";
import { twMerge } from "tailwind-merge";
import Tagline from "./Tagline.tsx";

type RepoListProps = {
  repos: Repo[];
  fullList?: boolean;
  username?: string;
};

const MAX_LIMIT = 10;

const RepoCard = ({ repo }: { repo: Repo }) => {
  return (
    <div className="flex flex-col gap-y-2 rounded p-2 bg-autumn-100 ">
      <div className="flex flex-col gap-y-2">
        <h2 className="font-semibold line-clamp-1 capitalize">{repo.name}</h2>
        {repo.description && (
          <h2 className="line-clamp-2 italic">{repo.description}</h2>
        )}
      </div>
      <div className="flex self-end items-center gap-x-4">
        <div className="flex items-center gap-x-1">
          <Eye size={20} strokeWidth={1} />
          <span className="font-semibold">{repo.watchers_count}</span>
        </div>
        <div className="flex items-center gap-x-1">
          <GitFork size={20} strokeWidth={1} />
          <span className="font-semibold">{repo.forks_count}</span>
        </div>
        <div className="flex items-center gap-x-1">
          <Star size={20} strokeWidth={1} />
          <span className="font-semibold">{repo.stargazers_count}</span>
        </div>
      </div>
    </div>
  );
};

const RepoList = ({ repos, fullList = false, username }: RepoListProps) => {
  const repositories = fullList ? repos : repos.slice(0, MAX_LIMIT);
  return (
    <>
      {fullList && (
        <Tagline text={`Public repos for GitHub user: "${username}"`} />
      )}
      <div
        className={twMerge(
          "flex flex-col gap-y-4",
          !fullList && "max-h-120 overflow-y-scroll scrollbar-hide",
        )}
      >
        {repositories.map((repo) => (
          <RepoCard repo={repo} key={repo.id} />
        ))}
      </div>
      {!fullList && repos.length > MAX_LIMIT && (
        <Link
          to={`/${username}/repos`}
          className="flex items-center justify-center gap-x-1.5 mt-4"
        >
          <span>See all</span>
          <ArrowRight size={18} />
        </Link>
      )}
    </>
  );
};

export default RepoList;
