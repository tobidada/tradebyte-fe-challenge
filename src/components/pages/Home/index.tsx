import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { searchUsers } from "../../../utils/apiAdapter";
import { HashLoader } from "react-spinners";
import UserList from "../../UsersList";
import Tagline from "../../Tagline";
import { X, AtSign } from "lucide-react";
import { useSpinDelay } from "spin-delay";
import Message from "../../Message";

const GITHUB_RATE_LIMIT_DELAY = 20000; // 20s, Actual rate limit reset time is 60s.

const failureCountMessages = [
  "Taking longer than usual. Please hold on...",
  "Just a little while longer...",
  "We're almost there, apologiies...",
];

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [trimmedSearchTerm, setTrimmedSearchTerm] = useState("");

  const query = searchParams.get("q") || "";

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setTrimmedSearchTerm(query.trim());
    }, 500);

    return () => window.clearTimeout(timeout);
  }, [query, searchParams]);

  const { data, isFetching, isFetched, failureCount } = useQuery({
    queryKey: ["users", trimmedSearchTerm],
    queryFn: () => searchUsers({ searchTerm: trimmedSearchTerm }),
    enabled: trimmedSearchTerm.length > 0,
    retryDelay: GITHUB_RATE_LIMIT_DELAY,
    retry: 3,
  });

  const showLoader = useSpinDelay(isFetching, { delay: 10, minDuration: 1000 });

  return (
    <div className="flex flex-col gap-y-4">
      <Tagline text="Find GitHub users and their public repos." />
      <div className="relative flex items-center h-16 w-full md:max-w-lg md:self-center">
        <div className="flex items-center absolute left-3 h-5 w-5">
          <AtSign size={18} strokeWidth={1} />
        </div>
        <input
          className="w-full h-full rounded-md border border-autumn-200 px-9 mb-1 outline-0 bg-autumn-100 placeholder-autumn-400 text-lg md:text-xl"
          placeholder="username"
          onChange={(e) => setSearchParams({ q: e.target.value })}
          name="search-input"
          value={query}
          type="text"
          autoComplete="off"
          disabled={failureCount > 1}
        />
        <button className="flex items-center absolute right-3 h-5 w-5 cursor-pointer">
          <X strokeWidth={3} onClick={() => setSearchParams({ q: "" })} />
        </button>
      </div>

      <div>
        {showLoader ? (
          <>
            <HashLoader
              size={20}
              aria-label="Loading Spinner"
              cssOverride={{
                display: "block",
                margin: "20px auto",
              }}
            />
            {failureCount > 0 && (
              <Message>{failureCountMessages[failureCount - 1]}</Message>
            )}
          </>
        ) : (
          <div>
            {isFetched && data?.users && data?.users?.length > 0 && (
              <UserList users={data.users} searchTerm={query} />
            )}
            {isFetched && !data?.users?.length && (
              <Message>No users found</Message>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
