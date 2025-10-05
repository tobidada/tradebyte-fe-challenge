export type User = {
  id: number;
  login: string;
  avatar_url: string;
  repos_url: string;
  url: string;
};

export type UsersResponse = {
  users?: User[];
};

export type Repo = {
  id: number;
  name: string;
  description?: string;
  url: string;
  html_url: string;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
};
