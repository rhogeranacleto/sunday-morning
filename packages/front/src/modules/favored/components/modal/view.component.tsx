import {
  Box,
  Button,
  Grid,
  Icon,
  TextField,
  Typography,
} from '@material-ui/core';
import { useCallback, useState } from 'react';
import { IFavored, ISnackbarData } from '../../interfaces';
import * as favoredService from '../../service';
import { RemoveDialog } from '../remove-dialog.component';

interface IFavoredViewProps {
  favored: IFavored;
  closeModal: (snackbar?: ISnackbarData) => void;
}

export const FavoredView = ({ favored, closeModal }: IFavoredViewProps) => {
  const [email, setEmail] = useState(favored.email);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const upsert = async () => {
    try {
      await favoredService.upsert({
        ...favored,
        email,
      });

      closeModal({ text: 'Favorecido salvo', type: 'success' });
    } catch (e) {
      if (e.statusCode === 422) {
        setError(e.message[0]);
      }
    }
  };

  const remove = useCallback(async () => {
    await favoredService.deleteMany([favored.id as string]);
    closeDialog();
    closeModal({ text: 'Favorecido excluído!', type: 'success' });
  }, []);

  const closeDialog = useCallback(() => setOpenDialog(false), []);

  return (
    <Box p={2} minWidth={600}>
      <Box marginBottom={2}>
        <Typography variant="h6">CPF / CNPJ</Typography>
        <Typography variant="h5">{favored.cpf_cnpj}</Typography>
      </Box>
      <Box marginBottom={2}>
        <Grid container>
          <Grid item xs>
            <Typography variant="h6">Banco</Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="h6">Agência</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs>
            <Typography variant="h5">{favored.bank.name}</Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="h5">
              {favored.agency}-{favored.agencyDigit}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box marginBottom={2}>
        <Grid container>
          <Grid item xs>
            <Typography variant="h6">Tipo de conta</Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="h6">Conta poupança</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs>
            <Typography variant="h5">{favored.bankAccountType}</Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="h5">
              {favored.bankAccount}-{favored.bankAccountDigit}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box marginBottom={2}>
        <Grid container>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="favored-email"
              label="Qual o e-mail do favorecido?"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(error)}
              helperText={error}
            />
          </Grid>
        </Grid>
      </Box>
      <Grid container justify="space-between" spacing={5}>
        <Grid item xs>
          <Button onClick={() => closeModal()} variant="contained">
            Voltar
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() => setOpenDialog(true)}
            variant="contained"
            color="secondary"
            id="favored-remove"
          >
            <Icon>delete_forever_rounded</Icon>
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={upsert} variant="contained" color="primary">
            Salvar
          </Button>
        </Grid>
      </Grid>
      <RemoveDialog
        open={openDialog}
        closeDialog={closeDialog}
        remove={remove}
        name={favored.name}
      />
    </Box>
  );
};
