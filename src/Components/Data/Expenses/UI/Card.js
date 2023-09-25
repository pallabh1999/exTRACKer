import React from 'react';
import cardClass from './Card.module.css';

const Card = (props) => {
	return (
		<div
			className={`${cardClass.card} ${
				props.resultclass ? cardClass['card-result'] : null
			}`}
		>
			{props.children}
		</div>
	);
};

export default Card;
