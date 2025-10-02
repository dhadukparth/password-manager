import { useEffect, useState } from "react";
import api from "../lib/axios";
import { PasswordType } from "../types";

export const apiGetIcons = () => {
  const [data, setData] = useState<PasswordType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchIcons = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<PasswordType[]>("/api/apk/icons");
      setData(res.data);
    } catch (err: any) {
      setError(err?.response?.data?.error || err.message || "Failed to fetch icons.");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIcons();
  }, []);

  return { loading, data, error, refresh: fetchIcons };
};
