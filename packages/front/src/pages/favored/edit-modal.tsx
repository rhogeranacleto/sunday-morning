import { Grid, Paper } from '@material-ui/core';
import { FavoredForm } from './favored-form';
import { FavoredView } from './favored-view';
import { IFavored } from './interfaces';

interface IEditFavoredModalProps {
  favored: IFavored;
  closeModal: () => void;
}

export const EditFavoredModal = ({
  favored,
  closeModal,
}: IEditFavoredModalProps) => {
  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      style={{ height: '100%' }}
    >
      <Paper elevation={3}>
        {favored.draft ? (
          <FavoredForm favored={favored} closeModal={closeModal} />
        ) : (
          <FavoredView favored={favored} closeModal={closeModal} />
        )}
      </Paper>
    </Grid>
  );
};
