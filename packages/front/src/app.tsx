import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppToolbar } from './components/toolbar';
import { FavoredNew } from './pages/favored/favored-new';
import { FavoredListPage } from './pages/favored/list.page';

export const App = () => (
  <Router>
    <AppToolbar />
    <Switch>
      <Route path="/new" component={FavoredNew} />
      <Route path="/" exact component={FavoredListPage} />
    </Switch>
  </Router>
);
