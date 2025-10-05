export const getMockRepoData = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    name: `Repo name ${i}`,
    description: `Repo description ${i}`,
    url: `https://repo-url/${i}`,
    html_url: `https://repo-html-url/${i}`,
    forks_count: 100,
    stargazers_count: 200,
    watchers_count: 300,
  }));
};

export const getMockUserData = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    login: `login-${i}`,
    avatar_url: `https://avatar-url/${i}`,
    url: `https://url/${i}`,
    repos_url: `https://repos-url/${i}`,
  }));
};
