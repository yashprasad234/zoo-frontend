import type { UseFetchOptions } from "nuxt/app";

export function useCustomFetch<T>(
  url: string,
  options: UseFetchOptions<T> = {}
) {
  const userToken = useCookie("user-token");
  const defaults: UseFetchOptions<T> = {
    baseURL: "http://localhost:8080",
    headers:
      userToken.value != undefined
        ? {
            Authorization: `Bearer ${userToken.value}`,
          }
        : {},
  };
  let mergedOptions = {};
  options.headers = { ...options.headers, ...defaults.headers };
  mergedOptions = { ...defaults, ...options };
  return $fetch(url, mergedOptions);
}
