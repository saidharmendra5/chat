
import { set, useForm } from 'react-hook-form'
import { useContext, useState } from 'react';
import {Link ,  Navigate,  Outlet,  useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [loginState , setLoginState] = useState(null);
  const navigate = useNavigate();
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
     try{

     const response = await fetch('http://localhost:8000/chat/login' ,{
      method: 'POST',
      credentials: 'include', // to send & receive cookies.
      headers : {"content-type":"application/json"},
      body: JSON.stringify(data)
     })
     const result = await response.json();
     console.log("response" , response , "result : " , result);
     if(! response.ok){
      setLoginState(result.message);
     }else{
      setLoginState("login successful");
      navigate('/app/chat')
     }
    }catch(err){
      console.log("error :" ,err);
      setLoginState("Server or network error | try again later");
    }
}

  return (
    <div className='big-form-container'>
    <div className='form-container'>
      
      
      {isSubmitting && <div className="loader-overlay"> <div className="spinner"></div></div>}
        <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="email" {...register("email" , {required:{value: true , message: "* email is required"}})}type="email"  />  
            <br />
            {errors.email &&  <div> {errors.email.message}</div> }
            <br />
            <input placeholder="password" {...register("password" ,{ required:{value:true , message: "* password is required"}})} type="password"  />
            <br />
            {errors.password && <div>{errors.password.message}</div>}
            <br />
            <input disabled={isSubmitting} type="submit" value="submit" />
            <div className="form-switch"><Link to="/register" className="form-switch">Don't have an account?  Register</Link></div>
            
      
        </form>
        {loginState && <p>{loginState}</p>}
    </div>
    </div>
  )
}

export default Login