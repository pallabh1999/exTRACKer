import React, { useContext, useRef } from 'react';
import Card from './UI/Card';
import Expfclass from './ExpenseForm.module.css';
import ExpenseContext from '../../Store/ExpenseContext';
import { Form,Row,Col   } from 'react-bootstrap';


const ExpenseForm = () => {
  const expctx = useContext(ExpenseContext);
  const typeRef = useRef();
  const categoryRef = useRef();
  const textRef = useRef();
  const amountRef = useRef();

    if(expctx.edit.isEdit){

      console.log(expctx.edit);
      const { category, expense_type, text, amount } = expctx.edit.item[0];
      categoryRef.current.value = category;
      typeRef.current.value = expense_type;
      amountRef.current.value = amount;
      textRef.current.value = text;
    }


  const expenseFormHandler = (event) => {
    event.preventDefault();
    const category = categoryRef.current.value;
    const type = typeRef.current.value;
    const text = textRef.current.value;
    const amount = amountRef.current.value;
    
    expctx.addexpense({
      email : expctx.email,
      text: text,
      expense_type : type,
      category : category,
      amount: amount,
    });

    textRef.current.value = "";
    amountRef.current.value = "";
    categoryRef.current.value = ''; 
    typeRef.current.value="";
  };
  return (
    <div className='animate__animated animate__fadeIn'>
  <Card>
    <Form onSubmit={expenseFormHandler}>

      <Row className="mb-3">
        <h3>Enter Transaction : </h3>
        <hr/>
        <Col md={6}>
          <div className={Expfclass.input_text}>
            <Form.Control
              type='text'
              ref={textRef}
              placeholder='expense name'
              required
            />
          </div>
        </Col>
        <Col md={6}>
          <Form.Select ref={typeRef} required>
            <option value=''>Type</option>
            <option value='income'>Income</option>
            <option value='expense'>Expense</option>
          </Form.Select>
        </Col>
      </Row>
      <br/>
      <div className={Expfclass.input_actions}>
        <div className={Expfclass.input_text}>
              <label>Category:</label>
          <Form.Select ref={categoryRef} placeholder='please select' required>
            <option value=''>Select a category</option>
            <option value='travel'>Travel</option>
            <option value='grocery'>Grocery</option>
            <option value='entertainment'>Entertainment</option>
            <option value='health'>Health</option>
            <option value='food'>Food</option>
          </Form.Select>
        </div>
      </div>
      <br/>
      <div className={Expfclass.input_actions}>
        <div className={Expfclass.input_text}>
              <label>Amount : </label>
            </div>
          <Form.Control
            type='number'
            min='1'
            step='1'
            placeholder=" ex. - 2500"
            ref={amountRef}
            required
          />
      </div>
      <button 
      className={Expfclass.btn}>
            Add Transaction
          </button>
    </Form>
  </Card>
</div>
);
};

export default ExpenseForm;
