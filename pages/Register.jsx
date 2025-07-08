import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import LoadingOverlay from '../components/LoadingOverlay';
const Register = () => {
  const [registerstate , setRegisterState] = useState(null);

  const {
      register,
      handleSubmit, 
       formState: { errors , isSubmitting } 
      } = useForm();

      const onSubmit = async (data) => {
        console.log(data)
        
        try{

     const response = await fetch('http://localhost:8000/chat/register' ,{
      method: 'POST',
      headers : {"content-type":"application/json"},
      body: JSON.stringify(data)
     })
     const result = await response.json();
     console.log("response" , response , "result : " , result);
     if(! response.ok){
      setRegisterState(result.message);
     }else{
      setRegisterState("user registered successful");
     }
    }catch(err){
      setRegisterState(`Server or network error | try again later ${err}`);
    }
}

  return (
    <div className="auth-container">
      {isSubmitting && <LoadingOverlay message="Creating your account..." />}
      
      <div className='auth-form-container'>
        <div className="auth-header">
          <h1 className="auth-title">Join ChatSphere</h1>
          <p className="auth-subtitle">Create your account to start chatting</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input 
              className="form-input"
              placeholder="Enter your full name"
              type="text" 
              {...register("fullname", {
                required: { value: true, message: "Full name is required" },
                minLength: { value: 2, message: "Name must be at least 2 characters" },
                maxLength: { value: 50, message: "Name must not exceed 50 characters" }
              })} 
            />
            {errors.fullname && <div className="form-error">{errors.fullname.message}</div>}
          </div>

          <div className="form-group">
            <input 
              className="form-input"
              placeholder="Enter your email"
              type="email" 
              {...register("email", { 
                required: { value: true, message: "Email is required" },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address"
                }
              })} 
            />
            {errors.email && <div className="form-error">{errors.email.message}</div>}
          </div>

          <div className="form-group">
            <input 
              className="form-input"
              placeholder="Create a password"
              type="password" 
              {...register("password", {
                required: { value: true, message: "Password is required" },
                minLength: { value: 6, message: "Password must be at least 6 characters" },
                maxLength: { value: 50, message: "Password must not exceed 50 characters" }
              })} 
            />
            {errors.password && <div className="form-error">{errors.password.message}</div>}
          </div>

          <button 
            className="form-submit" 
            disabled={isSubmitting} 
            type="submit"
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-switch">
          <Link to="/" className="auth-switch-link">
            Already have an account? Sign in
          </Link>
        </div>

        {registerstate && (
          <div className={`auth-message ${registerstate.includes('successful') ? 'success' : 'error'}`}>
            {registerstate}
          </div>
        )}
      </div>
    </div>
  )
}

export default Register