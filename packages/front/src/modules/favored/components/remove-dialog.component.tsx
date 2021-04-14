import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

interface IRemoveDialogProps {
  open: boolean;
  closeDialog: () => void;
  remove: () => void;
  name?: string;
}

export const RemoveDialog = ({
  open,
  closeDialog,
  remove,
  name,
}: IRemoveDialogProps) => (
  <Dialog open={open} onClose={closeDialog}>
    <DialogTitle id="alert-dialog-title">Excluir favorecido?</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {name
          ? `Você confima a exclusão do favorecido ${name}`
          : `Você confima a exclusão desses favorecidos`}
        ?
      </DialogContentText>
      <DialogContentText id="alert-dialog-description">
        O histórico de pagamentos para este favorecido será mantido, mas ele
        será removido da sua lista de favorecidos.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={closeDialog} color="primary">
        Cancelar
      </Button>
      <Button onClick={remove} color="secondary" autoFocus>
        Confirmar exclusão
      </Button>
    </DialogActions>
  </Dialog>
);
