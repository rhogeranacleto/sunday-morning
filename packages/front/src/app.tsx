import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppToolbar } from './common/components/toolbar';
import { FavoredListPage } from './modules/favored/list.page';
import { FavoredNewPage } from './modules/favored/new.page';

export const App = () => (
  <Router>
    <AppToolbar />
    <Switch>
      <Route path="/new" component={FavoredNewPage} />
      <Route path="/" exact component={FavoredListPage} />
    </Switch>
  </Router>
);
