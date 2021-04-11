import { Grid, Paper } from '@material-ui/core';
import { FavoredForm } from './favored-form';

interface IEditFavoredModalProps {
  favored: any;
}

export const EditFavoredModal = ({ favored }: IEditFavoredModalProps) => {
  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      style={{ height: '100%' }}
    >
      <Paper elevation={3}>
        {favored.draft ? <FavoredForm favored={favored} /> : <div>oi</div>}
      </Paper>
    </Grid>
  );
};
