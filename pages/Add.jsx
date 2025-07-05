import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserDetails } from '../contex/IsLoggedIn';
import './Add.css'; // Import CSS

const Add = () => {
  const [ addfriendstate , setAddfriendstate ] = useState(null);
  const { loggeduser } = useContext(UserDetails);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    console.log("add form data", data);
    try {
      const response = await fetch('http://localhost:8000/chat/addfriend' , {
        method:"POST",
        headers : {"content-type" : "application/json"},
        body : JSON.stringify(data)
      })

      const result = await response.json();
      console.log("add friend response :" , response);
      console.log("Add friend result : " , result);
      setAddfriendstate(result.message);
    } catch (error) {
      console.log("error in add friend : " , error);
    }
  };

  return (

    <div className="add-friend-container">
      {isSubmitting && <div className="loader-overlay"> <div className="spinner"></div></div>}
      <h2>Add Friends</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" value={loggeduser.email} {...register('fromemail')} />
        <input
          type="email"
          placeholder="Friend's email"
          {...register('toemail', {
            required:{value:true , message :"* please enter friend's email."}
          })}
        />
        {errors.toemail && <div>{errors.toemail.message }</div>}
        <input type="submit" value="Add Friend" disabled={isSubmitting} />
      </form>
      {addfriendstate && <div>{addfriendstate}</div>}
    </div>
  );
};

export default Add;
