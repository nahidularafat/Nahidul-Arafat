import { useState, useEffect } from "react";

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Generic hook to fetch data from a single API call function.
 * Usage: const { data, loading, error } = useApi(getProjects);
 */
export function useApi<T>(
  fetchFn: () => Promise<T>,
  deps: unknown[] = []
): ApiState<T> {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    setState({ data: null, loading: true, error: null });

    fetchFn()
      .then((data) => {
        if (!cancelled) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch((err) => {
        if (!cancelled) {
          const message =
            err?.response?.data?.detail ||
            err?.message ||
            "Failed to fetch data";
          setState({ data: null, loading: false, error: message });
          console.error("[API Error]", message, err);
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
