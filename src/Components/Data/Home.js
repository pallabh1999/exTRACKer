import React, { useState, useContext } from "react";
import './styleSheet.css';
import { Button } from "react-bootstrap";
import ExpenseContext from "../Store/ExpenseContext";
import Expense from "./Expenses/Expense";
import ExpenseList from "./Expenses/ExpenseList";

const Home = () => {
    const ctx = useContext(ExpenseContext);

  const [isDarkMode, setIsDarkMode] = useState(false);
    const isVarified = ctx.emailStatus;
    console.log(isVarified);
    const verifyEmailHandler = () => {
        console.log('verification sent');
        ctx.verifyEmail();
        alert('Please Check your Mail Box and verify to proceed further')

    }
    
  const handleToggle = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

    return (
        <div className={ctx.premium && isDarkMode ? 'homePremiumbackground' : 'homepagebackground'}>
            {!isVarified && <Button className="verifyBtn" onClick={verifyEmailHandler}>Verify Email</Button>}
            {ctx.premium && (
                 <div className="divSwitch">
                 <label className="toggle">
                   <input
                     className="toggle-checkbox"
                     type="checkbox"
                     checked={isDarkMode}
                     onChange={handleToggle}
                   />
                   <div className="toggle-switch"></div>
                 </label>
               </div>
            )}
            <div className='main_div'>
                <Expense />
                <br />
                <ExpenseList />

            </div>
        </div>
    )
}

export default Home;