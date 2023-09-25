import React, { useContext } from 'react';
import 'animate.css';
import ExpLisCSS from './ExpenseList.module.css';
import ExpenseListCard from './UI/ExpenseListCard';
import ExpenseContext from '../../Store/ExpenseContext';
import FileSaver from 'file-saver';
import { FaDownload } from 'react-icons/fa';

const ExpenseList = () => {
	const expCtxdata = useContext(ExpenseContext);
            console.log(expCtxdata.expensedata);
	let content;
	if (expCtxdata.expensedata.length === 0) {
		// content = (
			return(
			<div className={ExpLisCSS.norecord_wrapper}>
				<h3>No transaction recorded </h3>
			</div>
		);
	} else {
		content = expCtxdata.expensedata.map(exp => {
			const cssexpensetype = exp.expense_type;
			const updatedcsstype = cssexpensetype.toLowerCase();
			return (
				<li key={exp.id}>
					<div
						className={`${ExpLisCSS.list_wrapper__point} ${updatedcsstype === 'expense' ? ExpLisCSS.expense : ExpLisCSS.income} animate__animated animate__fadeIn `}
					>
						<p>{exp.text} - {exp.amount}Rs/-</p>
						<button onClick={() => expCtxdata.removexpense(exp.id)} 
						className={ExpLisCSS.btn}>Delete
							</button>
						<button onClick={() => expCtxdata.editexpense(exp.id) } className={ExpLisCSS.btn}>Edit</button>
					</div>
				</li>
			)
		})
	}


	const downloadData=()=>{
        const data='Type, Amount, category, text \n'+expCtxdata.expensedata.map(({category,amount,expense_type,text})=>(
            `${expense_type} - ${amount}Rs/-  - ${category} - ${text}`
        )).join('\n')
       const expenseData =new Blob([data],{ type: 'text/csv;charset=utf-8;' })
        FileSaver.saveAs(expenseData, 'expense.csv');
    }


	return (
		<div className={`${ExpLisCSS[ 'expenselist_wrapper' ]} animate__animated animate__fadeInUp animate__delay-0.6s`}>
			<ExpenseListCard>
				<h2>History</h2>
				<div>
				{ expCtxdata.premium && <button className={ExpLisCSS.downloadButton} onClick={downloadData}><FaDownload/>Get Data</button>}
				</div>
				<ul className={ExpLisCSS[ 'list_wrapper' ]}>
					{content}
				</ul>
			</ExpenseListCard>
		</div>
	);
};

export default ExpenseList;
