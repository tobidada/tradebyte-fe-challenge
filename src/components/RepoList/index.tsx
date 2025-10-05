import type { Repo } from "../../types.ts";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { twMerge } from "tailwind-merge";
import Tagline from "../Tagline";
import { HashLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import { getUserRepos } from "../../utils/apiAdapter";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Message from "../Message";
import RepoCard from "../RepoCard";

type RepoListProps = {
  username: string;
  fullList?: boolean;
};

export const MAX_LIMIT = 10;
const FULLIST_MAX_LIMIT = 30;

const RepoList = ({ fullList = false, username }: RepoListProps) => {
  const [pageData, setPageData] = useState<{
    page: number;
    dataCount?: number;
  }>({ page: 1 });
  const [repos, setRepos] = useState<Repo[]>([]);

  const { data, isFetched, error } = useQuery({
    queryKey: ["user-repos", username, pageData.page],
    queryFn: () =>
      getUserRepos({
        username,
        page: pageData.page,
        limit: FULLIST_MAX_LIMIT,
      }),
    retry: false,
  });

  const errorMessage =
    error?.message === "RATE_LIMIT_ERROR"
      ? "We seemed to have reached our limit for now. Please try again in approximately 20 minutes."
      : "An error occurred. Please try again later.";

  useEffect(() => {
    if (data?.length) {
      const list = fullList ? data : data.slice(0, MAX_LIMIT);
      setRepos((prev) => Array.from(new Set([...prev, ...list])));
      setPageData((prev) => ({
        ...prev,
        dataCount: data.length,
      }));
    }
  }, [data, fullList]);

  const { ref, inView } = useInView({
    rootMargin: "500px",
  });

  useEffect(() => {
    if (inView) {
      if (pageData.dataCount === FULLIST_MAX_LIMIT) {
        setPageData((prev) => ({
          ...prev,
          page: prev.page + 1,
        }));
      }
    }
  }, [inView, pageData.dataCount]);

  return (
    <div data-testid="repo-list">
      {fullList && (
        <Tagline>
          Public repos for GitHub user: <b>"{username}"</b>
        </Tagline>
      )}
      {!isFetched && (
        <HashLoader
          size={20}
          aria-label="Loading Spinner"
          cssOverride={{ display: "block", margin: "20px auto" }}
        />
      )}
      {error && <Message>{errorMessage}</Message>}
      {isFetched && !error && !repos.length && (
        <Message>No Public repos found </Message>
      )}
      {repos.length > 0 && (
        <div
          className={twMerge(
            "flex flex-col xl:flex-row xl:flex-wrap gap-y-2 xl:gap-2 xl:justify-between",
            !fullList &&
              "max-h-120 md:max-h-full overflow-y-scroll scrollbar-hide",
          )}
        >
          {repos.map((repo) => (
            <RepoCard repo={repo} key={repo.id} />
          ))}
        </div>
      )}
      {!fullList && data && data?.length > MAX_LIMIT && (
        <Link
          to={`/${username}/repos`}
          className="flex items-center justify-center underline gap-x-1.5 mt-4"
        >
          <span>See all</span>
          <ArrowRight size={18} />
        </Link>
      )}
      {fullList && repos.length > 0 && (
        <div className="invisible" ref={ref}>
          Infinite Scroll Element
        </div>
      )}
    </div>
  );
};

export default RepoList;
