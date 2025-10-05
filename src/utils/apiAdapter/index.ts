import type { Repo, UsersResponse } from "../../types.ts";

export const searchUsers = async ({
  searchTerm,
}: {
  searchTerm: string;
}): Promise<UsersResponse> => {
  try {
    const res = await fetch(
      `https://api.github.com/search/users?q=${searchTerm}&per_page=5`,
    );

    if (res.status === 403 || res.status >= 500) {
      throw new Error("RATE_LIMIT_ERROR");
    }

    if (!res.ok) {
      throw new Error("Error fetching users");
    }

    const json = await res.json();
    return { users: json.items };
  } catch (error) {
    if (error instanceof Error && error.message === "RATE_LIMIT_ERROR") {
      throw error;
    }

    return { users: [] };
  }
};

export const getUserRepos = async ({
  username,
  page,
  limit,
}: {
  username: string;
  page: number;
  limit: number;
}): Promise<Repo[]> => {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?page=${page}&per_page=${limit}`,
    );

    if (res.status === 403) {
      throw new Error("RATE_LIMIT_ERROR");
    }

    if (!res.ok) {
      throw new Error(`Failed to user repositories`);
    }

    return await res.json();
  } catch (error) {
    if (error instanceof Error && error.message === "RATE_LIMIT_ERROR") {
      throw error;
    }
    console.error("Error fetching user's repositories:", error);
    return [];
  }
};
