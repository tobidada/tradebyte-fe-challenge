import type { Repo } from "../types.ts";

type RepoListProps = {
  repos: Repo[];
  fullList?: boolean;
  username?: string;
};

const RepoCard = ({ repo }: { repo: Repo }) => {
  return (
    <div className="flex flex-col gap-y-2 border-1 rounded justify-between p-1.5 h-32">
      <div className="flex flex-col gap-y-2">
        <h2 className="font-semibold line-clamp-1">{repo.name}</h2>
        <h2 className="line-clamp-2">{repo.description}</h2>
      </div>
      <div className="flex self-end items-center gap-x-4">
        <div className="flex items-center gap-x-1">
          <i className="pi pi-eye" style={{ fontSize: "1rem" }} />
          <span>{repo.watchers_count}</span>
        </div>
        <div className="flex items-center gap-x-1">
          <i className="pi pi-code" style={{ fontSize: "1rem" }} />
          <span>{repo.forks_count}</span>
        </div>
        <div className="flex items-center gap-x-1">
          <i className="pi pi-star-fill" style={{ fontSize: "1rem" }} />
          <span>{repo.stargazers_count}</span>
        </div>
      </div>
    </div>
  );
};

const RepoList = ({ repos, fullList = false, username }: RepoListProps) => {
  console.log(username);
  const repositories = fullList ? repos : repos.slice(0, 3);
  return (
    <div className="flex flex-col gap-y-4">
      {repositories.map((repo) => (
        <RepoCard repo={repo} key={repo.id} />
      ))}
      {!fullList && <a href={`/${username}/repos`}>See all ...</a>}
    </div>
  );
};

export default RepoList;
