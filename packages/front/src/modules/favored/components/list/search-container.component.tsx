import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@material-ui/core';
import { AddCircle, SearchOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';

interface IFavoredListSearchContainerProps {
  search: string;
  setSearch: (search: string) => void;
}

export const FavoredListSearchContainer = ({
  search,
  setSearch,
}: IFavoredListSearchContainerProps) => (
  <Box padding={3}>
    <Grid container justify="space-between" alignItems="center">
      <Grid item>
        <Grid container alignItems="center">
          <Typography variant="h6">Seus favorecidos</Typography>
          <Link to="/new" component={IconButton} color="primary">
            <AddCircle fontSize="large" />
          </Link>
        </Grid>
      </Grid>
      <FormControl variant="outlined">
        <InputLabel htmlFor="favored-search">
          Nome, CPF, agência ou conta
        </InputLabel>
        <OutlinedInput
          id="favored-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" edge="end">
                <SearchOutlined />
              </IconButton>
            </InputAdornment>
          }
          labelWidth={210}
        />
      </FormControl>
    </Grid>
  </Box>
);
