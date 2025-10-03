import { type ChangeEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { searchUsers } from "../../utils/apiAdapter.ts";
import { HashLoader } from "react-spinners";
import UserList from "../UsersList.tsx";
import Tagline from "../Tagline.tsx";
import { X } from "lucide-react";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const trimmedSearchTerm = searchTerm.trim();

  const { data, isFetching, isFetched } = useQuery({
    queryKey: ["users", trimmedSearchTerm],
    queryFn: () => searchUsers({ searchTerm: trimmedSearchTerm }),
    enabled: trimmedSearchTerm.length > 0,
  });

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSearchParams({ q: value });
  };

  const handleInputClear = () => {
    setSearchTerm("");
    setSearchParams({ q: "" });
  };

  return (
    <div className="flex flex-col gap-y-4">
      <Tagline text="Find GitHub users and their public repos." />
      <div className="relative flex items-center h-16 w-full ">
        <div className="absolute right-3 h-5 w-5 place-items-center">
          <X onClick={handleInputClear} />
        </div>
        <input
          className="w-full h-full rounded-md border border-autumn-200 p-3 outline-0 bg-autumn-100"
          placeholder="username"
          onChange={handleSearchInputChange}
          name="search-input"
          value={searchTerm}
          type="text"
          autoComplete="off"
        />
      </div>

      <div>
        <HashLoader
          loading={isFetching}
          size={20}
          aria-label="Loading Spinner"
          cssOverride={{
            display: "block",
            margin: "20px auto",
          }}
        />
        <div>
          {data?.items && data?.items?.length > 0 && (
            <UserList users={data.items} searchTerm={searchTerm} />
          )}
          {isFetched && !data?.items?.length && <span>No users found</span>}
        </div>
      </div>
    </div>
  );
};

export default Home;
