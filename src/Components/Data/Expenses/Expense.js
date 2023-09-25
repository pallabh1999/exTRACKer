import React from 'react';
import ExpenseForm from './ExpenseForm';
import ExpenseResult from './ExpenseResult';
import expenseClass from './Expense.module.css';

const Expense = () => {
	return (
		
		<div className={expenseClass.expense_div}>
			
            <ExpenseForm />
            <ExpenseResult />
		</div>
	);
};

export default Expense;