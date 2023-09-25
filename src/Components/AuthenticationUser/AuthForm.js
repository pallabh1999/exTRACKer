import {useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './AuthForm.module.css';
import ExpenseContext from '../Store/ExpenseContext';
import { FaUser,FaKey} from 'react-icons/fa';

const AuthForm = () => {
  const authCtx = useContext(ExpenseContext);
  const navigate = useNavigate();
  const emailRef = useRef();
  const passRef = useRef();
  const pass2Ref = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [sending, setSending] = useState(false);
  const [valid, setValid] = useState(false);
  const [error, setError] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setError('');
  };

  const checkValidity = (pass1, pass2) => {
    if (pass1 === pass2) {
      setValid(true);
    } else {
      setValid(false);
      setError('Password does not match.');
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setSending(true);
    const enteredEmail = emailRef.current.value;
    const enteredPass = passRef.current.value;


    if(!isLogin ){
      const confirmPass = pass2Ref.current.value;
      checkValidity(enteredPass, confirmPass);
  
      if (!valid) {
        setSending(false);
        return;
      }  
    }
  
    let url;

    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCh0DdNizJKJ2QcnYd7Kf4Y4k5AuOQPffE';
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCh0DdNizJKJ2QcnYd7Kf4Y4k5AuOQPffE';
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPass,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setSending(false);
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            console.log(data);
            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken, data.email.replace(/[@.]/g, ''));
        navigate('/home');
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleForgotPassword = () => {
    setForgotPassword(true);
    navigate('/forgotPassword')
  };

  return (
    <div className={classes.container}> 
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Welcome'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email"> <FaUser/> Your Email : </label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password"><FaKey/> Your Password : </label>
          <input type="password" id="password" required ref={passRef} />
        </div>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="confirmPassword"> <FaKey/> Confirm Password  : </label>
            <input type="password" id="confirmPassword" required ref={pass2Ref} />
          </div>
        )}
        {error && <p className={classes.error}>{error}</p>}
        <div className={classes.actions}>
        {!forgotPassword && isLogin && ( 
               <button
               type="button"
               className={classes.toggle} onClick={handleForgotPassword}>
                Forgot Password
              </button>
            )}
            {sending && <p style={{ color: 'aqua' }}>Sending Request...</p>}

            {!sending &&  (
              <button>{isLogin ? 'Log In' : 'Create Account'}</button>
            )}
         
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
        </div>
      </form>
    </section>
    </div>
  );
};

export default AuthForm;
