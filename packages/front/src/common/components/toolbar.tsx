import { AppBar, Grid, Toolbar, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

export const AppToolbar = () => {
  const { pathname } = useLocation();

  const isNew = pathname === '/new';

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justify="space-between">
          <Typography variant="subtitle1">Seus favorecidos</Typography>
          {isNew && (
            <Link to="/">
              <Close style={{ color: 'white' }} />
            </Link>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
