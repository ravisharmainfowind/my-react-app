import React, {useState} from 'react';
import './App.css';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Home from './components/Home/Home';
import HookState from './components/HookState/HookState';
import CounterExample from './components/CounterExample/CounterExample';
import CustomCounter from './components/CustomCounter/CustomCounter';
import Parent from './components/ParenttoChild/Parent';
import Child from './components/ChildtoParent/Child';
import Employee from './components/Employee/Employee';
import AddEmployee from './components/AddEmployee/AddEmployee';
import EditEmployee from './components/EditEmployee/EditEmployee';
import MultipleImageUpload from './components/multiple-image-upload/multiple-image-upload';
import DataGrid from './components/DataGrid/DataGrid';
import ReduxReact from './components/ReduxReact/ReduxReact';
import Counter from './Counter';
import PrivateRoute from './utils/PrivateRoute';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AlertComponent from './components/AlertComponent/AlertComponent';  
function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  return (<>
    <Router>
    <div className="App">
      <Header title={title}/>
        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path="/" exact={true}>
              <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <Route path="/register">
              <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <Route path="/login">
              <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <Route path="/hookstate">
              <HookState/>
            </Route>
            <Route path="/counter">
              <CounterExample/>
            </Route>
              <Route path="/custume">
              <CustomCounter/>
            </Route>
            <Route path="/parent">
              <Parent/>
            </Route>
            <Route path="/child">
              <Child/>
            </Route>
            <Route exact path="/employee">
              <Employee/>
            </Route>
            <Route path="/employee/add">
              <AddEmployee/>
            </Route>
            <Route path="/employee/edit/:id">
              <EditEmployee/>
            </Route>
            <Route path="/data-grid">
              <DataGrid/>
            </Route>
            <Route path="/multi-image">
              <MultipleImageUpload/>
            </Route>
            <Route path="/react-redux">
              <Counter/>
            </Route>
            <PrivateRoute path="/home">
              <Home/>
            </PrivateRoute>
            
          </Switch>
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
        </div>
    </div>
    </Router>
    </>
  );
}

export default App;