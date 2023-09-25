import React, {Fragment, useContext} from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Page/Login";
import Home from "../Page/HomePage";
import AboutPage from "../Page/AboutPage";
import ContactUsPage from "../Page/ContactUsPage";
import ChangePasswordPage from "../Page/ChangePasswordPage";
import ExpenseContext from "../Store/ExpenseContext"
import Profile from "../Page/Profile";
import ForgetPasswordPage from "../Page/ForgetPasswordPage";


const PageRoutes = () => {
    const ctx = useContext(ExpenseContext)
    return(
        <Fragment>
            <Routes>
               <Route path="/about" element={<AboutPage/>} />
               <Route path="/forgotpassword" element={<ForgetPasswordPage/>} />

               {!ctx.isLoggedIn && <Route path="/login" element={<Login/>} />}
               {!ctx.isLoggedIn && <Route path='*' element={<Login />} />}

               {ctx.isLoggedIn &&<Route path="/*" element={<Home/>} />}
               {ctx.isLoggedIn && <Route path="/home" element={<Home />} />}

              {ctx.isLoggedIn && <Route path="/contact" element={<ContactUsPage/>} />}
               {ctx.isLoggedIn && <Route path="/user/profile" element={<Profile/>} />}
               {ctx.isLoggedIn && <Route path="/user/changepassword" element={<ChangePasswordPage/>} />}
            </Routes>
        </Fragment>
    )
}

export default PageRoutes;