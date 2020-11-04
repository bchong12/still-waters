import React from "react";
import { HashRouter, Route, Switch, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Auth from "./Pages/Auth/Auth.component";
import Login from "./Pages/Login/Login.component";
import Register from "./Pages/Register/Register.component";
import Dashboard from "./Pages/Dashboard/Dashboard.component";
import Journal from "./Pages/Journal/Journal.component";
import Devos from "./Pages/Devos/Devos.component";
import JournalEntries from "./Pages/JournalEntries/journalEntries.component";
import JournalEdit from "./Pages/Journal-Edit/Journal-edit.component";
import DevoEntries from "./Pages/DevoEntries/DevoEntries.component";
import DevoEdit from "./Pages/Devo-Edit/Devo-edit";
import store from "./Redux/store";
import "./App.css";
const Router =
  process.env.NODE_ENV === "development" ? HashRouter : BrowserRouter;

function App() {
  return (
    <div className="App">
      <Router>
        <Provider store={store}>
          <Switch>
            <Route exact path="/">
              <Auth />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/journal">
              <Journal />
            </Route>
            <Route exact path="/devos">
              <Devos />
            </Route>
            <Route exact path="/entries/journal">
              <JournalEntries />
            </Route>
            <Route exact path="/journal/:id">
              <JournalEdit />
            </Route>
            <Route exact path="/entries/devos">
              <DevoEntries />
            </Route>
            <Route exact path="/devo/:id">
              <DevoEdit />
            </Route>
          </Switch>
        </Provider>
      </Router>
    </div>
  );
}

export default App;
