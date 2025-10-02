import { useQuery } from "@tanstack/react-query";
import { getUserRepos } from "../../utils/apiAdapter.ts";
import { HashLoader } from "react-spinners";
import RepoList from "../ReposList.tsx";
import { useLocation } from "react-router";

const AllRepos = () => {
  const { pathname } = useLocation();
  const username = pathname.slice(1).split("/").shift();

  const repos_url = `https://api.github.com/users/${username}/repos`;
  const { data, isFetching, isFetched } = useQuery({
    queryKey: ["user-repos", username],
    queryFn: () => getUserRepos({ repos_url }),
  });

  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <HashLoader
          loading={isFetching}
          size={20}
          aria-label="Loading Spinner"
          cssOverride={{ display: "block", margin: "20px auto" }}
        />
        {isFetched && data && data?.length > 0 && (
          <RepoList repos={data} fullList />
        )}
      </div>
    </div>
  );
};

export default AllRepos;
