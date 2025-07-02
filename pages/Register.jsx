import React from 'react'
import { useForm } from 'react-hook-form'
import {Link ,  Navigate,  Outlet,  useNavigate } from 'react-router-dom';
import './Register.css';
const Register = () => {

  const {
      register,
      handleSubmit, 
      watch,
       formState: { errors , isSubmitting } 
      } = useForm();

      const onSubmit = async (registerdata) => {
        //await delay(3) //used to simpulate API  or  network delay .
        console.log(registerdata)
      }

  return (
    <div className="big-form-container">
    <div className='form-container'>
      {isSubmitting && <div className="loader-overlay"> <div className="spinner"></div></div>}
        <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="username "type="text" {...register("username" , {
               required :{value:true , message:"* username is required"},
               minLength:{value:5 , message: "username must be atleast 5 characters"} ,
               maxLength :{value:15 , message: "username must not exceed 10 characters"} 
            }
            )} />
            
            {errors.username && <div>{errors.username.message}</div>}
            
            <input placeholder="password" type="password" {...register("password", {required: {value:true , message:"* password is required"} ,
            minLength:{value:5 , message:"password is too short."},
            maxLength:{value:10 , message:"password is too long."}
            })} />
            
            {errors.password && <div>{errors.password.message}</div>}
            
            <input placeholder="e-mail" type="email" {...register("email" , {required: { value:true , message:"* E-mail is required"}})} />
            
            {errors.email && <div>{errors.email.message}</div>}
            
            <input disabled={isSubmitting} type="submit" value="create account" />
          <div className="form-switch" > <Link to="/" >already a user? Login</Link> </div>
            
        </form>
        
    </div>
    </div>
  )
}

export default Register