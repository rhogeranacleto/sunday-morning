import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { FavoredForm } from './pages/favored/favored-form';
import { FavoredListPage } from './pages/favored/list.page';

export const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="subtitle1">Seus favorecidos</Typography>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path="/new" component={FavoredForm} />
        <Route path="/" exact component={FavoredListPage} />
      </Switch>
    </Router>
  );
};
