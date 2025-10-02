import { useCallback, useEffect, useState } from "react";
import api from "../lib/axios";
import { PasswordType } from "../types";

export const apiGetPasswords = () => {
  const [data, setData] = useState<PasswordType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPasswords = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<PasswordType[]>("/api/apk/password");
      setData(res.data);
    } catch (err: any) {
      setError(
        err?.response?.data?.error ||
          err.message ||
          "Failed to fetch passwords."
      );
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  return { loading, data, error, refresh: fetchPasswords };
};

export const apiPasswordActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addPassword = useCallback(async (password: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post<PasswordType>("/api/apk/password", password);
      if (res.status === 201) {
        return res.data;
      } else {
        throw new Error("Failed to add password.");
      }
    } catch (err: any) {
      setError(err?.response?.data?.error || err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deletePassword = useCallback(async (id: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.delete(`/api/apk/password?id=${id}`);
      if (res.status === 200) return true;
      throw new Error("Failed to delete password.");
    } catch (err: any) {
      setError(err?.response?.data?.error || err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, addPassword, deletePassword };
};
