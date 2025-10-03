import { useQuery } from "@tanstack/react-query";
import { getUserRepos } from "../../utils/apiAdapter.ts";
import { HashLoader } from "react-spinners";
import RepoList from "../ReposList.tsx";
import { useLocation, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

const AllRepos = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const username = pathname.slice(1).split("/").shift();

  const repos_url = `https://api.github.com/users/${username}/repos`;
  const { data, isFetching, isFetched } = useQuery({
    queryKey: ["user-repos", username],
    queryFn: () => getUserRepos({ repos_url }),
  });

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <button
        onClick={handleBackButtonClick}
        className="flex items-center gap-x-1.5 mt-4"
      >
        <ArrowLeft size={18} />
        <span> Go back to Search</span>
      </button>
      <div>
        <HashLoader
          loading={isFetching}
          size={20}
          aria-label="Loading Spinner"
          cssOverride={{ display: "block", margin: "20px auto" }}
        />
        {isFetched && data && data?.length > 0 && (
          <RepoList repos={data} username={username} fullList />
        )}
      </div>
    </div>
  );
};

export default AllRepos;
