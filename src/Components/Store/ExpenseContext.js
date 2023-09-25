import React from 'react';

const ExpenseContext = React.createContext({
  contactForm: (user) => { },
  token: '',
  isLoggedIn: false,
  login: (token,mail) => {},
  logOut: () => { },
  email : '',
  onUpdate : (name,profile)=>{},
  getProfileData :()=>{},
  profileData: {},
  name : '',
  verifyEmail : () =>{},
  emailStatus : false,
  expensedata: [],
	addexpense: (data) => { },
	removexpense: (id) => { },
  editexpense: (id) => { },
  edit : false,
  editTransaction : {},
  premium:false,
  setPremium : {},
});

export default ExpenseContext;