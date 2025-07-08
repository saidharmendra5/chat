import { useForm } from 'react-hook-form'
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import LoadingOverlay from '../components/LoadingOverlay';

const Login = () => {
  const [loginState , setLoginState] = useState(null);
  const navigate = useNavigate();
   const {
     register,
      handleSubmit, 
       formState: { errors , isSubmitting} 
      } = useForm();

const onSubmit = async (data) => {
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
    <div className='auth-container'>
      {isSubmitting && <LoadingOverlay message="Signing you in..." />}
      
      <div className='auth-form-container'>
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to continue your conversations</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input 
              className="form-input"
              placeholder="Enter your email" 
              {...register("email", {
                required: { value: true, message: "Email is required" },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address"
                }
              })}
              type="email"  
            />
            {errors.email && <div className="form-error">{errors.email.message}</div>}
          </div>

          <div className="form-group">
            <input 
              className="form-input"
              placeholder="Enter your password" 
              {...register("password", { 
                required: { value: true, message: "Password is required" },
                minLength: { value: 6, message: "Password must be at least 6 characters" }
              })} 
              type="password"  
            />
            {errors.password && <div className="form-error">{errors.password.message}</div>}
          </div>

          <button 
            className="form-submit" 
            disabled={isSubmitting} 
            type="submit"
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-switch">
          <Link to="/register" className="auth-switch-link">
            Don't have an account? Create one
          </Link>
        </div>

        {loginState && (
          <div className={`auth-message ${loginState.includes('successful') ? 'success' : 'error'}`}>
            {loginState}
          </div>
        )}
      </div>
    </div>
  )
}

export default Login