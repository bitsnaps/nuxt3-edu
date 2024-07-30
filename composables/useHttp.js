import { createDiscreteApi } from "naive-ui";
export const fetchConfig = {
  baseURL: "http://demonuxtapi.dishait.cn/pc",
  headers: {
    appid: "bd9d01ecc75dbbaaefce",
  },
};

function useGetFetchOptions(options = {}) {
  options.baseURL = options.baseURL ?? fetchConfig.baseURL;
  options.headers = options.headers ?? {
    appid: fetchConfig.headers.appid,
  };
  options.initialCache = options.initialCache ?? false;
  options.lazy = options.lazy ?? false;

  // User login, default token
  const token = useCookie("token");
  if (token.value) {
    options.headers.token = token.value;
  }

  // Disable responsiveness
  if (options.body) {
    const rawBody = toRaw(options.body);
    options.body = typeof rawBody === "object" ? { ...rawBody } : rawBody;
  }

  return options;
}

export async function useHttp(key, url, options = {}) {
  options = useGetFetchOptions(options);
  options.key = key;

  if (options.$) {
    const data = ref(null);
    const error = ref(null);
    return await $fetch(url, options).then((res) => {
      data.value = res.data;
      return {
        data,
        error,
      };
    }).catch((err) => {
      const msg = err?.data?.data;
      if (process.client) {
        const { message } = createDiscreteApi(["message"]);
        message.error(msg || "Server Error");
      }
      error.value = msg;
      return {
        data,
        error,
      };
    });
  }

  let res = await useFetch(url, {
    ...options,
    // Equivalent to a response interceptor
    transform: (res) => {
      return res.data;
    },
  });

  // Client Error Handling
  if (process.client && res.error.value) {
    const msg = res.error.value?.data?.data;
    if (!options.lazy) {
      const { message } = createDiscreteApi(["message"]);
      message.error(msg || "Server Error");
    }
  }

  return res;
}

// GET request
export function useHttpGet(key, url, options = {}) {
  options.method = "GET";
  return useHttp(key, url, options);
}

// POST request
export function useHttpPost(key, url, options = {}) {
  options.method = "POST";
  return useHttp(key, url, options);
}
