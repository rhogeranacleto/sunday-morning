import { useState, useCallback, useEffect } from 'react';
import { IFavored } from './interfaces';
import * as favoredService from './service';

const PAGE_SIZE = 10;

export const useFavoreds = () => {
  const [favoreds, setFavoreds] = useState<IFavored[]>([]);
  const [totalRow, setTotalRow] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const fetchFavoreds = useCallback(async () => {
    const skip = page * PAGE_SIZE;

    setLoading(true);

    const [rows, total] = await favoredService.getAll(skip, search);

    setFavoreds(rows);
    setTotalRow(total);

    setLoading(false);
  }, [page, search]);

  useEffect(() => {
    fetchFavoreds();
  }, [fetchFavoreds]);

  return {
    favoreds,
    totalRow,
    setPage,
    loading,
    page,
    fetchFavoreds,
    search,
    setSearch,
  };
};
