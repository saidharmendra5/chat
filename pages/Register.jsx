import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {Link ,  Navigate,  Outlet,  useNavigate } from 'react-router-dom';
import './Register.css';
const Register = () => {
  const [registerstate , setRegisterState] = useState(null);

  const {
      register,
      handleSubmit, 
      watch,
       formState: { errors , isSubmitting } 
      } = useForm();

      const onSubmit = async (data) => {
        //await delay(3) //used to simpulate API  or  network delay .
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
    <div className="big-form-container">
    <div className='form-container'>
      {isSubmitting && <div className="loader-overlay"> <div className="spinner"></div></div>}
        <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="fullname "type="text" {...register("fullname" , {
               required :{value:true , message:"* fullname is required"},
               minLength:{value:5 , message: "fullname must be atleast 5 characters"} ,
               maxLength :{value:15 , message: "fullname must not exceed 10 characters"} 
            }
            )} />
            
            {errors.fullname && <div>{errors.fullname.message}</div>}
            
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
        {registerstate && <p>{registerstate}</p>}
        
    </div>
    </div>
  )
}

export default Register