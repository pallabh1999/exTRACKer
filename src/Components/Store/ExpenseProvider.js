import axios from 'axios';
import React, { useState, useEffect,useCallback } from 'react';
import ExpenseContext from './ExpenseContext';

const ExpenseProvider = (props) => {
  const userDetailsFromStorage = JSON.parse(localStorage.getItem('userDetails'));
  const initialToken = userDetailsFromStorage ? userDetailsFromStorage.token : null;
  const initialEmail = userDetailsFromStorage ? userDetailsFromStorage.email : '';
  const [emailAdd, setEmail] = useState(initialEmail);
  const [token, setToken] = useState(initialToken);
  const [name, setName] = useState();
  const[emailVarified, setEmailVarified] = useState(false);
  const [profileData, setProfileData] = useState({});
  const[expenseList , setExpensesList] = useState([]);
  const[edit , setEdit] = useState({isEdit : false , item : {}})
  const userLoggedIn = !!token
  const[premium,setPremium]= useState(false);
   

  //-------------user Profile updates and other functions-----------------------//
  const getProfileData = useCallback(async () => {
    if (token) {
      try {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCh0DdNizJKJ2QcnYd7Kf4Y4k5AuOQPffE",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idToken: token,
            }),
          }
        );
        const data = await res.json();
        console.log(data);
        setProfileData(data.users[0]);
        setName(data.users[0].displayName);
        setEmailVarified(data.users[0].emailVerified)
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    getProfileData();
  }, [getProfileData]);

  
  const onUpdate = async (name, profile) => {
    if (name && profile) {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCh0DdNizJKJ2QcnYd7Kf4Y4k5AuOQPffE",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idToken: token,
              displayName: name,
              photoUrl: profile,
              returnSecureToken: true,
            }),
          }
        );
        const data = await response.json();
        console.log(data);
        
        setProfileData((prevProfile) => ({
          ...prevProfile,
          displayName: name,
          photoUrl: profile,
        }));
        setName(name); // Update the 'name' state here
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

const verifyEmailHandler = async () => {
  try {
    console.log('sending start');
    const response = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCh0DdNizJKJ2QcnYd7Kf4Y4k5AuOQPffE",
      {
        idToken: token,
        requestType: "VERIFY_EMAIL",
      }
    );
    console.log('sending success');
    console.log(response.data); // Use response.data directly
  } catch (error) {
    console.error("Error sending email verification:", error);
  }
};

  //------------------HANDLING USER FUNCTIONALITIES----------------------------//

const logInHandler = (token, mail) => {
    const userDetails = {
      token: token,
      email: mail
    }
    localStorage.setItem('userDetails', JSON.stringify(userDetails))
    setToken(token);
    setEmail(mail);
  }


  // const autoLogout = () => {
  //   logOutHandler();
  // };

  // useEffect(() => {
  //   let logoutTimer;
  //   if (token) {
      
  //     logoutTimer = setTimeout(()=>{
  //       autoLogout();
  //     }, 5 * 60 * 1000); 
  //   }
  //   return () => clearTimeout(logoutTimer);
  // },[token]);
  
  const logOutHandler = () => {
    setToken(null);
    localStorage.removeItem('userDetails');
    setEmail("");
  }

  //---------------*************-----EXPENSES CONTEXT PART----------------*******************----------------//
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('https://trackkkkkkkkkkiiittttt-default-rtdb.firebaseio.com/expenses.json');

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      const loadedExpenses = [];

      for (const key in data) {
        if(data[key].email === emailAdd){
        loadedExpenses.push({
          id: key,
          expense_type: data[key].expense_type,
          category: data[key].category,
          amount: data[key].amount,
          email: data[key].email,
          text: data[key].text,
        });
      }
    }

      setExpensesList(loadedExpenses);
    } catch (error) {
      console.log(error.message);
    }
  }, [emailAdd]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addexpensehistory = async (inputData) => {
    try {
      const response = await fetch('https://trackkkkkkkkkkiiittttt-default-rtdb.firebaseio.com/expenses.json', {
        method: 'POST',
        body: JSON.stringify(inputData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      console.log(data);

      fetchData(); 
    } catch (error) {
      console.log(error.message);
    }
  };


  // Remove Expense by ID
  const removeexpensehistory = async(id) => {
    console.log(id);
    try{
      const response = await axios.delete(`https://trackkkkkkkkkkiiittttt-default-rtdb.firebaseio.com/expenses/${id}.json`)
      console.log(response);
      setExpensesList((prevList) => prevList.filter((item) => item.id !== id));
      
  }

  catch(error){
  console.log(error);  
  }
  };

  const editExpenses =(id)=>{
    console.log(id);
  const editTrans = expenseList.filter((item) => item.id === id);
     setEdit({isEdit : true , item : editTrans});
     removeexpensehistory(id);
       
  }

   const userPremiumHandler = ()=>{
    setPremium(true);
   }

   console.log('preium is  ' + premium);
   //--------------CONTACT FORM DETAIlS----//
  async function userDetailHandler(user) {
    console.log(user);
    const response = await fetch('https://trackkkkkkkkkkiiittttt-default-rtdb.firebaseio.com/interactedUser.json', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    console.log(data);
  }



  //---------API HANDLING----//

  const cartContext = {
    contactForm: userDetailHandler,
    token: token,
    login: logInHandler,
    logOut: logOutHandler,
    isLoggedIn: userLoggedIn,
    email: emailAdd,
    profileData: profileData,
    getProfileData: getProfileData,
    onUpdate: onUpdate,
    name : name,
    verifyEmail : verifyEmailHandler,
    emailStatus : emailVarified,

    expensedata: expenseList,
		addexpense: addexpensehistory,
		removexpense: removeexpensehistory,
    editexpense: editExpenses,
    edit : edit,
    premium : premium,
    setPremium : userPremiumHandler,
  };

  return (
    <ExpenseContext.Provider value={cartContext}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;