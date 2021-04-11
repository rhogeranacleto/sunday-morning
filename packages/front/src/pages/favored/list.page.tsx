import { Button, IconButton, Modal, TextField } from '@material-ui/core';
import { DataGrid, GridRowId } from '@material-ui/data-grid';
import { AddCircle } from '@material-ui/icons';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { EditFavoredModal } from './edit-modal';
import { IFavored } from './interfaces';
import { COLUMNS } from './list-columns';
import * as favoredService from './service';

const PAGE_SIZE = 10;

const useFavoreds = () => {
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

export const FavoredListPage = () => {
  const {
    favoreds,
    totalRow,
    loading,
    page,
    setPage,
    fetchFavoreds,
    search,
    setSearch,
  } = useFavoreds();
  const [selection, setSelection] = useState<GridRowId[]>([]);
  const [editFavored, setEditFavored] = useState<IFavored | undefined>();

  const deleteMany = async () => {
    await favoredService.deleteMany(selection as string[]);
    await fetchFavoreds();
  };

  const closeModal = useCallback(() => setEditFavored(undefined), []);

  return (
    <div style={{ height: '100%' }}>
      <header>
        Seus favorecidos
        <Link to="/new" component={IconButton}>
          <AddCircle />
        </Link>
        <TextField
          id="favored-search"
          label="Nome, CPF, agência ou conta"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>
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
          onCellClick={(e) => setEditFavored(e.row as IFavored)}
        />
        <Modal open={Boolean(editFavored)} onClose={closeModal}>
          <EditFavoredModal
            favored={editFavored as IFavored}
            closeModal={closeModal}
          />
        </Modal>
      </div>
    </div>
  );
};
