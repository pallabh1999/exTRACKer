import React from 'react';
import ExLiCdClass from './ExpenseListCard.module.css';

const ExpenseListCard = (props) => {
	return <div className={ExLiCdClass['list-card']}>{props.children}</div>;
};

export default ExpenseListCard;