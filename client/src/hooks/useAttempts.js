// Fetches user attempts, supports refetch after logging

import { useState, useEffect, useCallback } from "react";
import { getAttempts } from "../api/attempts.api";

export function useAttempts(filters = {}) {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAttempts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAttempts(filters);
      setAttempts(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load attempts");
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]); // eslint-disable-line

  useEffect(() => {
    fetchAttempts();
  }, [fetchAttempts]);

  return { attempts, loading, error, refetch: fetchAttempts };
}
