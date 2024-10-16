import type { UseFetchOptions } from "nuxt/app";

export function useCustomFetch<T>(
  url: string,
  options: UseFetchOptions<T> = {}
) {
  const defaults: UseFetchOptions<T> = {
    baseURL: "http://localhost:8080",
    headers: localStorage.getItem("user-token")
      ? {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        }
      : {},
  };
  let mergedOptions = {};
  options.headers = { ...options.headers, ...defaults.headers };
  mergedOptions = { ...defaults, ...options };
  return $fetch(url, mergedOptions);
}
