import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { FavoredListPage } from './pages/favored/list.page';
import { NewFavored } from './pages/favored/new.page';

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/new" component={NewFavored} />
        <Route path="/" exact component={FavoredListPage} />
      </Switch>
    </Router>
  );
};
