import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Search from './components/Search/Search'
import Create from './components/Create/Create';
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route exact path="/">
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
          <Route exact path="/create">
            <Create />
          </Route>
        </div>
      </Router>
    </div>
  );
}

export default App;
