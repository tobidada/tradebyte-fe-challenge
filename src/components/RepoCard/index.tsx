import type { Repo } from "../../types.ts";
import { Link } from "react-router";
import { Eye, GitFork, Star } from "lucide-react";

const RepoCard = ({ repo }: { repo: Repo }) => {
  return (
    <Link
      to={repo.html_url}
      target="_blank"
      className="flex flex-col justify-between gap-y-2 rounded p-3 bg-autumn-100 xl:w-84"
      data-testid="repo-card"
    >
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
    </Link>
  );
};

export default RepoCard;
