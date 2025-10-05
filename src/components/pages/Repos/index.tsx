import RepoList from "../../RepoList";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";

const AllRepos = () => {
  const navigate = useNavigate();
  const { username } = useParams<{ username: string }>();

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <button
        onClick={handleBackButtonClick}
        className="flex items-center gap-x-1.5 mt-4 w-max underline cursor-pointer"
      >
        <ArrowLeft size={18} />
        <span>Previous Search</span>
      </button>
      <RepoList username={username || ""} fullList />
    </div>
  );
};

export default AllRepos;
