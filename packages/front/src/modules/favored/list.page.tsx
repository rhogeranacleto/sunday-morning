import { Box, Button, Modal, Snackbar } from '@material-ui/core';
import { DataGrid, GridRowId } from '@material-ui/data-grid';
import { Alert } from '@material-ui/lab';
import { useCallback, useState } from 'react';
import { COLUMNS } from './components/list/columns';
import { FavoredListSearchContainer } from './components/list/search-container.component';
import { EditFavoredModal } from './components/modal/modal.component';
import { RemoveDialog } from './components/remove-dialog.component';
import { IFavored, ISnackbarData } from './interfaces';
import * as favoredService from './service';
import { useFavoreds } from './use-favoreds.hook';

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
  const [snackbarData, setSnackbarData] = useState<ISnackbarData>();
  const [openDialog, setOpenDialog] = useState(false);

  const deleteMany = async () => {
    await favoredService.deleteMany(selection as string[]);
    await fetchFavoreds();
    closeDialog();
    setSnackbarData({
      text: 'Favorecido removido!',
      type: 'success',
    });
  };

  const closeModal = useCallback((snackbar?: ISnackbarData) => {
    setEditFavored(undefined);
    setSnackbarData(snackbar);
    snackbar && fetchFavoreds();
  }, []);
  const closeSnackbar = useCallback(() => setSnackbarData(undefined), []);
  const closeDialog = useCallback(() => setOpenDialog(false), []);

  return (
    <Box>
      <FavoredListSearchContainer search={search} setSearch={setSearch} />
      <Box padding={3} paddingTop={0}>
        <Box marginBottom={2}>
          <Button
            variant="contained"
            color="secondary"
            disabled={!selection.length}
            onClick={() => setOpenDialog(true)}
          >
            Excluir selecionados
          </Button>
        </Box>
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
          onCellClick={(e) => e.colIndex && setEditFavored(e.row as IFavored)}
        />
        <Modal open={Boolean(editFavored)} onClose={() => closeModal()}>
          <EditFavoredModal
            favored={editFavored as IFavored}
            closeModal={closeModal}
          />
        </Modal>
      </Box>
      <Snackbar
        open={Boolean(snackbarData)}
        autoHideDuration={5000}
        onClose={closeSnackbar}
      >
        <Alert onClose={closeSnackbar} severity={snackbarData?.type}>
          {snackbarData?.text}
        </Alert>
      </Snackbar>
      <RemoveDialog
        open={openDialog}
        closeDialog={closeDialog}
        remove={deleteMany}
      />
    </Box>
  );
};
