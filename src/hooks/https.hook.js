import { useState, useCallback } from "react";

const useHttps = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const request = useCallback(async (url) => {
    setError(false);
    setLoading(true);

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Error ");
      }
      const {data} = await res.json();
      setLoading(false);
      return data
    } catch (err) {
      setError(true);
      setLoading(false);
      throw err;
    }
  }, []);

  return [loading, error, request];
};

export default useHttps;
