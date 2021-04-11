import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { FavoredForm } from './pages/favored/favored-form';
import { FavoredListPage } from './pages/favored/list.page';

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/new" component={FavoredForm} />
        <Route path="/" exact component={FavoredListPage} />
      </Switch>
    </Router>
  );
};
