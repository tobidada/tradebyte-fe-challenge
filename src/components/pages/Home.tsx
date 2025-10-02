import { type ChangeEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "../../utils/apiAdapter.ts";
import { HashLoader } from "react-spinners";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import UserList from "../UsersList.tsx";
import Tagline from "../Tagline.tsx";
// import {useSearchParams} from "react-router";

const Home = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState("");

  const { data, isFetching } = useQuery({
    queryKey: ["users", searchInput],
    queryFn: () => searchUsers({ searchTerm: searchInput }),
    enabled: !!searchInput,
  });

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    // setSearchParams(`?q=${value}`);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <Tagline text="Find any Github user and public repos." />
      <div className="p-inputgroup">
        <span className="p-inputgroup-addon">
          <i className="pi pi-at"></i>
        </span>
        <InputText
          onChange={handleSearchInputChange}
          name="search-input"
          value={searchInput}
          type="text"
          placeholder="Username"
        />
        <Button icon="pi pi-times" />
      </div>
      {/*<Button*/}
      {/*    label="Search"*/}
      {/*    style={{background: '#81591C'}}*/}
      {/*/>*/}
      <div className="">
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
            <UserList users={data.items} searchTerm={searchInput} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
