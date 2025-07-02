
import { useForm } from 'react-hook-form'
import { useContext, useState } from 'react';
import {Link ,  Navigate,  Outlet,  useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  
   const {
     register,
      handleSubmit, 
      watch,
       formState: { errors , isSubmitting} 
      } = useForm();

// const delay = (time) => {
//     return new Promise((resolve , reject) => {   //to simulate network delay
//       setTimeout(() => {
//         resolve()
//       }, time * 1000);
//     })
// }

const onSubmit = async (data) => {
    // await delay(3)                                //to simulate network delay
     console.log(data);

}

  return (
    <div className='big-form-container'>
    <div className='form-container'>
      
      
      {isSubmitting && <div className="loader-overlay"> <div className="spinner"></div></div>}
        <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="username" {...register("username" , {required:{value: true , message: "* username is required"}})}type="text"  />  
            <br />
            {errors.username &&  <div> {errors.username.message}</div> }
            <br />
            <input placeholder="password" {...register("password" ,{ required:{value:true , message: "* password is required"}})} type="password"  />
            <br />
            {errors.password && <div>{errors.password.message}</div>}
            <br />
            <input disabled={isSubmitting} type="submit" value="submit" />
            <div className="form-switch"><Link to="/register" className="form-switch">Don't have an account?  Register</Link></div>
            
      
        </form>
    </div>
    </div>
  )
}

export default Login