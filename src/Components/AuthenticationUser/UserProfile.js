import React, { useRef, useContext, useEffect, useState } from 'react';
import classes from './UserProfile.module.css';
import ExpenseContext from '../Store/ExpenseContext';
import { FaAddressCard} from 'react-icons/fa';

const ProfileForm = () => {
  const nameRef = useRef();
  const profileRef = useRef();
  
  const [percentage, setPercentage] = useState(50);

  const expenseContext = useContext(ExpenseContext);
  const { profileData, getProfileData, onUpdate } = expenseContext;

  const handleUpdate = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const profile = profileRef.current.value;
    onUpdate(name, profile);
    nameRef.current.value = '';
    profileRef.current.value = '';
  };

  useEffect(() => {
    getProfileData();
  }, [getProfileData]);

  // Calculate the profile completion percentage whenever profileData changes.
  useEffect(() => {
    let completionPercentage = 50; // Initial 50%
    
    if (profileData.displayName) {
      completionPercentage += 25;
    }
    
    if (profileData.photoUrl) {
      completionPercentage += 25;
    }

    setPercentage(completionPercentage);
  }, [profileData]);

  return (
    <div className={classes.profileBG}>
      <div className={classes.profileStatusContainer}>
        <h6 className={classes.profileStatus}>Your profile is {percentage}% complete</h6>
      </div>
      <div className={classes.form}>
        <h3><b>Update details <FaAddressCard/> : </b></h3>
        <form onSubmit={handleUpdate}>
          <label>Full Name :  </label>
          <input
            type='text'
            ref={nameRef}
            defaultValue={profileData.displayName || ''}
            className={classes.input}
            required
          />
          <br></br>
          <br></br>
          <label>Profile Photo Url : </label>
          <input
            type='text'
            ref={profileRef}
            defaultValue={profileData.photoUrl || ''}
            required
            className={classes.input}
          />

          <div className={classes.buttonContainer}>
            <button className={classes.button}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;