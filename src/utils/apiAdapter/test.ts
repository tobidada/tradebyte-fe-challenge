import { searchUsers, getUserRepos } from "./index.ts";
import { getMockUserData, getMockRepoData } from "../../test/helper.ts";

describe("searchUsers", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("returns users when request is successful", async () => {
    const mockUsers = getMockUserData(2);

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ items: mockUsers }),
    });

    const result = await searchUsers({ searchTerm: "octo" });
    expect(result.users).toEqual(mockUsers);
  });

  it("throws rate limit error on 403", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 403,
    });

    await expect(searchUsers({ searchTerm: "test" })).rejects.toThrow(
      "RATE_LIMIT_ERROR",
    );
  });

  it("returns empty users array on unknown error", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Error"));

    const result = await searchUsers({ searchTerm: "fail" });
    expect(result.users).toEqual([]);
  });
});

describe("getUserRepos", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("returns repos when request is successful", async () => {
    const mockRepos = getMockRepoData(2);

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockRepos,
    });

    const result = await getUserRepos({
      username: "username",
      page: 1,
      limit: 5,
    });

    expect(result).toEqual(mockRepos);
  });

  it("throws rate limit error on 403", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 403,
    });

    await expect(
      getUserRepos({ username: "username", page: 1, limit: 5 }),
    ).rejects.toThrow("RATE_LIMIT_ERROR");
  });
});
