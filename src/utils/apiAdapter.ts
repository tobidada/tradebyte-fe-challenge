import type { Repo, UsersResponse } from "../types.ts";

export const searchUsers = async ({
  searchTerm,
  count = 5,
}: {
  searchTerm: string;
  count?: number;
}): Promise<UsersResponse | null> => {
  try {
    const url = `https://api.github.com/search/users?q=${searchTerm}&per_page=${count}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch users`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching users data:", error);
    return null;
  }
};

export const getUserRepos = async ({
  repos_url,
}: {
  repos_url: string;
}): Promise<Repo[] | null> => {
  try {
    const res = await fetch(repos_url);

    if (!res.ok) {
      throw new Error(`Failed to user repositories`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching user's repositories:", error);
    return null;
  }
};
