import React from 'react';
import {
  Route,
  Routes,
  BrowserRouter as Router
} from "react-router-dom";

import Tasks from './tasks';
import Add from './add';
import Edit from './edit';
import Delete from './delete';

const Pages = () => {
    return(
      <Router>
        <Routes>
          <Route path="/" element={<Tasks />}></Route>
          <Route path="/add" element={<Add />}></Route>
          <Route path="/edit/:id" element={<Edit />}></Route>
          <Route path="/delete/:id" element={<Delete />}></Route>
        </Routes>
      </Router>
    );
    
};
export default Pages;