import React, { useContext, useRef, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import ExpenseContext from '../Store/ExpenseContext';
import './ChangePassword.css';
import passPhoto from '../Assets/forgotpass.jpg';

const ChangePassword = () => {
  const [valid, setValidity] = useState(true); // Initialize valid as true
  const ctx = useContext(ExpenseContext);
  const passRef = useRef();
  const pass2Ref = useRef();

  const checkValidity = (pass1, pass2) => {
    if (pass1 === pass2) {
      setValidity(true);
    } else {
      setValidity(false);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredPass = passRef.current.value;
    const confirmPAss = pass2Ref.current.value;
   console.log(enteredPass ,confirmPAss);
    checkValidity(enteredPass, confirmPAss);
    if (valid) {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCh0DdNizJKJ2QcnYd7Kf4Y4k5AuOQPffE', {
        method: 'POST',
        body: JSON.stringify({
          idToken: ctx.token,
          password: enteredPass,
          returnSecureToken: false,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
    }).then((response) => {
        if (response.ok) {
          alert('Password changed successfully!');
          console.log('Password changed successfully!');
        } else {
          response.json().then((data) => {
            const errorMessage = data.error.message;
            alert(`Error: ${errorMessage}`);
            console.error(`Error: ${errorMessage}`);
          });
        }
      }).catch((error) => {
        alert('An error occurred. Please try again later.');
        console.error('An error occurred:', error);
      });
    }
    passRef.current.value = '';
    pass2Ref.current.value = '';
  };

  return (
    <div className='bg-container'> 
    <div className='changePass'>
      <p>It is advised to change password in month for avoiding any security issue</p>
      {!valid && ( 
        <Alert variant='danger'>
          Passwords did not match. Please make sure both passwords are the same.
        </Alert>
      )}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='new-password'>
          <label>New Password : </label>
          <Form.Control type='password' minLength='7' ref={passRef} required />
          </Form.Group>
          
        <Form.Group controlId='new-password2'>
          <label>Confirm Password : </label>
          <Form.Control type='password' minLength='7' ref={pass2Ref} required />
        </Form.Group>
        <Button type='submit'>Change Password</Button>
      </Form>
    </div>
    </div>
  );
};

export default ChangePassword;



