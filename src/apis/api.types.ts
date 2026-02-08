export type FetchConfig = RequestInit & {
  params?: Record<string, string>;
  skipRedirectOn401?: boolean;
};
