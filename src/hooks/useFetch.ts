import { useState, useEffect, useRef } from 'react';

interface FetchResult<R> {
  data: R | null;
  error: Error | null;
  isLoading: boolean;
}

const useFetch = <R = unknown>(
  url: string,
  transformFn?: (data: string) => Promise<R>,
  options?: RequestInit,
): FetchResult<R> => {
  const [data, setData] = useState<R | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const abortCtrlRef = useRef<AbortController | null>(null);

  useEffect(() => {
    abortCtrlRef.current?.abort();
    const abortCtrl = new AbortController();
    abortCtrlRef.current = abortCtrl;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, { ...options, signal: abortCtrl.signal });
        if (!res.ok) {
          setError(new Error(`HTTP error! status: ${res.status}`));
          setData(null);
        } else {
          if (transformFn) {
            const raw = await res.text();
            const transformed = await transformFn(raw);
            setData(transformed);
          } else {
            const jsonData = await res.json();
            setData(jsonData);
          }
          setError(null);
        }
      } catch (err) {
        if (err instanceof Error) {
          if (err.name !== 'AbortError') {
            setError(err);
            setData(null);
          }
        } else {
          setError(new Error(String(err)));
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchData();

    return () => abortCtrl.abort();
  }, [url, options, transformFn]);

  return { data, error, isLoading: loading };
};

export default useFetch;
