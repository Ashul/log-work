import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Journal from "./components/Journal";
import Trades from "./components/trades";


import PageNotFound from './components/pagenotfound';

class AppRoutes extends React.Component {
    render() {
    return (
      <React.Fragment>

        <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/write-journal" element={<Journal />} /> 
        <Route path="/journal-list" element={<Trades />} /> 

        <Route path="*" element={<PageNotFound />} /> 

          {/* <Route element={<Login />}> */}
          {/* <Route path="/" element={<PublicPage />} /> */}
          {/* <Route path="/login" element={<LoginPage />} />
          <Route
            path="/protected"
            element={
              <RequireAuth>
                <ProtectedPage />
              </RequireAuth>
            }
          /> */}
        {/* </Route> */}
 </Routes>
              </React.Fragment>

    );
  }
}

export default AppRoutes;
