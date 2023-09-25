import React, { Fragment } from "react";

import ChangePassword from "../AuthenticationUser/ChangePassword";
import Header from '../Data/Header';

const ChangePassPage= ()=>{
  return(
    <Fragment>
        <Header/>
        <ChangePassword />
    </Fragment>
  );
}

export default ChangePassPage