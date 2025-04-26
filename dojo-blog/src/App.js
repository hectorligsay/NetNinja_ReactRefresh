import Navbar from "./Navbar";
import Home from "./Home";
import BlogDetails from "./BlogDetails";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from "./Create";
import NotFound from "./NotFound";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails />
            </Route>
            {/* This is a catch all meaning if all the above does not 
            apply, then we use this not found component! */}
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
