import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Bootcamps from "./components/Bootcamps";
import AuthProvider from "./context/AuthContext";
import SingleBootcamp from "./components/SingleBootcamp";
import UserProfile from "./components/UserProfile";
import CreateBootcamp from "./components/CreateBootcamp";
import EditBootcamp from "./components/EditBootcamp";
import CreateCourse from "./components/CreateCourse";
import SearchResult from "./components/SearchResult";
function App() {
  document.body.style.backgroundColor = "#F7FAFC";
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/bootcamps" exact component={Bootcamps} />
          <Route path="/bootcamps/:id" exact component={SingleBootcamp} />
          <Route path="/profile" exact component={UserProfile} />
          <Route path="/create-bootcamp" exact component={CreateBootcamp} />
          <Route
            path="/bootcamps/:id/add-course"
            exact
            component={CreateCourse}
          />
          <Route path="/search-result" exact component={SearchResult} />
          <Route path="/bootcamps/:id/edit" exact component={EditBootcamp} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
