import type { UseFetchOptions } from "nuxt/app";

const userToken = useCookie("user-token");

export function useCustomFetch<T>(
  url: string,
  options: UseFetchOptions<T> = {}
) {
  console.log(userToken.value != undefined);
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
