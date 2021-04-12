import { Box, Grid, IconButton, Paper, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { FavoredForm } from './favored-form';
import { FavoredView } from './favored-view';
import { IFavored, ISnackbarData } from './interfaces';
import { StatusChips } from './status-chips';

interface IEditFavoredModalProps {
  favored: IFavored;
  closeModal: (snackbar?: ISnackbarData) => void;
}

export const EditFavoredModal = ({
  favored,
  closeModal,
}: IEditFavoredModalProps) => {
  const FormComponent = favored.draft ? FavoredForm : FavoredView;

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      style={{ height: '100%' }}
    >
      <Paper elevation={3}>
        <Box p={2}>
          <Grid container justify="space-between">
            <Typography variant="h5">{favored.name}</Typography>
            <IconButton size="small" onClick={() => closeModal()}>
              <Close />
            </IconButton>
          </Grid>
        </Box>
        <Box p={2}>
          <StatusChips draft={favored.draft} />
        </Box>
        <FormComponent favored={favored} closeModal={closeModal} />
      </Paper>
    </Grid>
  );
};
