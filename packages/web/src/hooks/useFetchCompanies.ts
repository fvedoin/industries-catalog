import { useState, useEffect } from 'react';
import { fetchCompanies } from '../services/companies';
import { ICompany } from '../types';

export function useFetchCompanies() {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCompanies = async () => {
      try {
        setLoading(true);
        const { items, total } = await fetchCompanies();
        setCompanies(items);
        setTotal(total);
      } catch (err: unknown) {
        const knownError = err as Error;
        setError(knownError.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    getCompanies();
  }, []);

  return { companies, total, loading, error };
};
