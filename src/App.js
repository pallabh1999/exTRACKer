// import React from "react";
// import { BrowserRouter as Router } from "react-router-dom";
// import PageRoutes from "./Components/Routes/PageRoutes";

// function App() {
//   return (
//     <Router>
//       <PageRoutes/>
//     </Router>
//   );
// }

// export default App;
import './App.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ExpenseProvider from './Components/Store/ExpenseProvider';
import PageRoutes from './Components/Routes/PageRoutes';

function App() {
  return (

    <ExpenseProvider>
      <Router>
      <PageRoutes />
      </Router>
    </ExpenseProvider>
    
  );
}

export default App;
