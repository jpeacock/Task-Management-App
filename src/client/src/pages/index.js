import React from 'react';
import {
  Route,
  Routes,
  BrowserRouter as Router
} from "react-router-dom";

import Tasks from './tasks';
import Add from './add';
import Edit from './edit';

const Pages = () => {
    return(
      <Router>
        <Routes>
          <Route path="/" element={<Tasks />}></Route>
          <Route path="/add" element={<Add />}></Route>
          <Route path="/edit/:id" element={<Edit />}></Route>
        </Routes>
      </Router>
    );
    
};
export default Pages;