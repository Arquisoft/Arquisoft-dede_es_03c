import React, { FC, useContext } from 'react';
import './App.css';
import { LangContext } from './lang';
import { UserContext } from './User';
import Homepage from './components/Homepage';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import CatalogPage from './pages/CatalogPage';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: FC = () => {
  const { dispatch: {translate }} = useContext(LangContext);
  const { dispatch: {setUser}} = useContext(UserContext);

  return (
    <Router>
      <Routes>
        <Route
          path='home'
          element = 
          {
            <HomePage setUser={setUser} translate={translate}/>
          }
        />
        <Route
        path='login'
        element = 
        {
          <LoginPage setUser={setUser} translate={translate} />
        }
        />
        <Route
        path='signup'
        element =
        {
          <SignUpPage setUser={setUser} translate={translate} />
        }
        />
        <Route
          path='catalog'
          element={
            <CatalogPage setUser={setUser} translate={translate}/>
          }
        />
      </Routes>
    </Router>
    
);
}
export default App;
