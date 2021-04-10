import { Button } from '@material-ui/core';
import { DataGrid, GridRowId } from '@material-ui/data-grid';
import { useCallback, useEffect, useState } from 'react';
import { COLUMNS } from './list-columns';
import * as favoredService from './service';

const PAGE_SIZE = 10;

const useFavoreds = () => {
  const [favoreds, setFavoreds] = useState([]);
  const [totalRow, setTotalRow] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchFavoreds = useCallback(async () => {
    const skip = page * PAGE_SIZE;

    setLoading(true);

    const [rows, total] = await favoredService.getAll(skip);

    setFavoreds(rows);
    setTotalRow(total);

    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchFavoreds();
  }, [fetchFavoreds]);

  return { favoreds, totalRow, setPage, loading, page, fetchFavoreds };
};

export const FavoredListPage = () => {
  const {
    favoreds,
    totalRow,
    loading,
    page,
    setPage,
    fetchFavoreds,
  } = useFavoreds();
  const [selection, setSelection] = useState<GridRowId[]>([]);

  const deleteMany = async () => {
    await favoredService.deleteMany(selection as string[]);
    await fetchFavoreds();
  };

  return (
    <div style={{ height: '100%' }}>
      <Button
        variant="contained"
        color="secondary"
        disabled={!selection.length}
        onClick={deleteMany}
      >
        Excluir selecionados
      </Button>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          getRowId={(row) => row.id}
          rows={favoreds}
          columns={COLUMNS}
          pageSize={10}
          page={page}
          onPageChange={(params) => setPage(params.page)}
          pagination
          paginationMode="server"
          rowCount={totalRow}
          loading={loading}
          checkboxSelection
          onSelectionModelChange={(newSelection) =>
            setSelection(newSelection.selectionModel)
          }
          selectionModel={selection}
          autoHeight
        />
      </div>
    </div>
  );
};
