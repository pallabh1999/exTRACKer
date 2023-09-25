import React, { useContext, useEffect, useState } from 'react';
import 'animate.css';
import Card from './UI/Card';
import ExpResclass from './ExpenseResult.module.css';
import ExpenseContext from '../../Store/ExpenseContext';
const ExpenseResults = () => {
	const [ results, setResults ] = useState({})
	const [premium , setPremium] =useState(false);
	const expctx = useContext(ExpenseContext);


	const resultsdata = () => {
		let incomedata =  expctx.expensedata.filter((exp) => exp.expense_type === 'income').map((data) => data.amount)
		let expensedata = expctx.expensedata.filter((exp) => exp.expense_type === 'expense').map((data) => data.amount)
     
		let income = incomedata.reduce((accumlator, currentValue) => parseInt(accumlator) + parseInt(currentValue), 0)
		let expense = expensedata.reduce((accumlator, currentValue) => parseInt(accumlator) + parseInt(currentValue), 0)


		let total = income - (-expense);

		if(total >= 10000 && !expctx.premium){
			setPremium(true);
		}

		setResults({ income, expense, total });
	}

 const premiumBuyHandler =()=>{
	alert('premium package purchased successfully')
	expctx.setPremium();
	setPremium(false);
 }

	useEffect(() => {
		resultsdata();
	}, [ expctx.expensedata ])

	return (
		<div className='animate__animated animate__fadeIn'>
			<Card resultclass={true}>
				<div className={ExpResclass.results_wrapper}>
					<div className={ExpResclass.income_div}>
						<h3>INCOME:</h3>
						<h3>{results.income}</h3>
					</div>

					<div className={ExpResclass.income_div}>
						<h3>EXPENSE:</h3>
						<h3 className={ExpResclass.expense}>
							{results.expense}
						</h3>
					</div>

					<div className={ExpResclass.result_div}>
						<h3>Total Amount:</h3>
						<h3>{results.total}</h3>
					</div>
					{premium && 
					<button  className="btn btn-danger"  onClick={premiumBuyHandler}>Buy premium</button>}
				</div>
			</Card>
		</div>
	);
};

export default ExpenseResults;