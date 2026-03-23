const BASE_URL = import.meta.env.VITE_API_BASE_URL ;
export const fetcher = async (path, options = {}) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const message = `Request failed: ${res.status} ${res.statusText}`;
    throw new Error(message);
  }

  return res.json();
};
